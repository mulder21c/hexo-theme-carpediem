import {
  adoptLiveValue,
  createFixedPointDomain,
  getAutomaticMarkValues,
  getSortedMarkValues,
  getValueRatio,
  normalizeRatio,
  normalizeValue,
  pageRestrictedValue,
  serializeCanonicalDecimal,
  stepNumericValue,
  stepRestrictedValue,
  type FixedPointDomain,
} from "./slider-value.helper";
import type {
  SliderAdapter,
  SliderManagerConstructor,
  SliderManagerInstance,
  SliderManagerOptions,
  SliderRegistrationErrorCode,
  SliderRegistrationErrorConstructor,
  SliderRegistrationErrorInstance,
  SliderTarget,
} from "./type";

const MANAGER_CONTRACT = "carpediem/slider-manager@1" as const;
const ERROR_CONTRACT = "carpediem/slider-registration-error@1" as const;
const DEFAULT_SELECTOR = '[data-component="slider"]';

const ROOT_BOOTSTRAP_ATTRIBUTES = [
  "data-component",
  "data-slider-min",
  "data-slider-max",
  "data-slider-value",
  "data-slider-step",
  "data-slider-shift-step",
  "data-slider-marks",
  "data-slider-orientation",
  "data-slider-size",
  "data-slider-disabled",
  "data-slider-name",
] as const;

const RELATED_BOOTSTRAP_ATTRIBUTES = [
  "data-slider-rail",
  "data-slider-thumb",
  "data-slider-mark",
  "data-slider-mark-value",
  "data-slider-mark-label",
] as const;

const ROOT_LISTENER_OPTIONS = {
  capture: false,
  passive: false,
} as const;
const PASSIVE_LISTENER_OPTIONS = {
  capture: false,
  passive: true,
} as const;

type ManagerState =
  | "unowned"
  | "initializing"
  | "live"
  | "destroying"
  | "cleanup-pending"
  | "destroyed";

interface CleanupEntry {
  readonly run: () => void;
  complete: boolean;
}

interface OwnershipRecord {
  owner: LocalSliderManager | undefined;
  readonly entries: CleanupEntry[];
  recovering: boolean;
}

interface SliderDom {
  readonly root: Element;
  readonly input: HTMLInputElement;
  readonly rail: HTMLElement;
  readonly thumb: HTMLElement;
  readonly marks: readonly HTMLElement[];
  readonly markLabels: readonly HTMLElement[];
}

interface SliderConfiguration {
  readonly min: number;
  readonly max: number;
  readonly resetValue: number;
  readonly step: number | null;
  readonly shiftStep: number;
  readonly orientation: "horizontal" | "vertical";
  readonly size: "small" | "medium" | "large";
  readonly disabled: boolean;
  readonly name: string | undefined;
  readonly domain: FixedPointDomain;
  readonly markLabelValues: ReadonlyMap<Element, number>;
  readonly markValues: readonly number[];
  readonly restrictedLabels: ReadonlyMap<number, string>;
}

interface ActivePointer {
  readonly pointerId: number;
  readonly captureEntry: CleanupEntry;
  lastValue: number;
}

const ownershipRegistry = new WeakMap<Element, OwnershipRecord>();

class LocalSliderRegistrationError
  extends Error
  implements SliderRegistrationErrorInstance
{
  readonly name = "SliderRegistrationError" as const;
  readonly code: SliderRegistrationErrorCode;
  readonly field?: string;

  constructor(code: SliderRegistrationErrorCode, field?: string) {
    super(field ? `${code}: ${field}` : code);
    this.code = code;
    if (field !== undefined) {
      this.field = field;
    }
  }
}

Object.defineProperty(LocalSliderRegistrationError, "sliderRegistrationErrorContract", {
  value: ERROR_CONTRACT,
  writable: false,
  configurable: false,
  enumerable: false,
});

const localRegistrationError =
  LocalSliderRegistrationError as unknown as SliderRegistrationErrorConstructor;

function registrationError(
  code: SliderRegistrationErrorCode,
  field?: string,
): SliderRegistrationErrorInstance {
  return new localRegistrationError(code, field);
}

function readDiagnosticsFlag(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  try {
    return window.__carpediemDiagnostics === true;
  } catch {
    return false;
  }
}

function warnBestEffort(...values: readonly unknown[]): void {
  try {
    const targetConsole = globalThis.console;
    const warn = targetConsole?.warn;
    if (typeof warn === "function") {
      Reflect.apply(warn, targetConsole, values);
    }
  } catch {
    // Diagnostics must never affect the primary operation.
  }
}

function hasBrowserDocument(): boolean {
  return typeof document !== "undefined";
}

function isElement(value: unknown): value is Element {
  return (
    typeof value === "object" &&
    value !== null &&
    "nodeType" in value &&
    value.nodeType === 1
  );
}

function parseCanonicalNumber(
  value: string | null,
  code: SliderRegistrationErrorCode,
  field: string,
): number {
  if (value === null || value === "") {
    throw registrationError(code, field);
  }
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || serializeCanonicalDecimal(parsed) !== value) {
    throw registrationError(code, field);
  }
  return parsed;
}

function normalizedName(value: string | null): string | undefined {
  return value === null || value.trim() === "" ? undefined : value;
}

function requireSingleElement<T extends Element>(root: Element, selector: string): T {
  const matches = root.querySelectorAll<T>(selector);
  if (matches.length !== 1) {
    throw registrationError("ROOT_TOPOLOGY");
  }
  const match = matches[0];
  if (match === undefined) {
    throw registrationError("ROOT_TOPOLOGY");
  }
  return match;
}

function resolveTarget(target: SliderTarget | undefined): Element {
  if (!hasBrowserDocument()) {
    throw registrationError("BROWSER_ENVIRONMENT");
  }

  if (target === undefined || target === DEFAULT_SELECTOR) {
    const matches = document.querySelectorAll(DEFAULT_SELECTOR);
    if (matches.length !== 1 || matches[0] === undefined) {
      throw registrationError("ROOT_TOPOLOGY", "target");
    }
    return matches[0];
  }

  if (typeof target === "string") {
    const id = target.startsWith("#") ? target.slice(1) : target;
    if (id === "") {
      throw registrationError("ROOT_TOPOLOGY", "target");
    }
    const resolved = document.getElementById(id);
    if (resolved === null) {
      throw registrationError("ROOT_TOPOLOGY", "target");
    }
    return resolved;
  }

  if (!isElement(target)) {
    throw registrationError("ROOT_TOPOLOGY", "target");
  }
  return target;
}

