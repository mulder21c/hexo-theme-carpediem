import { SliderManager, SliderRegistrationError } from "../slider.ui";

const BOOTSTRAP_ATTRIBUTES = [
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

function createSliderRoot(id = "test-slider"): HTMLDivElement {
  const root = document.createElement("div");
  root.id = id;
  root.setAttribute("data-component", "slider");
  root.setAttribute("data-slider-min", "0");
  root.setAttribute("data-slider-max", "100");
  root.setAttribute("data-slider-value", "40");
  root.setAttribute("data-slider-step", "5");
  root.setAttribute("data-slider-shift-step", "10");
  root.setAttribute("data-slider-marks", "false");
  root.setAttribute("data-slider-orientation", "horizontal");
  root.setAttribute("data-slider-size", "medium");
  root.setAttribute("data-slider-disabled", "false");
  root.setAttribute("data-slider-name", "volume");

  const input = document.createElement("input");
  input.type = "range";
  input.min = "0";
  input.max = "100";
  input.step = "5";
  input.defaultValue = "40";
  input.value = "40";
  input.name = "volume";
  input.setAttribute("aria-label", "Volume");

  const rail = document.createElement("span");
  rail.setAttribute("data-slider-rail", "");
  const thumb = document.createElement("span");
  thumb.setAttribute("data-slider-thumb", "");
  rail.appendChild(thumb);
  root.append(input, rail);
  document.body.appendChild(root);
  return root;
}

function expectRegistrationError(
  action: () => unknown,
  code: InstanceType<typeof SliderRegistrationError>["code"],
  field?: string | false,
): void {
  try {
    action();
    throw new Error("Expected SliderRegistrationError");
  } catch (error) {
    expect(error).toBeInstanceOf(SliderRegistrationError);
    expect(error).toMatchObject({ name: "SliderRegistrationError", code });
    if (field === false) {
      expect(error).not.toHaveProperty("field");
    } else if (field !== undefined) {
      expect(error).toHaveProperty("field", field);
    }
  }
}

describe("SliderManager lifecycle", () => {
  const managers: SliderManager[] = [];

  beforeEach(() => {
    document.body.innerHTML = "";
  });

  afterEach(() => {
    for (const manager of managers.splice(0).reverse()) {
      try {
        manager.destroy();
      } catch {
        // Individual cleanup-failure tests retry explicitly.
      }
    }
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    document.body.innerHTML = "";
  });

  it("resolves direct elements, bare IDs, hash IDs, and the exact default target", () => {
    const directRoot = createSliderRoot("direct-slider");
    const directManager = new SliderManager(directRoot);
    managers.push(directManager);
    expect(directRoot.hasAttribute("data-component")).toBe(false);

    directManager.destroy();
    const bareManager = new SliderManager("direct-slider");
    managers.push(bareManager);
    bareManager.destroy();

    const hashManager = new SliderManager("#direct-slider");
    managers.push(hashManager);
    hashManager.destroy();

    const defaultManager = new SliderManager();
    managers.push(defaultManager);
    expect(defaultManager.destroy()).toBeUndefined();
  });

  it("rejects missing, multiple, detached, nested, and incomplete roots without mutation", () => {
    expectRegistrationError(() => new SliderManager("missing"), "ROOT_TOPOLOGY");

    const first = createSliderRoot("first");
    const second = createSliderRoot("second");
    expectRegistrationError(() => new SliderManager(), "ROOT_TOPOLOGY");
    expect(first).toHaveAttribute("data-component", "slider");
    expect(second).toHaveAttribute("data-component", "slider");

    second.remove();
    const nested = createSliderRoot("nested");
    const nestedChild = createSliderRoot("nested-child");
    nested.appendChild(nestedChild);
    expectRegistrationError(() => new SliderManager(nested), "ROOT_TOPOLOGY");

    nested.remove();
    const detached = createSliderRoot("detached");
    detached.remove();
    expectRegistrationError(() => new SliderManager(detached), "ROOT_TOPOLOGY");

    const incomplete = createSliderRoot("incomplete");
    incomplete.querySelector("[data-slider-thumb]")?.remove();
    expectRegistrationError(() => new SliderManager(incomplete), "ROOT_TOPOLOGY");
    for (const name of BOOTSTRAP_ATTRIBUTES) {
      if (name !== "data-slider-name") {
        expect(incomplete).toHaveAttribute(name);
      }
    }
  });

  it("enforces one owner and releases ownership only after successful destroy", () => {
    const root = createSliderRoot();
    const first = new SliderManager(root);
    managers.push(first);

    expectRegistrationError(() => new SliderManager(root), "OWNERSHIP_CONFLICT");

    first.destroy();
    const replacement = new SliderManager(root);
    managers.push(replacement);
    expect(replacement.destroy()).toBeUndefined();
  });

  it("keeps an SSR-created unowned manager retryable after a failed browser initialization", () => {
    const browserDocument = document;
    vi.stubGlobal("document", undefined);
    const manager = new SliderManager("missing-while-ssr");
    managers.push(manager);
    vi.stubGlobal("document", browserDocument);

    expectRegistrationError(() => manager.initialize("still-missing"), "ROOT_TOPOLOGY");

    const root = createSliderRoot("retryable");
    expect(manager.initialize(root)).toBeUndefined();
    expect(root.hasAttribute("data-component")).toBe(false);
  });

  it("returns runtime undefined and makes destroy terminal", () => {
    const root = createSliderRoot();
    const manager = new SliderManager(root);
    managers.push(manager);

    expect(manager.initialize(root)).toBeUndefined();
    expect(manager.refreshFormAssociation()).toBeUndefined();
    expect(manager.destroy()).toBeUndefined();
    expect(manager.destroy()).toBeUndefined();
    expectRegistrationError(() => manager.initialize(root), "OWNERSHIP_CONFLICT");
  });

  it("restores consumed bootstrap and construction-time writable surfaces", () => {
    const root = createSliderRoot();
    const input = root.querySelector("input") as HTMLInputElement;
    const thumb = root.querySelector("[data-slider-thumb]") as HTMLElement;
    input.value = "65";
    input.setAttribute("aria-valuenow", "legacy");
    thumb.style.setProperty("--slider-value-ratio", "0.12");
    root.setAttribute("data-slider-consumer", "preserved");
    const originalBootstrap = Object.fromEntries(
      BOOTSTRAP_ATTRIBUTES.map((name) => [name, root.getAttribute(name)]),
    );

    const manager = new SliderManager(root);
    managers.push(manager);
    input.value = "80";
    input.setAttribute("aria-valuenow", "80");
    thumb.style.setProperty("--slider-value-ratio", "0.8");

    manager.destroy();

    for (const [name, value] of Object.entries(originalBootstrap)) {
      expect(root.getAttribute(name)).toBe(value);
    }
    expect(root).toHaveAttribute("data-slider-consumer", "preserved");
    expect(input.value).toBe("65");
    expect(input).toHaveAttribute("aria-valuenow", "legacy");
    expect(thumb.style.getPropertyValue("--slider-value-ratio")).toBe("0.12");
  });

  it("does not focus, blur, or replace pre-existing nodes during destroy", () => {
    const root = createSliderRoot();
    const input = root.querySelector("input") as HTMLInputElement;
    const rail = root.querySelector("[data-slider-rail]") as HTMLElement;
    const thumb = root.querySelector("[data-slider-thumb]") as HTMLElement;
    const focusSpy = vi.spyOn(input, "focus");
    const blurSpy = vi.spyOn(input, "blur");
    const manager = new SliderManager(root);
    managers.push(manager);

    manager.destroy();

    expect(root.querySelector("input")).toBe(input);
    expect(root.querySelector("[data-slider-rail]")).toBe(rail);
    expect(root.querySelector("[data-slider-thumb]")).toBe(thumb);
    expect(focusSpy).not.toHaveBeenCalled();
    expect(blurSpy).not.toHaveBeenCalled();
  });

  it("cleans listeners in strict LIFO order, attempts all entries, and retries only failures", () => {
    const root = createSliderRoot();
    const input = root.querySelector("input") as HTMLInputElement;
    const form = document.createElement("form");
    form.appendChild(root);
    document.body.appendChild(form);
    const calls: string[] = [];
    const firstFailure = { source: "pointerup removal" };
    const secondFailure = { source: "pointerdown removal" };
    let shouldFail = true;
    const rootRemove = root.removeEventListener.bind(root);
    const windowRemove = window.removeEventListener.bind(window);
    const formRemove = form.removeEventListener.bind(form);

    vi.spyOn(root, "removeEventListener").mockImplementation(
      (type, listener, options) => {
        calls.push(`root:${type}`);
        if (shouldFail && type === "pointerup") {
          throw firstFailure;
        }
        if (shouldFail && type === "pointerdown") {
          throw secondFailure;
        }
        rootRemove(type, listener, options);
      },
    );
    vi.spyOn(window, "removeEventListener").mockImplementation(
      (type, listener, options) => {
        calls.push(`window:${type}`);
        windowRemove(type, listener, options);
      },
    );
    vi.spyOn(form, "removeEventListener").mockImplementation(
      (type, listener, options) => {
        calls.push(`form:${type}`);
        formRemove(type, listener, options);
      },
    );

    const manager = new SliderManager(root);
    managers.push(manager);
    expect(input.form).toBe(form);

    let thrown: unknown;
    try {
      manager.destroy();
    } catch (error) {
      thrown = error;
    }
    expect(thrown).toBe(firstFailure);
    expect(calls).toEqual([
      "form:reset",
      "window:blur",
      "root:lostpointercapture",
      "root:pointercancel",
      "root:pointerup",
      "root:pointermove",
      "root:keydown",
      "root:pointerdown",
    ]);

    calls.length = 0;
    shouldFail = false;
    expect(manager.destroy()).toBeUndefined();
    expect(calls).toEqual(["root:pointerup", "root:pointerdown"]);
    expect(manager.destroy()).toBeUndefined();
    expect(calls).toEqual(["root:pointerup", "root:pointerdown"]);
  });

  it("snapshots adapter getters exactly once in constructor order", () => {
    const root = createSliderRoot();
    const reads: string[] = [];
    const options = Object.defineProperties(
      {},
      {
        onChange: {
          get: () => {
            reads.push("onChange");
            return (_value: number): void => undefined;
          },
        },
        onChangeCommitted: {
          get: () => {
            reads.push("onChangeCommitted");
            return (_value: number): void => undefined;
          },
        },
      },
    );

    const manager = new SliderManager(root, options);
    managers.push(manager);
    expect(reads).toEqual(["onChange", "onChangeCommitted"]);
  });

  it("rejects invalid option shapes before target resolution", () => {
    expectRegistrationError(
      () =>
        new SliderManager(
          "missing",
          null as unknown as ConstructorParameters<typeof SliderManager>[1],
        ),
      "ADAPTER",
    );
    expectRegistrationError(
      () =>
        new SliderManager(
          "missing",
          1 as unknown as ConstructorParameters<typeof SliderManager>[1],
        ),
      "ADAPTER",
    );
  });

  it("retains a rollback-pending reservation and recovers it before registration", () => {
    const root = createSliderRoot("rollback-pending");
    const addFailure = { phase: "add" };
    const cleanupFailure = { phase: "cleanup" };
    let failAdd = true;
    let failCleanup = true;
    const add = root.addEventListener.bind(root);
    const remove = root.removeEventListener.bind(root);
    vi.spyOn(root, "addEventListener").mockImplementation((type, listener, options) => {
      if (failAdd && type === "keydown") {
        throw addFailure;
      }
      add(type, listener, options);
    });
    vi.spyOn(root, "removeEventListener").mockImplementation(
      (type, listener, options) => {
        if (failCleanup && type === "pointerdown") {
          throw cleanupFailure;
        }
        remove(type, listener, options);
      },
    );

    let firstThrown: unknown;
    try {
      new SliderManager(root);
    } catch (error) {
      firstThrown = error;
    }
    expect(firstThrown).toBe(addFailure);
    expect(root).toHaveAttribute("data-component", "slider");

    failAdd = false;
    failCleanup = false;
    const recovered = new SliderManager(root);
    managers.push(recovered);
    expect(root.hasAttribute("data-component")).toBe(false);
  });

  it("reports every semantic validation category with stable code and field data", () => {
    const invalidCases: readonly [
      InstanceType<typeof SliderRegistrationError>["code"],
      string | false,
      (root: HTMLDivElement) => void,
    ][] = [
      [
        "ROOT_TOPOLOGY",
        "data-component",
        (root) => root.setAttribute("data-component", "not-slider"),
      ],
      [
        "BOOTSTRAP_CONTRACT",
        "data-slider-orientation",
        (root) => root.setAttribute("data-slider-orientation", "diagonal"),
      ],
      [
        "REQUIRED_NUMBER",
        "data-slider-min",
        (root) => root.removeAttribute("data-slider-min"),
      ],
      ["RANGE", "data-slider-max", (root) => root.setAttribute("data-slider-max", "0")],
      [
        "NAMING",
        false,
        (root) => {
          const input = root.querySelector("input");
          input?.removeAttribute("aria-label");
        },
      ],
      [
        "STEP",
        "data-slider-step",
        (root) => root.setAttribute("data-slider-step", "any"),
      ],
      [
        "STATIC_MIRROR",
        false,
        (root) => {
          const input = root.querySelector("input");
          input?.setAttribute("max", "90");
        },
      ],
      [
        "MARK",
        "data-slider-marks",
        (root) => root.setAttribute("data-slider-marks", "invalid"),
      ],
      [
        "MARK_LABEL",
        "data-slider-mark-label",
        (root) => {
          root.setAttribute("data-slider-marks", "custom");
          const mark = document.createElement("span");
          mark.setAttribute("data-slider-mark", "");
          mark.setAttribute("data-slider-mark-value", "20");
          const label = document.createElement("span");
          label.setAttribute("data-slider-mark-label", "invalid");
          mark.appendChild(label);
          root.querySelector("[data-slider-rail]")?.appendChild(mark);
        },
      ],
      [
        "SHIFT_STEP",
        "data-slider-shift-step",
        (root) => root.setAttribute("data-slider-shift-step", "invalid"),
      ],
      [
        "NUMERIC_REPRESENTABILITY",
        false,
        (root) => {
          root.setAttribute("data-slider-min", "-9007199254740991");
          root.setAttribute("data-slider-max", "9007199254740991");
          root.setAttribute("data-slider-value", "0");
          const input = root.querySelector("input") as HTMLInputElement;
          input.min = "-9007199254740991";
          input.max = "9007199254740991";
          input.defaultValue = "0";
          input.value = "0";
        },
      ],
    ];

    for (const [index, [code, field, mutate]] of invalidCases.entries()) {
      const root = createSliderRoot(`invalid-${index}`);
      mutate(root);
      expectRegistrationError(() => new SliderManager(root), code, field);
      root.remove();
    }

    const adapterRoot = createSliderRoot("adapter-error");
    expectRegistrationError(
      () => new SliderManager(adapterRoot, { onChange: 1 as never }),
      "ADAPTER",
      "onChange",
    );
    adapterRoot.remove();

    const browserRoot = createSliderRoot("browser-error");
    vi.stubGlobal("window", undefined);
    expectRegistrationError(
      () => new SliderManager(browserRoot),
      "BROWSER_ENVIRONMENT",
      false,
    );
    vi.unstubAllGlobals();

    const ownedRoot = createSliderRoot("ownership-error");
    const owner = new SliderManager(ownedRoot);
    managers.push(owner);
    expectRegistrationError(
      () => new SliderManager(ownedRoot),
      "OWNERSHIP_CONFLICT",
      "root",
    );
  });

  it("orders recoverable and advisory diagnostics after all fatal validation", () => {
    const root = createSliderRoot("diagnostics");
    root.setAttribute("data-slider-max", "12");
    root.setAttribute("data-slider-value", "7");
    root.setAttribute("data-slider-shift-step", "7");
    root.setAttribute("data-slider-marks", "true");
    const input = root.querySelector("input") as HTMLInputElement;
    input.max = "12";
    input.defaultValue = "7";
    input.value = "7";
    const rail = root.querySelector("[data-slider-rail]") as HTMLElement;
    for (const value of [0, 5, 10]) {
      const mark = document.createElement("span");
      mark.setAttribute("data-slider-mark", "");
      mark.setAttribute("data-slider-mark-value", String(value));
      rail.appendChild(mark);
    }
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    window.__carpediemDiagnostics = true;

    const manager = new SliderManager(root);
    managers.push(manager);

    expect(warn.mock.calls.map(([message]) => message)).toEqual([
      "Slider initial value corrected",
      "Slider automatic marks do not reach max",
      "Slider shift step is not a step multiple",
    ]);
    expect(input.value).toBe("5");
    delete window.__carpediemDiagnostics;
  });

  it("uses an exact boolean diagnostic snapshot and suppresses warning failures", () => {
    const silentRoot = createSliderRoot("silent-diagnostics");
    silentRoot.setAttribute("data-slider-orientation", "invalid");
    window.__carpediemDiagnostics = 1 as unknown as boolean;
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {
      throw new Error("warning failure");
    });

    expectRegistrationError(
      () => new SliderManager(silentRoot),
      "BOOTSTRAP_CONTRACT",
      "data-slider-orientation",
    );
    expect(warn).not.toHaveBeenCalled();

    const enabledRoot = createSliderRoot("enabled-diagnostics");
    enabledRoot.setAttribute("data-slider-orientation", "invalid");
    window.__carpediemDiagnostics = true;
    expectRegistrationError(
      () => new SliderManager(enabledRoot),
      "BOOTSTRAP_CONTRACT",
      "data-slider-orientation",
    );
    expect(warn).toHaveBeenCalledOnce();
    delete window.__carpediemDiagnostics;
  });
});
