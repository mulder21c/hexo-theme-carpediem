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
  message?: string,
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
    if (message !== undefined) {
      expect(error).toHaveProperty("message", message);
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

  it("describes related-element cardinality in ROOT_TOPOLOGY messages", () => {
    const missingThumb = createSliderRoot("missing-thumb");
    missingThumb.querySelector("[data-slider-thumb]")?.remove();
    expectRegistrationError(
      () => new SliderManager(missingThumb),
      "ROOT_TOPOLOGY",
      false,
      "ROOT_TOPOLOGY: expected exactly 1 match for [data-slider-thumb], found 0",
    );
    missingThumb.remove();

    const extraInput = createSliderRoot("extra-input");
    const duplicate = document.createElement("input");
    duplicate.type = "range";
    duplicate.setAttribute("aria-label", "Extra");
    extraInput.appendChild(duplicate);
    expectRegistrationError(
      () => new SliderManager(extraInput),
      "ROOT_TOPOLOGY",
      false,
      'ROOT_TOPOLOGY: expected exactly 1 match for input[type="range"], found 2',
    );
  });

  it("describes target resolution failures in ROOT_TOPOLOGY messages", () => {
    expectRegistrationError(
      () => new SliderManager(),
      "ROOT_TOPOLOGY",
      "target",
      'ROOT_TOPOLOGY: expected exactly 1 match for [data-component="slider"], found 0',
    );

    const first = createSliderRoot("first-target");
    const second = createSliderRoot("second-target");
    expectRegistrationError(
      () => new SliderManager(),
      "ROOT_TOPOLOGY",
      "target",
      'ROOT_TOPOLOGY: expected exactly 1 match for [data-component="slider"], found 2',
    );
    first.remove();
    second.remove();

    expectRegistrationError(
      () => new SliderManager(""),
      "ROOT_TOPOLOGY",
      "target",
      "ROOT_TOPOLOGY: target ID is empty",
    );
    expectRegistrationError(
      () => new SliderManager("#"),
      "ROOT_TOPOLOGY",
      "target",
      "ROOT_TOPOLOGY: target ID is empty",
    );
    expectRegistrationError(
      () => new SliderManager("missing"),
      "ROOT_TOPOLOGY",
      "target",
      'ROOT_TOPOLOGY: no element with id "missing"',
    );
    expectRegistrationError(
      () => new SliderManager("#missing"),
      "ROOT_TOPOLOGY",
      "target",
      'ROOT_TOPOLOGY: no element with id "missing"',
    );
    expectRegistrationError(
      () => new SliderManager(document as never),
      "ROOT_TOPOLOGY",
      "target",
      "ROOT_TOPOLOGY: target is not an Element",
    );
  });

  it("describes root topology validation failures in ROOT_TOPOLOGY messages", () => {
    const detached = createSliderRoot("detached-topology");
    detached.remove();
    expectRegistrationError(
      () => new SliderManager(detached),
      "ROOT_TOPOLOGY",
      false,
      "ROOT_TOPOLOGY: root is not connected",
    );

    const host = document.createElement("div");
    document.body.appendChild(host);
    const shadowed = createSliderRoot("shadowed-topology");
    host.attachShadow({ mode: "open" }).appendChild(shadowed);
    expectRegistrationError(
      () => new SliderManager(shadowed),
      "ROOT_TOPOLOGY",
      false,
      "ROOT_TOPOLOGY: root is not in the current document light DOM",
    );
    host.remove();

    const nested = createSliderRoot("nested-topology");
    nested.appendChild(createSliderRoot("nested-child-topology"));
    expectRegistrationError(
      () => new SliderManager(nested),
      "ROOT_TOPOLOGY",
      false,
      "ROOT_TOPOLOGY: nested slider root is not allowed",
    );
    nested.remove();

    const wrongComponent = createSliderRoot("wrong-component");
    wrongComponent.setAttribute("data-component", "not-slider");
    expectRegistrationError(
      () => new SliderManager(wrongComponent),
      "ROOT_TOPOLOGY",
      "data-component",
      'ROOT_TOPOLOGY: data-component must be "slider", found "not-slider"',
    );
    wrongComponent.remove();

    const filledRail = createSliderRoot("filled-rail");
    filledRail
      .querySelector("[data-slider-rail]")
      ?.setAttribute("data-slider-rail", "hook");
    expectRegistrationError(
      () => new SliderManager(filledRail),
      "ROOT_TOPOLOGY",
      "data-slider-rail",
      'ROOT_TOPOLOGY: data-slider-rail must be an empty attribute, found "hook"',
    );
    filledRail.remove();

    const filledThumb = createSliderRoot("filled-thumb");
    filledThumb
      .querySelector("[data-slider-thumb]")
      ?.setAttribute("data-slider-thumb", "hook");
    expectRegistrationError(
      () => new SliderManager(filledThumb),
      "ROOT_TOPOLOGY",
      "data-slider-thumb",
      'ROOT_TOPOLOGY: data-slider-thumb must be an empty attribute, found "hook"',
    );
    filledThumb.remove();

    const thumbOutside = createSliderRoot("thumb-outside");
    const displacedThumb = thumbOutside.querySelector("[data-slider-thumb]");
    if (displacedThumb === null) {
      throw new Error("Expected thumb");
    }
    thumbOutside.appendChild(displacedThumb);
    expectRegistrationError(
      () => new SliderManager(thumbOutside),
      "ROOT_TOPOLOGY",
      false,
      "ROOT_TOPOLOGY: [data-slider-thumb] must be inside [data-slider-rail]",
    );
    thumbOutside.remove();

    const markOutside = createSliderRoot("mark-outside");
    const strayMark = document.createElement("span");
    strayMark.setAttribute("data-slider-mark", "");
    markOutside.appendChild(strayMark);
    expectRegistrationError(
      () => new SliderManager(markOutside),
      "ROOT_TOPOLOGY",
      false,
      "ROOT_TOPOLOGY: [data-slider-mark] must be inside [data-slider-rail]",
    );
    markOutside.remove();

    const labelOutside = createSliderRoot("label-outside");
    const mark = document.createElement("span");
    mark.setAttribute("data-slider-mark", "");
    labelOutside.querySelector("[data-slider-rail]")?.appendChild(mark);
    const strayLabel = document.createElement("span");
    strayLabel.setAttribute("data-slider-mark-label", "");
    labelOutside.appendChild(strayLabel);
    expectRegistrationError(
      () => new SliderManager(labelOutside),
      "ROOT_TOPOLOGY",
      false,
      "ROOT_TOPOLOGY: [data-slider-mark-label] must be inside [data-slider-mark]",
    );
  });

  it("describes configuration validation failures in registration error messages", () => {
    const cases: readonly [
      string,
      (root: HTMLDivElement) => void,
      InstanceType<typeof SliderRegistrationError>["code"],
      string | false,
      string,
    ][] = [
      [
        "orientation",
        (root) => root.setAttribute("data-slider-orientation", "diagonal"),
        "BOOTSTRAP_CONTRACT",
        "data-slider-orientation",
        'BOOTSTRAP_CONTRACT: data-slider-orientation must be "horizontal" or "vertical", found "diagonal"',
      ],
      [
        "size",
        (root) => root.setAttribute("data-slider-size", "tiny"),
        "BOOTSTRAP_CONTRACT",
        "data-slider-size",
        'BOOTSTRAP_CONTRACT: data-slider-size must be "small", "medium", or "large", found "tiny"',
      ],
      [
        "disabled-token",
        (root) => root.setAttribute("data-slider-disabled", "yes"),
        "BOOTSTRAP_CONTRACT",
        "data-slider-disabled",
        'BOOTSTRAP_CONTRACT: data-slider-disabled must be "true" or "false", found "yes"',
      ],
      [
        "min-missing",
        (root) => root.removeAttribute("data-slider-min"),
        "REQUIRED_NUMBER",
        "data-slider-min",
        "REQUIRED_NUMBER: data-slider-min is missing",
      ],
      [
        "min-empty",
        (root) => root.setAttribute("data-slider-min", ""),
        "REQUIRED_NUMBER",
        "data-slider-min",
        "REQUIRED_NUMBER: data-slider-min is empty",
      ],
      [
        "min-canonical",
        (root) => root.setAttribute("data-slider-min", "1.0"),
        "REQUIRED_NUMBER",
        "data-slider-min",
        'REQUIRED_NUMBER: data-slider-min must be a canonical decimal, found "1.0"',
      ],
      [
        "range",
        (root) => root.setAttribute("data-slider-max", "0"),
        "RANGE",
        "data-slider-max",
        "RANGE: data-slider-max must be greater than data-slider-min, found min 0 max 0",
      ],
      [
        "naming",
        (root) => root.querySelector("input")?.removeAttribute("aria-label"),
        "NAMING",
        false,
        "NAMING: canonical input requires aria-label or aria-labelledby",
      ],
      [
        "step-canonical",
        (root) => root.setAttribute("data-slider-step", "any"),
        "STEP",
        "data-slider-step",
        'STEP: data-slider-step must be a canonical decimal, found "any"',
      ],
      [
        "step-positive",
        (root) => root.setAttribute("data-slider-step", "0"),
        "STEP",
        "data-slider-step",
        "STEP: data-slider-step must be greater than 0, found 0",
      ],
      [
        "mirror-min",
        (root) => {
          const input = root.querySelector("input");
          if (input) {
            input.min = "1";
          }
        },
        "STATIC_MIRROR",
        false,
        'STATIC_MIRROR: native input min "1" does not match data-slider-min "0"',
      ],
      [
        "mirror-max",
        (root) => {
          const input = root.querySelector("input");
          if (input) {
            input.max = "90";
          }
        },
        "STATIC_MIRROR",
        false,
        'STATIC_MIRROR: native input max "90" does not match data-slider-max "100"',
      ],
      [
        "mirror-step",
        (root) => {
          const input = root.querySelector("input");
          if (input) {
            input.step = "10";
          }
        },
        "STATIC_MIRROR",
        false,
        'STATIC_MIRROR: native input step "10" does not match data-slider-step "5"',
      ],
      [
        "mirror-step-null",
        (root) => root.setAttribute("data-slider-step", "null"),
        "STATIC_MIRROR",
        false,
        'STATIC_MIRROR: native input step "5" does not match data-slider-step "null"',
      ],
      [
        "mirror-value",
        (root) => {
          const input = root.querySelector("input");
          if (input) {
            input.defaultValue = "50";
          }
        },
        "STATIC_MIRROR",
        false,
        'STATIC_MIRROR: native input value "50" does not match data-slider-value "40"',
      ],
      [
        "mirror-disabled",
        (root) => {
          const input = root.querySelector("input");
          if (input instanceof HTMLInputElement) {
            input.disabled = true;
          }
        },
        "STATIC_MIRROR",
        false,
        "STATIC_MIRROR: native input disabled true does not match data-slider-disabled false",
      ],
      [
        "mirror-name",
        (root) => root.querySelector("input")?.setAttribute("name", "other"),
        "STATIC_MIRROR",
        false,
        'STATIC_MIRROR: native input name "other" does not match data-slider-name "volume"',
      ],
      [
        "mirror-orientation",
        (root) => root.setAttribute("data-slider-orientation", "vertical"),
        "STATIC_MIRROR",
        false,
        'STATIC_MIRROR: native input must have aria-orientation "vertical"',
      ],
      [
        "mirror-orientation-horizontal",
        (root) =>
          root.querySelector("input")?.setAttribute("aria-orientation", "horizontal"),
        "STATIC_MIRROR",
        false,
        "STATIC_MIRROR: native input must not have aria-orientation when horizontal",
      ],
      [
        "marks-token",
        (root) => root.setAttribute("data-slider-marks", "invalid"),
        "MARK",
        "data-slider-marks",
        'MARK: data-slider-marks must be "false", "true", or "custom", found "invalid"',
      ],
      [
        "mark-hook",
        (root) => {
          const mark = document.createElement("span");
          mark.setAttribute("data-slider-mark", "hook");
          mark.setAttribute("data-slider-mark-value", "20");
          root.querySelector("[data-slider-rail]")?.appendChild(mark);
        },
        "MARK",
        "data-slider-mark",
        'MARK: data-slider-mark must be an empty attribute, found "hook"',
      ],
      [
        "mark-label-count",
        (root) => {
          root.setAttribute("data-slider-marks", "custom");
          const mark = document.createElement("span");
          mark.setAttribute("data-slider-mark", "");
          mark.setAttribute("data-slider-mark-value", "20");
          const first = document.createElement("span");
          first.setAttribute("data-slider-mark-label", "");
          const second = document.createElement("span");
          second.setAttribute("data-slider-mark-label", "");
          mark.append(first, second);
          root.querySelector("[data-slider-rail]")?.appendChild(mark);
        },
        "MARK_LABEL",
        false,
        "MARK_LABEL: expected at most 1 [data-slider-mark-label] per mark, found 2",
      ],
      [
        "mark-label-hook",
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
        "MARK_LABEL",
        "data-slider-mark-label",
        'MARK_LABEL: data-slider-mark-label must be an empty attribute, found "invalid"',
      ],
      [
        "marks-false",
        (root) => {
          const mark = document.createElement("span");
          mark.setAttribute("data-slider-mark", "");
          mark.setAttribute("data-slider-mark-value", "20");
          root.querySelector("[data-slider-rail]")?.appendChild(mark);
        },
        "MARK",
        "data-slider-marks",
        'MARK: data-slider-marks "false" does not allow mark elements, found 1',
      ],
      [
        "marks-range",
        (root) => {
          root.setAttribute("data-slider-marks", "custom");
          const mark = document.createElement("span");
          mark.setAttribute("data-slider-mark", "");
          mark.setAttribute("data-slider-mark-value", "200");
          root.querySelector("[data-slider-rail]")?.appendChild(mark);
        },
        "MARK",
        "data-slider-marks",
        "MARK: data-slider-marks value 200 is outside min 0 max 100",
      ],
      [
        "marks-order",
        (root) => {
          root.setAttribute("data-slider-marks", "custom");
          for (const value of ["40", "20"]) {
            const mark = document.createElement("span");
            mark.setAttribute("data-slider-mark", "");
            mark.setAttribute("data-slider-mark-value", value);
            root.querySelector("[data-slider-rail]")?.appendChild(mark);
          }
        },
        "MARK",
        "data-slider-marks",
        "MARK: data-slider-marks values must be strictly increasing, found 20 after 40",
      ],
      [
        "step-null-marks",
        (root) => {
          root.setAttribute("data-slider-step", "null");
          const input = root.querySelector("input");
          if (input) {
            input.step = "any";
          }
        },
        "STEP",
        "data-slider-step",
        'STEP: data-slider-step "null" requires at least one mark',
      ],
      [
        "step-null-custom",
        (root) => {
          root.setAttribute("data-slider-step", "null");
          root.setAttribute("data-slider-marks", "true");
          const input = root.querySelector("input");
          if (input) {
            input.step = "any";
          }
          const mark = document.createElement("span");
          mark.setAttribute("data-slider-mark", "");
          mark.setAttribute("data-slider-mark-value", "20");
          root.querySelector("[data-slider-rail]")?.appendChild(mark);
        },
        "STEP",
        "data-slider-step",
        'STEP: data-slider-step "null" requires data-slider-marks "custom", found "true"',
      ],
      [
        "automatic-count",
        (root) => {
          root.setAttribute("data-slider-max", "10");
          root.setAttribute("data-slider-value", "0");
          root.setAttribute("data-slider-marks", "true");
          const input = root.querySelector("input");
          if (input instanceof HTMLInputElement) {
            input.max = "10";
            input.defaultValue = "0";
            input.value = "0";
          }
          for (const value of ["0", "5"]) {
            const mark = document.createElement("span");
            mark.setAttribute("data-slider-mark", "");
            mark.setAttribute("data-slider-mark-value", value);
            root.querySelector("[data-slider-rail]")?.appendChild(mark);
          }
        },
        "MARK",
        "data-slider-marks",
        'MARK: data-slider-marks "true" expected 3 automatic marks, found 2',
      ],
      [
        "automatic-values",
        (root) => {
          root.setAttribute("data-slider-max", "10");
          root.setAttribute("data-slider-value", "0");
          root.setAttribute("data-slider-marks", "true");
          const input = root.querySelector("input");
          if (input instanceof HTMLInputElement) {
            input.max = "10";
            input.defaultValue = "0";
            input.value = "0";
          }
          for (const value of ["0", "5", "9"]) {
            const mark = document.createElement("span");
            mark.setAttribute("data-slider-mark", "");
            mark.setAttribute("data-slider-mark-value", value);
            root.querySelector("[data-slider-rail]")?.appendChild(mark);
          }
        },
        "MARK",
        "data-slider-marks",
        'MARK: data-slider-marks "true" mark values [0, 5, 9] do not match automatic marks [0, 5, 10]',
      ],
      [
        "shift-step-positive",
        (root) => root.setAttribute("data-slider-shift-step", "0"),
        "SHIFT_STEP",
        "data-slider-shift-step",
        "SHIFT_STEP: data-slider-shift-step must be greater than 0, found 0",
      ],
      [
        "shift-step-canonical",
        (root) => root.setAttribute("data-slider-shift-step", "invalid"),
        "SHIFT_STEP",
        "data-slider-shift-step",
        'SHIFT_STEP: data-slider-shift-step must be a canonical decimal, found "invalid"',
      ],
      [
        "numeric",
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
        "NUMERIC_REPRESENTABILITY",
        false,
        "NUMERIC_REPRESENTABILITY: configuration values are not numerically representable",
      ],
    ];

    for (const [id, mutate, code, field, message] of cases) {
      const root = createSliderRoot(`config-${id}`);
      mutate(root);
      expectRegistrationError(() => new SliderManager(root), code, field, message);
      root.remove();
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