function validateRootTopology(root: Element): SliderDom {
  if (
    root.ownerDocument !== document ||
    !root.isConnected ||
    root.getRootNode() !== document
  ) {
    throw registrationError("ROOT_TOPOLOGY");
  }
  if (root.getAttribute("data-component") !== "slider") {
    throw registrationError("ROOT_TOPOLOGY", "data-component");
  }

  if (root.querySelector(DEFAULT_SELECTOR) !== null) {
    throw registrationError("ROOT_TOPOLOGY");
  }

  const input = requireSingleElement<HTMLInputElement>(root, 'input[type="range"]');
  const rail = requireSingleElement<HTMLElement>(root, "[data-slider-rail]");
  const thumb = requireSingleElement<HTMLElement>(root, "[data-slider-thumb]");
  if (rail.getAttribute("data-slider-rail") !== "") {
    throw registrationError("ROOT_TOPOLOGY", "data-slider-rail");
  }
  if (thumb.getAttribute("data-slider-thumb") !== "") {
    throw registrationError("ROOT_TOPOLOGY", "data-slider-thumb");
  }
  if (!rail.contains(thumb)) {
    throw registrationError("ROOT_TOPOLOGY");
  }

  const marks = Array.from(root.querySelectorAll<HTMLElement>("[data-slider-mark]"));
  const markLabels = Array.from(
    root.querySelectorAll<HTMLElement>("[data-slider-mark-label]"),
  );
  if (marks.some((mark) => !rail.contains(mark))) {
    throw registrationError("ROOT_TOPOLOGY");
  }
  if (markLabels.some((label) => !marks.some((mark) => mark.contains(label)))) {
    throw registrationError("ROOT_TOPOLOGY");
  }
  return { root, input, rail, thumb, marks, markLabels };
}

function readConfiguration(
  dom: SliderDom,
  diagnosticsEnabled: boolean,
): SliderConfiguration {
  const { root, input } = dom;
  const orientationSource = root.getAttribute("data-slider-orientation");
  if (orientationSource !== "horizontal" && orientationSource !== "vertical") {
    throw registrationError("BOOTSTRAP_CONTRACT", "data-slider-orientation");
  }
  const sizeSource = root.getAttribute("data-slider-size");
  if (sizeSource !== "small" && sizeSource !== "medium" && sizeSource !== "large") {
    throw registrationError("BOOTSTRAP_CONTRACT", "data-slider-size");
  }
  const disabledSource = root.getAttribute("data-slider-disabled");
  if (disabledSource !== "true" && disabledSource !== "false") {
    throw registrationError("BOOTSTRAP_CONTRACT", "data-slider-disabled");
  }

  const min = parseCanonicalNumber(
    root.getAttribute("data-slider-min"),
    "REQUIRED_NUMBER",
    "data-slider-min",
  );
  const max = parseCanonicalNumber(
    root.getAttribute("data-slider-max"),
    "REQUIRED_NUMBER",
    "data-slider-max",
  );
  const value = parseCanonicalNumber(
    root.getAttribute("data-slider-value"),
    "REQUIRED_NUMBER",
    "data-slider-value",
  );
  if (min >= max) {
    throw registrationError("RANGE", "data-slider-max");
  }
  if (!input.hasAttribute("aria-label") && !input.hasAttribute("aria-labelledby")) {
    throw registrationError("NAMING");
  }

  const stepSource = root.getAttribute("data-slider-step");
  const step =
    stepSource === "null"
      ? null
      : parseCanonicalNumber(stepSource, "STEP", "data-slider-step");
  if (step !== null && step <= 0) {
    throw registrationError("STEP", "data-slider-step");
  }

  const name = normalizedName(root.getAttribute("data-slider-name"));
  const inputName = normalizedName(input.getAttribute("name"));
  const disabled = disabledSource === "true";
  if (
    Number(input.min) !== min ||
    Number(input.max) !== max ||
    (step === null ? input.step !== "any" : Number(input.step) !== step) ||
    Number(input.defaultValue) !== value ||
    input.disabled !== disabled ||
    inputName !== name ||
    (orientationSource === "vertical"
      ? input.getAttribute("aria-orientation") !== "vertical"
      : input.hasAttribute("aria-orientation"))
  ) {
    throw registrationError("STATIC_MIRROR");
  }

  const marksSource = root.getAttribute("data-slider-marks");
  if (marksSource !== "false" && marksSource !== "true" && marksSource !== "custom") {
    throw registrationError("MARK", "data-slider-marks");
  }
  if (dom.marks.some((mark) => mark.getAttribute("data-slider-mark") !== "")) {
    throw registrationError("MARK", "data-slider-mark");
  }
  const markValues = dom.marks.map((mark) =>
    parseCanonicalNumber(
      mark.getAttribute("data-slider-mark-value"),
      "MARK",
      "data-slider-mark-value",
    ),
  );
  const markLabelValues = new Map<Element, number>();
  const restrictedLabels = new Map<number, string>();
  dom.marks.forEach((mark, index) => {
    const markValue = markValues[index];
    if (markValue === undefined) {
      return;
    }
    const labels = mark.querySelectorAll<HTMLElement>("[data-slider-mark-label]");
    if (labels.length > 1) {
      throw registrationError("MARK_LABEL");
    }
    const label = labels[0];
    if (label !== undefined) {
      if (label.getAttribute("data-slider-mark-label") !== "") {
        throw registrationError("MARK_LABEL", "data-slider-mark-label");
      }
      markLabelValues.set(label, markValue);
      if (label.textContent !== "") {
        restrictedLabels.set(markValue, label.textContent);
      }
    }
  });
  if (
    (marksSource === "false" && markValues.length !== 0) ||
    markValues.some(
      (mark, index) =>
        mark < min ||
        mark > max ||
        (index > 0 && mark <= (markValues[index - 1] ?? mark)),
    )
  ) {
    throw registrationError("MARK", "data-slider-marks");
  }
  if (step === null && markValues.length === 0) {
    throw registrationError("STEP", "data-slider-step");
  }
  if (step === null && marksSource !== "custom") {
    throw registrationError("STEP", "data-slider-step");
  }

  let automaticMarksValidated = false;
  if (marksSource === "true" && step !== null) {
    try {
      const provisionalDomain = createFixedPointDomain({
        min,
        max,
        value,
        step,
        shiftStep: step,
        marks: [],
      });
      const automaticMarkCount =
        Math.floor(
          (provisionalDomain.maxUnits - provisionalDomain.minUnits) /
            (provisionalDomain.stepUnits ?? 1),
        ) + 1;
      if (automaticMarkCount !== markValues.length) {
        throw registrationError("MARK", "data-slider-marks");
      }
      const automaticMarks = getAutomaticMarkValues(provisionalDomain);
      if (automaticMarks.some((mark, index) => mark !== markValues[index])) {
        throw registrationError("MARK", "data-slider-marks");
      }
      automaticMarksValidated = true;
    } catch (error) {
      if (error instanceof localRegistrationError) {
        throw error;
      }
    }
  }

  const shiftStep = parseCanonicalNumber(
    root.getAttribute("data-slider-shift-step"),
    "SHIFT_STEP",
    "data-slider-shift-step",
  );
  if (shiftStep <= 0) {
    throw registrationError("SHIFT_STEP", "data-slider-shift-step");
  }

  let domain: FixedPointDomain;
  try {
    domain = createFixedPointDomain({
      min,
      max,
      value,
      step,
      shiftStep,
      marks: markValues,
    });
  } catch {
    throw registrationError("NUMERIC_REPRESENTABILITY");
  }
  if (marksSource === "true" && !automaticMarksValidated) {
    const automaticMarkCount =
      Math.floor((domain.maxUnits - domain.minUnits) / (domain.stepUnits ?? 1)) + 1;
    if (automaticMarkCount !== markValues.length) {
      throw registrationError("MARK", "data-slider-marks");
    }
    const automaticMarks = getAutomaticMarkValues(domain);
    if (automaticMarks.some((mark, index) => mark !== markValues[index])) {
      throw registrationError("MARK", "data-slider-marks");
    }
  }
  const resetValue = normalizeValue(domain, value);
  if (diagnosticsEnabled && resetValue !== value) {
    console.log("1");
    warnBestEffort(
      "Slider initial value corrected",
      "data-slider-value",
      value,
      resetValue,
    );
  }
  if (
    diagnosticsEnabled &&
    marksSource === "true" &&
    domain.stepUnits !== null &&
    (domain.maxUnits - domain.minUnits) % domain.stepUnits !== 0
  ) {
    console.log("2");
    warnBestEffort("Slider automatic marks do not reach max", "data-slider-marks");
  }
  if (
    diagnosticsEnabled &&
    domain.stepUnits !== null &&
    domain.shiftStepUnits % domain.stepUnits !== 0
  ) {
    console.log("3");
    warnBestEffort("Slider shift step is not a step multiple", "data-slider-shift-step");
  }

  return {
    min,
    max,
    resetValue,
    step,
    shiftStep,
    orientation: orientationSource,
    size: sizeSource,
    disabled,
    name,
    domain,
    markLabelValues,
    markValues: getSortedMarkValues(domain),
    restrictedLabels,
  };
}

