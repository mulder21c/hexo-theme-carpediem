const MANAGER_CONTRACT = "carpediem/slider-manager@1";
const ERROR_CONTRACT = "carpediem/slider-registration-error@1";

function brandCompatiblePair(): {
  manager: NonNullable<Window["SliderManager"]>;
  error: NonNullable<Window["SliderManager"]>["SliderRegistrationError"];
} {
  const error = class CompatibleError extends Error {};
  Object.defineProperty(error, "sliderRegistrationErrorContract", {
    value: ERROR_CONTRACT,
  });
  const manager = class CompatibleManager {
    static readonly placeholder = true;
  };
  Object.defineProperties(manager, {
    sliderManagerContract: { value: MANAGER_CONTRACT },
    SliderRegistrationError: { value: error },
  });
  return {
    manager: manager as unknown as NonNullable<Window["SliderManager"]>,
    error: error as unknown as NonNullable<
      Window["SliderManager"]
    >["SliderRegistrationError"],
  };
}

describe("Slider manager module globals", () => {
  const originalManager = window.SliderManager;

  beforeEach(() => {
    vi.resetModules();
    delete window.SliderManager;
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    window.SliderManager = originalManager;
  });

  it("exports an exact locally branded pair and creates no manager instance", async () => {
    document.body.innerHTML = '<div data-component="slider"></div>';
    const module = await import("../slider.ui");

    expect(window.SliderManager).toBe(module.SliderManager);
    expect(module.SliderManager.SliderRegistrationError).toBe(
      module.SliderRegistrationError,
    );
    expect(
      Object.getOwnPropertyDescriptor(module.SliderManager, "sliderManagerContract"),
    ).toEqual({
      value: MANAGER_CONTRACT,
      writable: false,
      configurable: false,
      enumerable: false,
    });
    expect(
      Object.getOwnPropertyDescriptor(module.SliderManager, "SliderRegistrationError"),
    ).toEqual({
      value: module.SliderRegistrationError,
      writable: false,
      configurable: false,
      enumerable: false,
    });
    expect(
      Object.getOwnPropertyDescriptor(
        module.SliderRegistrationError,
        "sliderRegistrationErrorContract",
      ),
    ).toEqual({
      value: ERROR_CONTRACT,
      writable: false,
      configurable: false,
      enumerable: false,
    });
    expect(document.querySelector("[data-component='slider']")).not.toBeNull();
  });

  it("reuses a compatible existing manager and error pair by identity", async () => {
    const compatible = brandCompatiblePair();
    window.SliderManager = compatible.manager;

    const module = await import("../slider.ui");

    expect(module.SliderManager).toBe(compatible.manager);
    expect(module.SliderRegistrationError).toBe(compatible.error);
    expect(window.SliderManager).toBe(compatible.manager);
  });

  it("preserves an incompatible global and warns once", async () => {
    const existing = function ExistingSliderManager(): void {};
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    window.SliderManager = existing as unknown as Window["SliderManager"];

    const module = await import("../slider.ui");

    expect(window.SliderManager).toBe(existing);
    expect(module.SliderManager).not.toBe(existing);
    expect(warn).toHaveBeenCalledOnce();
    expect(warn).toHaveBeenCalledWith("SliderManager global conflict", existing);
  });

  it("evaluates without browser globals and exposes only local exports", async () => {
    vi.stubGlobal("window", undefined);
    vi.stubGlobal("document", undefined);

    const module = await import("../slider.ui");

    expect(module.SliderManager.sliderManagerContract).toBe(MANAGER_CONTRACT);
    expect(module.SliderRegistrationError.sliderRegistrationErrorContract).toBe(
      ERROR_CONTRACT,
    );
  });

  it.each([
    [undefined, document],
    [window, undefined],
  ])(
    "does not expose when only one browser global exists",
    async (browserWindow, browserDocument) => {
      vi.stubGlobal("window", browserWindow);
      vi.stubGlobal("document", browserDocument);

      const module = await import("../slider.ui");

      expect(module.SliderManager.sliderManagerContract).toBe(MANAGER_CONTRACT);
      if (browserWindow !== undefined) {
        expect(browserWindow.SliderManager).toBeUndefined();
      }
    },
  );

  it("short-circuits own descriptor probes and suppresses descriptor traps", async () => {
    const reads: PropertyKey[] = [];
    const sentinel = { phase: "manager error pair descriptor" };
    const existing = new Proxy(function ExistingSliderManager(): void {}, {
      getOwnPropertyDescriptor(target, property) {
        reads.push(property);
        if (property === "SliderRegistrationError") {
          throw sentinel;
        }
        if (property === "sliderManagerContract") {
          return {
            value: MANAGER_CONTRACT,
            writable: false,
            configurable: true,
            enumerable: false,
          };
        }
        return Reflect.getOwnPropertyDescriptor(target, property);
      },
    });
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    window.SliderManager = existing as unknown as Window["SliderManager"];

    const module = await import("../slider.ui");

    expect(reads).toEqual(["sliderManagerContract", "SliderRegistrationError"]);
    expect(module.SliderManager).not.toBe(existing);
    expect(warn).toHaveBeenCalledWith("SliderManager global conflict", existing);
  });

  it("trusts exact marker attestation without prototype or constructability probes", async () => {
    const compatible = brandCompatiblePair();
    Object.setPrototypeOf(compatible.manager, null);
    window.SliderManager = compatible.manager;

    const module = await import("../slider.ui");

    expect(module.SliderManager).toBe(compatible.manager);
    expect(module.SliderRegistrationError).toBe(compatible.error);
  });

  it("reports verify identity mismatch once without replacing the observed global", async () => {
    const observed = function ObservedManager(): void {};
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    let writes = 0;
    const proxy = new Proxy(window, {
      get(target, property, receiver) {
        if (property === "SliderManager") {
          return writes === 0 ? undefined : observed;
        }
        return Reflect.get(target, property, receiver);
      },
      set(target, property, value, receiver) {
        if (property === "SliderManager") {
          writes += 1;
          return true;
        }
        return Reflect.set(target, property, value, receiver);
      },
    });
    vi.stubGlobal("window", proxy);

    const module = await import("../slider.ui");

    expect(writes).toBe(1);
    expect(module.SliderManager).not.toBe(observed);
    expect(warn).toHaveBeenCalledWith(
      "SliderManager global exposure failed",
      "verify",
      observed,
    );
  });

  it.each(["read", "write", "verify"] as const)(
    "suppresses global %s failures and warns with the phase",
    async (phase) => {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
      const sentinel = { phase };
      let reads = 0;
      const proxy = new Proxy(window, {
        get(target, property, receiver) {
          if (property === "SliderManager") {
            reads += 1;
            if (phase === "read" || (phase === "verify" && reads === 2)) {
              throw sentinel;
            }
            return undefined;
          }
          return Reflect.get(target, property, receiver);
        },
        set(target, property, value, receiver) {
          if (property === "SliderManager") {
            if (phase === "write") {
              throw sentinel;
            }
            return true;
          }
          return Reflect.set(target, property, value, receiver);
        },
      });
      vi.stubGlobal("window", proxy);

      const module = await import("../slider.ui");

      expect(module.SliderManager.sliderManagerContract).toBe(MANAGER_CONTRACT);
      expect(warn).toHaveBeenCalledWith(
        "SliderManager global exposure failed",
        phase,
        sentinel,
      );
    },
  );
});