function readOptions(
  options: SliderManagerOptions | undefined,
): readonly [SliderAdapter | undefined, SliderAdapter | undefined] {
  if (
    options !== undefined &&
    (options === null || (typeof options !== "object" && typeof options !== "function"))
  ) {
    throw registrationError("ADAPTER", "options");
  }
  if (options === undefined) {
    return [undefined, undefined];
  }
  return [options.onChange, options.onChangeCommitted];
}

function restoreAttribute(
  element: Element,
  name: string,
  originalValue: string | null,
): void {
  if (originalValue === null) {
    element.removeAttribute(name);
  } else {
    element.setAttribute(name, originalValue);
  }
}

function runCleanupPass(record: OwnershipRecord): unknown | undefined {
  let firstFailure: unknown;
  let hasFailure = false;
  const entries = [...record.entries].reverse();
  for (const entry of entries) {
    if (entry.complete) {
      continue;
    }
    try {
      entry.run();
      entry.complete = true;
    } catch (error) {
      if (!hasFailure) {
        firstFailure = error;
        hasFailure = true;
      }
    }
  }
  return hasFailure ? firstFailure : undefined;
}

class LocalSliderManager implements SliderManagerInstance {
  private state: ManagerState = "unowned";
  private root: Element | undefined;
  private dom: SliderDom | undefined;
  private record: OwnershipRecord | undefined;
  private configuration: SliderConfiguration | undefined;
  private currentValue: number | undefined;
  private activePointer: ActivePointer | undefined;
  private onChange: SliderAdapter | undefined;
  private onChangeCommitted: SliderAdapter | undefined;
  private readonly diagnosticsEnabled: boolean;
  private isRefreshing = false;
  private isSynchronizing = false;
  private isNotifying = false;
  private initializationCancelled = false;
  private logicalForm: HTMLFormElement | null = null;
  private readonly formEntries = new Map<HTMLFormElement, CleanupEntry>();

  private readonly handlePointerDown = (event: Event): void =>
    this.onPointerDown(event as PointerEvent);
  private readonly handleKeyDown = (event: Event): void =>
    this.onKeyDown(event as KeyboardEvent);
  private readonly handlePointerMove = (event: Event): void =>
    this.onPointerMove(event as PointerEvent);
  private readonly handlePointerUp = (event: Event): void =>
    this.onPointerTerminal(event as PointerEvent, true);
  private readonly handlePointerCancel = (event: Event): void =>
    this.onPointerTerminal(event as PointerEvent, true);
  private readonly handleLostPointerCapture = (event: Event): void =>
    this.onPointerTerminal(event as PointerEvent, false);
  private readonly handleWindowBlur = (_event: Event): void =>
    this.onPointerTerminal(undefined, true);
  private readonly handleFormReset = (event: Event): void => this.onFormReset(event);

  constructor(target?: SliderTarget, options?: SliderManagerOptions) {
    this.diagnosticsEnabled = readDiagnosticsFlag();
    const [onChange, onChangeCommitted] = readOptions(options);
    this.onChange = onChange;
    this.onChangeCommitted = onChangeCommitted;
    try {
      this.initialize(target);
    } catch (error) {
      if (this.state === "unowned") {
        this.releaseAdapters();
        this.state = "destroyed";
      }
      throw error;
    }
  }

  initialize(target?: SliderTarget): void {
    if (!hasBrowserDocument()) {
      return;
    }
    if (typeof window === "undefined") {
      throw registrationError("BROWSER_ENVIRONMENT");
    }
    if (
      this.state === "destroyed" ||
      this.state === "destroying" ||
      this.state === "cleanup-pending" ||
      this.state === "initializing"
    ) {
      throw registrationError("OWNERSHIP_CONFLICT", "manager");
    }

    if (this.state === "live") {
      const resolvedRoot = resolveTarget(target);
      if (resolvedRoot === this.root) {
        return;
      }
      throw registrationError("OWNERSHIP_CONFLICT", "manager");
    }

    this.state = "initializing";
    this.initializationCancelled = false;
    let resolvedRoot: Element | undefined;
    let record: OwnershipRecord | undefined;
    try {
      resolvedRoot = resolveTarget(target);
      this.throwIfInitializationCancelled();
      const existing = ownershipRegistry.get(resolvedRoot);
      if (existing !== undefined) {
        if (existing.owner !== undefined && existing.owner.state === "live") {
          throw registrationError("OWNERSHIP_CONFLICT", "root");
        }
        this.recoverPending(resolvedRoot, existing);
        this.throwIfInitializationCancelled();
      }

      const dom = validateRootTopology(resolvedRoot);
      this.throwIfInitializationCancelled();
      this.validateAdapters();
      this.throwIfInitializationCancelled();
      const configuration = readConfiguration(dom, this.diagnosticsEnabled);
      this.throwIfInitializationCancelled();
      record = { owner: this, entries: [], recovering: false };
      ownershipRegistry.set(resolvedRoot, record);
      this.root = resolvedRoot;
      this.dom = dom;
      this.configuration = configuration;
      this.record = record;

      this.registerLifetimeResources(dom, record);
      this.throwIfInitializationCancelled();
      this.captureAndSynchronizeConstructionState(dom, configuration, record);
      this.throwIfInitializationCancelled();
      this.consumeBootstrap(dom, record);
      this.throwIfInitializationCancelled();
      this.state = "live";
    } catch (error) {
      if (record !== undefined) {
        record.recovering = true;
        let cleanupFailure: unknown | undefined;
        try {
          cleanupFailure = runCleanupPass(record);
        } finally {
          record.recovering = false;
        }
        if (cleanupFailure === undefined) {
          if (resolvedRoot !== undefined) {
            ownershipRegistry.delete(resolvedRoot);
          }
          this.clearRegistration();
          if (this.initializationCancelled) {
            this.releaseAdapters();
            this.state = "destroyed";
          } else {
            this.state = "unowned";
          }
        } else {
          record.owner = this;
          this.state = "cleanup-pending";
        }
      } else {
        if (this.initializationCancelled) {
          this.releaseAdapters();
          this.state = "destroyed";
        } else {
          this.state = "unowned";
        }
      }
      if (this.diagnosticsEnabled && error instanceof localRegistrationError) {
        console.log("4");
        warnBestEffort("Slider registration failed", error);
      }
      throw error;
    }
  }

  private throwIfInitializationCancelled(): void {
    if (this.initializationCancelled) {
      throw registrationError("OWNERSHIP_CONFLICT", "manager");
    }
  }

  refreshFormAssociation(): void {
    if (this.state !== "live" || this.isRefreshing || this.dom === undefined) {
      return;
    }
    this.isRefreshing = true;
    try {
      const nextForm = this.dom.input.form;
      if (nextForm === this.logicalForm) {
        return;
      }
      const nextEntry = nextForm === null ? undefined : this.addFormListener(nextForm);
      if (this.logicalForm !== null) {
        this.removeFormListener(this.logicalForm);
      }
      this.logicalForm = nextForm;
      if (nextForm !== null && nextEntry !== undefined) {
        this.formEntries.set(nextForm, nextEntry);
      }
    } finally {
      this.isRefreshing = false;
    }
  }

  destroy(): void {
    if (this.record?.recovering) {
      return;
    }
    if (this.state === "initializing") {
      this.initializationCancelled = true;
      return;
    }
    if (this.state === "destroyed" || this.state === "unowned") {
      this.releaseAdapters();
      this.state = "destroyed";
      return;
    }
    if (this.state === "destroying") {
      return;
    }
    if (this.record === undefined || this.root === undefined) {
      this.releaseAdapters();
      this.state = "destroyed";
      return;
    }

    this.state = "destroying";
    const record = this.record;
    const root = this.root;
    record.recovering = true;
    let failure: unknown | undefined;
    try {
      failure = runCleanupPass(record);
    } finally {
      record.recovering = false;
    }
    if (failure === undefined) {
      ownershipRegistry.delete(root);
      record.owner = undefined;
      this.clearRegistration();
      this.releaseAdapters();
      this.state = "destroyed";
      return;
    }
    this.state = "cleanup-pending";
    throw failure;
  }

  private onPointerDown(event: PointerEvent): void {
    if (this.isSynchronizing || this.isNotifying) {
      return;
    }
    const dom = this.dom;
    const configuration = this.configuration;
    const record = this.record;
    if (dom === undefined || configuration === undefined || record === undefined) {
      return;
    }
    const source = this.findPointerSource(event.target);
    if (source === undefined) {
      return;
    }
    if (event.defaultPrevented || !event.cancelable) {
      return;
    }
    if (
      this.state !== "live" ||
      configuration.disabled ||
      this.activePointer !== undefined ||
      event.isPrimary !== true ||
      event.button !== 0
    ) {
      return;
    }

    const requestedValue = this.valueFromPointer(event, source);
    if (requestedValue === undefined) {
      return;
    }

    const captureEntry: CleanupEntry = {
      complete: false,
      run: () => {
        if (dom.root.hasPointerCapture(event.pointerId)) {
          dom.root.releasePointerCapture(event.pointerId);
        }
      },
    };
    dom.root.setPointerCapture(event.pointerId);
    record.entries.push(captureEntry);

    try {
      if (!dom.root.hasPointerCapture(event.pointerId)) {
        captureEntry.complete = true;
        return;
      }
    } catch (error) {
      this.releaseInitialCapture(captureEntry, error);
    }

    try {
      dom.input.focus({ preventScroll: true });
    } catch (error) {
      this.releaseInitialCapture(captureEntry, error);
    }
    if (this.state !== "live") {
      return;
    }

    try {
      if (!dom.root.hasPointerCapture(event.pointerId)) {
        captureEntry.complete = true;
        return;
      }
    } catch (error) {
      this.releaseInitialCapture(captureEntry, error);
    }

    try {
      event.preventDefault();
    } catch (error) {
      this.releaseInitialCapture(captureEntry, error);
    }
    if (this.state !== "live") {
      return;
    }

    const currentValue = this.currentValue;
    if (currentValue === undefined) {
      this.releaseInitialCapture(
        captureEntry,
        registrationError("BOOTSTRAP_CONTRACT", "value"),
      );
    }
    this.activePointer = {
      pointerId: event.pointerId,
      captureEntry,
      lastValue: currentValue,
    };
    if (requestedValue !== currentValue) {
      this.synchronizeValue(requestedValue);
      if (this.activePointer !== undefined) {
        this.activePointer.lastValue = requestedValue;
      }
      this.runNotificationSequence(requestedValue, true, false);
    }
  }

  private onPointerMove(event: PointerEvent): void {
    if (this.isSynchronizing || this.isNotifying || this.state !== "live") {
      return;
    }
    const pointer = this.activePointer;
    if (pointer === undefined || pointer.pointerId !== event.pointerId) {
      return;
    }

    const shouldPreventDefault = event.cancelable && !event.defaultPrevented;
    if (shouldPreventDefault) {
      event.preventDefault();
      if (this.state !== "live") {
        return;
      }
    }
    const dom = this.dom;
    if (dom === undefined) {
      return;
    }
    const value = this.valueFromPointer(event, dom.rail);
    if (value === undefined || value === pointer.lastValue) {
      return;
    }
    this.synchronizeValue(value);
    if (this.activePointer === pointer) {
      pointer.lastValue = value;
    }
    this.runNotificationSequence(value, true, false);
  }

  private onPointerTerminal(
    event: PointerEvent | undefined,
    releaseCapture: boolean,
  ): void {
    if (this.state !== "live") {
      return;
    }
    const pointer = this.activePointer;
    if (
      pointer === undefined ||
      (event !== undefined && event.pointerId !== pointer.pointerId)
    ) {
      return;
    }
    this.activePointer = undefined;
    let primaryFailure: unknown;
    let hasFailure = false;
    try {
      this.runNotificationSequence(pointer.lastValue, false, true);
    } catch (error) {
      primaryFailure = error;
      hasFailure = true;
    }
    if (this.state === "live") {
      try {
        if (!releaseCapture) {
          pointer.captureEntry.complete = true;
        } else {
          this.runCaptureCleanup(pointer.captureEntry);
        }
      } catch (error) {
        if (!hasFailure) {
          primaryFailure = error;
          hasFailure = true;
        }
      }
    }
    if (hasFailure) {
      throw primaryFailure;
    }
  }

  private onKeyDown(event: KeyboardEvent): void {
    if (this.isSynchronizing || this.isNotifying) {
      return;
    }
    const dom = this.dom;
    const configuration = this.configuration;
    const currentValue = this.currentValue;
    if (
      dom === undefined ||
      configuration === undefined ||
      currentValue === undefined ||
      event.target !== dom.input ||
      ![
        "ArrowRight",
        "ArrowUp",
        "ArrowLeft",
        "ArrowDown",
        "PageUp",
        "PageDown",
        "Home",
        "End",
      ].includes(event.key)
    ) {
      return;
    }
    if (
      event.defaultPrevented ||
      !event.cancelable ||
      this.state !== "live" ||
      configuration.disabled ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey
    ) {
      return;
    }

    event.preventDefault();
    if (this.state !== "live" || this.activePointer !== undefined) {
      return;
    }

    let nextValue = currentValue;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowUp":
        nextValue =
          configuration.step === null
            ? stepRestrictedValue(configuration.domain, currentValue, 1)
            : stepNumericValue(configuration.domain, currentValue, 1);
        break;
      case "ArrowLeft":
      case "ArrowDown":
        nextValue =
          configuration.step === null
            ? stepRestrictedValue(configuration.domain, currentValue, -1)
            : stepNumericValue(configuration.domain, currentValue, -1);
        break;
      case "PageUp":
        nextValue =
          configuration.step === null
            ? pageRestrictedValue(configuration.domain, currentValue, 1)
            : normalizeValue(
                configuration.domain,
                Math.min(configuration.max, currentValue + configuration.shiftStep),
              );
        break;
      case "PageDown":
        nextValue =
          configuration.step === null
            ? pageRestrictedValue(configuration.domain, currentValue, -1)
            : normalizeValue(
                configuration.domain,
                Math.max(configuration.min, currentValue - configuration.shiftStep),
              );
        break;
      case "Home":
        nextValue =
          configuration.step === null
            ? (configuration.markValues[0] ?? currentValue)
            : configuration.min;
        break;
      case "End":
        nextValue =
          configuration.step === null
            ? (configuration.markValues[configuration.markValues.length - 1] ??
              currentValue)
            : configuration.max;
        break;
    }
    if (nextValue !== currentValue) {
      this.synchronizeValue(nextValue);
      this.runNotificationSequence(nextValue, true, true);
    }
  }

  private onFormReset(event: Event): void {
    if (this.state !== "live") {
      return;
    }
    const sourceForm = event.currentTarget;
    if (!(sourceForm instanceof HTMLFormElement) || sourceForm !== this.logicalForm) {
      return;
    }
    const schedule = globalThis.queueMicrotask;
    schedule(() => {
      if (
        this.state !== "live" ||
        event.defaultPrevented ||
        this.logicalForm !== sourceForm ||
        this.configuration === undefined
      ) {
        return;
      }
      const pointer = this.activePointer;
      this.activePointer = undefined;
      let releaseFailure: unknown;
      let hasReleaseFailure = false;
      if (pointer !== undefined) {
        try {
          this.runCaptureCleanup(pointer.captureEntry);
        } catch (error) {
          releaseFailure = error;
          hasReleaseFailure = true;
        }
      }
      this.synchronizeValue(this.configuration.resetValue);
      if (hasReleaseFailure) {
        throw releaseFailure;
      }
    });
  }

  private findPointerSource(target: EventTarget | null): Element | undefined {
    const dom = this.dom;
    if (dom === undefined || !isElement(target)) {
      return undefined;
    }
    const sources = new Set<Element>([dom.rail, dom.thumb, ...dom.markLabels]);
    let current: Element | null = target;
    while (current !== null) {
      if (sources.has(current)) {
        return current;
      }
      if (current === dom.root) {
        break;
      }
      current = current.parentElement;
    }
    return undefined;
  }

  private valueFromPointer(event: PointerEvent, source: Element): number | undefined {
    const dom = this.dom;
    const configuration = this.configuration;
    if (dom === undefined || configuration === undefined) {
      return undefined;
    }
    if (source !== dom.rail && source !== dom.thumb) {
      const markValue = configuration.markLabelValues.get(source);
      return markValue === undefined
        ? undefined
        : normalizeValue(configuration.domain, markValue);
    }
    const rect = dom.rail.getBoundingClientRect();
    const isHorizontal = configuration.orientation === "horizontal";
    const start = isHorizontal ? rect.left : rect.top;
    const length = isHorizontal ? rect.width : rect.height;
    const coordinate = isHorizontal ? event.clientX : event.clientY;
    if (
      !Number.isFinite(start) ||
      !Number.isFinite(length) ||
      length <= 0 ||
      !Number.isFinite(coordinate)
    ) {
      return undefined;
    }
    const rawRatio = isHorizontal
      ? (coordinate - start) / length
      : (start + length - coordinate) / length;
    const ratio = Math.min(1, Math.max(0, rawRatio));
    return normalizeRatio(configuration.domain, ratio);
  }

  private synchronizeValue(value: number): boolean {
    if (
      this.isSynchronizing ||
      this.state !== "live" ||
      this.dom === undefined ||
      this.configuration === undefined ||
      this.currentValue === undefined ||
      value === this.currentValue
    ) {
      return false;
    }
    const dom = this.dom;
    const previousValue = this.currentValue;
    const previousInputValue = dom.input.value;
    const previousAriaValueNow = dom.input.getAttribute("aria-valuenow");
    const previousAriaValueText = dom.input.getAttribute("aria-valuetext");
    const previousRailRatio = dom.rail.style.getPropertyValue("--slider-value-ratio");
    const previousThumbRatio = dom.thumb.style.getPropertyValue("--slider-value-ratio");
    const previousMarkStates = dom.marks.map((mark) =>
      mark.style.getPropertyValue("--slider-mark-active"),
    );
    const canonicalValue = serializeCanonicalDecimal(value);
    const ratio = String(getValueRatio(this.configuration.domain, value));
    const rollback: Array<() => void> = [];
    this.isSynchronizing = true;
    try {
      rollback.push(() => {
        this.currentValue = previousValue;
      });
      this.currentValue = value;
      rollback.push(() => {
        dom.input.value = previousInputValue;
      });
      dom.input.value = canonicalValue;
      if (this.state !== "live") return false;
      rollback.push(() =>
        restoreAttribute(dom.input, "aria-valuenow", previousAriaValueNow),
      );
      dom.input.setAttribute("aria-valuenow", canonicalValue);
      if (this.state !== "live") return false;
      rollback.push(() =>
        restoreAttribute(dom.input, "aria-valuetext", previousAriaValueText),
      );
      this.writeAriaValueText(dom.input, this.configuration, value);
      if (this.state !== "live") return false;
      rollback.push(() =>
        dom.rail.style.setProperty("--slider-value-ratio", previousRailRatio),
      );
      dom.rail.style.setProperty("--slider-value-ratio", ratio);
      if (this.state !== "live") return false;
      rollback.push(() =>
        dom.thumb.style.setProperty("--slider-value-ratio", previousThumbRatio),
      );
      dom.thumb.style.setProperty("--slider-value-ratio", ratio);
      if (this.state !== "live") return false;
      for (const [index, mark] of dom.marks.entries()) {
        rollback.push(() =>
          mark.style.setProperty("--slider-mark-active", previousMarkStates[index] ?? ""),
        );
        const markValue = this.configuration?.markValues[index];
        mark.style.setProperty("--slider-mark-active", markValue === value ? "1" : "0");
        if (this.state !== "live") return false;
      }
      return true;
    } catch (error) {
      let rollbackFailed = false;
      for (const restore of rollback.reverse()) {
        try {
          restore();
        } catch {
          rollbackFailed = true;
        }
      }
      if (rollbackFailed && this.state === "live") {
        try {
          this.destroy();
        } catch {
          // The first forward failure remains authoritative.
        }
      }
      throw error;
    } finally {
      this.isSynchronizing = false;
    }
  }

  private releaseInitialCapture(entry: CleanupEntry, primary: unknown): never {
    try {
      this.runCaptureCleanup(entry);
    } catch {
      // The first capture/focus/default-prevention failure remains primary.
    }
    throw primary;
  }

  private writeAriaValueText(
    input: HTMLInputElement,
    configuration: SliderConfiguration,
    value: number,
  ): void {
    const label =
      configuration.step === null ? configuration.restrictedLabels.get(value) : undefined;
    if (label === undefined || label === "") {
      input.removeAttribute("aria-valuetext");
    } else {
      input.setAttribute("aria-valuetext", label);
    }
  }

  private writeMarkStates(
    marks: readonly HTMLElement[],
    configuration: SliderConfiguration,
    value: number,
  ): void {
    marks.forEach((mark, index) => {
      mark.style.setProperty(
        "--slider-mark-active",
        configuration.markValues[index] === value ? "1" : "0",
      );
    });
  }

  private runNotificationSequence(
    value: number,
    includeChange: boolean,
    includeCommit: boolean,
  ): void {
    if (
      this.isNotifying ||
      this.state !== "live" ||
      this.root === undefined ||
      (!includeChange && !includeCommit)
    ) {
      return;
    }
    this.isNotifying = true;
    try {
      const EventConstructor = globalThis.CustomEvent;
      if (this.state !== "live") {
        return;
      }
      if (includeChange) {
        const changeEvent = new EventConstructor("slider:change", {
          bubbles: true,
          cancelable: false,
          detail: { value },
        });
        if (this.state !== "live") {
          return;
        }
        this.root.dispatchEvent(changeEvent);
        if (this.state !== "live") {
          return;
        }
        const onChange = this.onChange;
        if (onChange !== undefined) {
          Reflect.apply(onChange, undefined, [value]);
          if (this.state !== "live") {
            return;
          }
        }
      }
      if (includeCommit) {
        const commitEvent = new EventConstructor("slider:commit", {
          bubbles: true,
          cancelable: false,
          detail: { value },
        });
        if (this.state !== "live") {
          return;
        }
        this.root.dispatchEvent(commitEvent);
        if (this.state !== "live") {
          return;
        }
        const onChangeCommitted = this.onChangeCommitted;
        if (onChangeCommitted !== undefined) {
          Reflect.apply(onChangeCommitted, undefined, [value]);
        }
      }
    } finally {
      this.isNotifying = false;
    }
  }

  private runCaptureCleanup(entry: CleanupEntry): void {
    if (entry.complete) {
      return;
    }
    entry.run();
    entry.complete = true;
  }

  private validateAdapters(): void {
    if (this.onChange !== undefined && typeof this.onChange !== "function") {
      throw registrationError("ADAPTER", "onChange");
    }
    if (
      this.onChangeCommitted !== undefined &&
      typeof this.onChangeCommitted !== "function"
    ) {
      throw registrationError("ADAPTER", "onChangeCommitted");
    }
  }

  private recoverPending(root: Element, record: OwnershipRecord): void {
    if (record.recovering) {
      throw registrationError("OWNERSHIP_CONFLICT", "root");
    }
    record.recovering = true;
    try {
      const failure = runCleanupPass(record);
      if (failure !== undefined) {
        throw failure;
      }
      if (record.owner !== undefined) {
        record.owner.retireAfterRecovery();
      }
      record.owner = undefined;
      ownershipRegistry.delete(root);
    } finally {
      record.recovering = false;
    }
  }

  private retireAfterRecovery(): void {
    this.clearRegistration();
    this.releaseAdapters();
    this.state = "destroyed";
  }

  private registerLifetimeResources(dom: SliderDom, record: OwnershipRecord): void {
    const rootListeners: readonly [string, EventListener][] = [
      ["pointerdown", this.handlePointerDown],
      ["keydown", this.handleKeyDown],
      ["pointermove", this.handlePointerMove],
      ["pointerup", this.handlePointerUp],
      ["pointercancel", this.handlePointerCancel],
      ["lostpointercapture", this.handleLostPointerCapture],
    ];
    for (const [type, listener] of rootListeners) {
      dom.root.addEventListener(type, listener, ROOT_LISTENER_OPTIONS);
      record.entries.push({
        complete: false,
        run: () => dom.root.removeEventListener(type, listener, ROOT_LISTENER_OPTIONS),
      });
      this.throwIfInitializationCancelled();
    }

    const registrationWindow = dom.root.ownerDocument.defaultView;
    if (registrationWindow === null) {
      throw registrationError("BROWSER_ENVIRONMENT");
    }
    registrationWindow.addEventListener(
      "blur",
      this.handleWindowBlur,
      PASSIVE_LISTENER_OPTIONS,
    );
    record.entries.push({
      complete: false,
      run: () =>
        registrationWindow.removeEventListener(
          "blur",
          this.handleWindowBlur,
          PASSIVE_LISTENER_OPTIONS,
        ),
    });
    this.throwIfInitializationCancelled();

    this.logicalForm = dom.input.form;
    this.throwIfInitializationCancelled();
    if (this.logicalForm !== null) {
      this.addFormListener(this.logicalForm);
    }
  }

  private addFormListener(form: HTMLFormElement): CleanupEntry {
    const record = this.record;
    if (record === undefined) {
      throw registrationError("OWNERSHIP_CONFLICT", "form");
    }
    form.addEventListener("reset", this.handleFormReset, PASSIVE_LISTENER_OPTIONS);
    const entry: CleanupEntry = {
      complete: false,
      run: () =>
        form.removeEventListener("reset", this.handleFormReset, PASSIVE_LISTENER_OPTIONS),
    };
    record.entries.push(entry);
    this.formEntries.set(form, entry);
    this.throwIfInitializationCancelled();
    return entry;
  }

  private removeFormListener(form: HTMLFormElement): void {
    const entry = this.formEntries.get(form);
    form.removeEventListener("reset", this.handleFormReset, PASSIVE_LISTENER_OPTIONS);
    if (entry !== undefined) {
      entry.complete = true;
    }
    this.formEntries.delete(form);
  }

  private captureAndSynchronizeConstructionState(
    dom: SliderDom,
    configuration: SliderConfiguration,
    record: OwnershipRecord,
  ): void {
    const originalInputValue = dom.input.value;
    const originalAriaValueNow = dom.input.getAttribute("aria-valuenow");
    const originalAriaValueText = dom.input.getAttribute("aria-valuetext");
    const originalRailStyle = dom.rail.getAttribute("style");
    const originalThumbStyle = dom.thumb.getAttribute("style");
    const originalMarkStyles = dom.marks.map((mark) => mark.getAttribute("style"));
    const currentValue = adoptLiveValue(
      configuration.domain,
      originalInputValue,
      configuration.resetValue,
    );
    const canonicalValue = serializeCanonicalDecimal(currentValue);
    const ratio = String(getValueRatio(configuration.domain, currentValue));

    record.entries.push({
      complete: false,
      run: () => {
        restoreAttribute(dom.thumb, "style", originalThumbStyle);
        restoreAttribute(dom.rail, "style", originalRailStyle);
        dom.marks.forEach((mark, index) =>
          restoreAttribute(mark, "style", originalMarkStyles[index] ?? null),
        );
        restoreAttribute(dom.input, "aria-valuetext", originalAriaValueText);
        restoreAttribute(dom.input, "aria-valuenow", originalAriaValueNow);
        dom.input.value = originalInputValue;
      },
    });

    dom.input.value = canonicalValue;
    this.throwIfInitializationCancelled();
    dom.input.setAttribute("aria-valuenow", canonicalValue);
    this.throwIfInitializationCancelled();
    this.writeAriaValueText(dom.input, configuration, currentValue);
    this.throwIfInitializationCancelled();
    dom.rail.style.setProperty("--slider-value-ratio", ratio);
    this.throwIfInitializationCancelled();
    dom.thumb.style.setProperty("--slider-value-ratio", ratio);
    this.throwIfInitializationCancelled();
    this.writeMarkStates(dom.marks, configuration, currentValue);
    this.throwIfInitializationCancelled();
    this.currentValue = currentValue;
  }

  private consumeBootstrap(dom: SliderDom, record: OwnershipRecord): void {
    const relatedElements = [dom.rail, dom.thumb, ...dom.marks, ...dom.markLabels];
    for (const name of ROOT_BOOTSTRAP_ATTRIBUTES) {
      if (!dom.root.hasAttribute(name)) {
        continue;
      }
      const value = dom.root.getAttribute(name);
      dom.root.removeAttribute(name);
      record.entries.push({
        complete: false,
        run: () => restoreAttribute(dom.root, name, value),
      });
      this.throwIfInitializationCancelled();
    }
    for (const element of relatedElements) {
      for (const name of RELATED_BOOTSTRAP_ATTRIBUTES) {
        if (!element.hasAttribute(name)) {
          continue;
        }
        const value = element.getAttribute(name);
        element.removeAttribute(name);
        record.entries.push({
          complete: false,
          run: () => restoreAttribute(element, name, value),
        });
        this.throwIfInitializationCancelled();
      }
    }
  }

  private clearRegistration(): void {
    this.root = undefined;
    this.dom = undefined;
    this.configuration = undefined;
    this.currentValue = undefined;
    this.activePointer = undefined;
    this.record = undefined;
    this.logicalForm = null;
    this.formEntries.clear();
  }

  private releaseAdapters(): void {
    this.onChange = undefined;
    this.onChangeCommitted = undefined;
  }
}

Object.defineProperties(LocalSliderManager, {
  sliderManagerContract: {
    value: MANAGER_CONTRACT,
    writable: false,
    configurable: false,
    enumerable: false,
  },
  SliderRegistrationError: {
    value: localRegistrationError,
    writable: false,
    configurable: false,
    enumerable: false,
  },
});

const localSliderManager = LocalSliderManager as unknown as SliderManagerConstructor;

function readOwnDataValue(target: object, key: PropertyKey): unknown {
  const descriptor = Object.getOwnPropertyDescriptor(target, key);
  if (
    descriptor === undefined ||
    !("value" in descriptor) ||
    descriptor.get !== undefined ||
    descriptor.set !== undefined
  ) {
    return undefined;
  }
  return descriptor.value;
}

function compatibleGlobalPair(
  value: unknown,
): readonly [SliderManagerConstructor, SliderRegistrationErrorConstructor] | null {
  if (typeof value !== "function") {
    return null;
  }
  try {
    if (readOwnDataValue(value, "sliderManagerContract") !== MANAGER_CONTRACT) {
      return null;
    }
    const errorConstructor = readOwnDataValue(value, "SliderRegistrationError");
    if (typeof errorConstructor !== "function") {
      return null;
    }
    if (
      readOwnDataValue(errorConstructor, "sliderRegistrationErrorContract") !==
      ERROR_CONTRACT
    ) {
      return null;
    }
    return [
      value as unknown as SliderManagerConstructor,
      errorConstructor as unknown as SliderRegistrationErrorConstructor,
    ];
  } catch {
    return null;
  }
}

function selectExportPair(): readonly [
  SliderManagerConstructor,
  SliderRegistrationErrorConstructor,
] {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return [localSliderManager, localRegistrationError];
  }

  let existing: unknown;
  try {
    existing = window.SliderManager;
  } catch (error) {
    console.log("5");
    warnBestEffort("SliderManager global exposure failed", "read", error);
    return [localSliderManager, localRegistrationError];
  }

  if (existing !== undefined) {
    const compatible = compatibleGlobalPair(existing);
    if (compatible !== null) {
      return compatible;
    }
    console.log("6");
    warnBestEffort("SliderManager global conflict", existing);
    return [localSliderManager, localRegistrationError];
  }

  try {
    window.SliderManager = localSliderManager;
  } catch (error) {
    console.log("7");
    warnBestEffort("SliderManager global exposure failed", "write", error);
    return [localSliderManager, localRegistrationError];
  }

  try {
    const verified = window.SliderManager;
    if (verified !== localSliderManager) {
      console.log("8");
      warnBestEffort("SliderManager global exposure failed", "verify", verified);
    }
  } catch (error) {
    console.log("9");
    warnBestEffort("SliderManager global exposure failed", "verify", error);
  }
  return [localSliderManager, localRegistrationError];
}

const selectedPair = selectExportPair();

export type SliderManager = SliderManagerInstance;
export const SliderManager = selectedPair[0];
export type { SliderManagerOptions } from "./type";
export type SliderRegistrationError = SliderRegistrationErrorInstance;
export const SliderRegistrationError = selectedPair[1];
