import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Slider from "../index";
import { SliderManager, SliderRegistrationError } from "../slider.ui";

function createInteractiveRoot(): {
  root: HTMLElement;
  input: HTMLInputElement;
  rail: HTMLElement;
  captured: Set<number>;
} {
  document.body.innerHTML = renderToStaticMarkup(
    createElement(Slider, {
      min: 0,
      max: 100,
      value: 40,
      step: 5,
      "aria-label": "Value",
    }),
  );
  const root = document.body.firstElementChild as HTMLElement;
  const input = root.querySelector("input") as HTMLInputElement;
  const rail = root.querySelector("[data-slider-rail]") as HTMLElement;
  const captured = new Set<number>();
  Object.defineProperties(root, {
    setPointerCapture: {
      configurable: true,
      value: vi.fn((pointerId: number) => captured.add(pointerId)),
    },
    hasPointerCapture: {
      configurable: true,
      value: vi.fn((pointerId: number) => captured.has(pointerId)),
    },
    releasePointerCapture: {
      configurable: true,
      value: vi.fn((pointerId: number) => captured.delete(pointerId)),
    },
  });
  vi.spyOn(input, "focus").mockImplementation(() => undefined);
  vi.spyOn(rail, "getBoundingClientRect").mockReturnValue({
    x: 0,
    y: 0,
    top: 0,
    left: 0,
    right: 100,
    bottom: 10,
    width: 100,
    height: 10,
    toJSON: () => ({}),
  });
  return { root, input, rail, captured };
}

function pointerDown(pointerId = 1): PointerEvent {
  const event = new MouseEvent("pointerdown", {
    bubbles: true,
    cancelable: true,
    button: 0,
    clientX: 50,
  });
  Object.defineProperties(event, {
    pointerId: { value: pointerId },
    isPrimary: { value: true },
  });
  return event as PointerEvent;
}

function dispatchWithExpectedError(
  target: Element,
  event: Event,
  expected: unknown,
): void {
  let reported: unknown;
  const handleError = (errorEvent: ErrorEvent): void => {
    reported = errorEvent.error;
    errorEvent.preventDefault();
  };
  window.addEventListener("error", handleError, { once: true });
  target.dispatchEvent(event);
  expect(reported).toBe(expected);
}

describe("SliderManager pointer fault isolation and reentrancy", () => {
  let manager: SliderManager | undefined;

  afterEach(() => {
    try {
      manager?.destroy();
    } catch {
      // Fault cases assert cleanup behavior directly.
    }
    manager = undefined;
    vi.restoreAllMocks();
    document.body.innerHTML = "";
  });

  it("stops before focus and value work when pointer capture throws", () => {
    const slider = createInteractiveRoot();
    const sentinel = new Error("capture failed");
    vi.mocked(slider.root.setPointerCapture).mockImplementation(() => {
      throw sentinel;
    });
    manager = new SliderManager(slider.root);

    dispatchWithExpectedError(slider.rail, pointerDown(), sentinel);

    expect(slider.input.focus).not.toHaveBeenCalled();
    expect(slider.input.value).toBe("40");
    expect(slider.root.releasePointerCapture).not.toHaveBeenCalled();
  });

  it("clears temporary state without release when capture confirmation is false", () => {
    const slider = createInteractiveRoot();
    vi.mocked(slider.root.hasPointerCapture).mockReturnValue(false);
    manager = new SliderManager(slider.root);

    slider.rail.dispatchEvent(pointerDown());

    expect(slider.input.focus).not.toHaveBeenCalled();
    expect(slider.root.releasePointerCapture).not.toHaveBeenCalled();
    expect(slider.input.value).toBe("40");
  });

  it("releases capture and leaves the manager live when focus throws", () => {
    const slider = createInteractiveRoot();
    const sentinel = { source: "focus" };
    vi.mocked(slider.input.focus).mockImplementation(() => {
      throw sentinel;
    });
    manager = new SliderManager(slider.root);

    dispatchWithExpectedError(slider.rail, pointerDown(5), sentinel);

    expect(slider.root.releasePointerCapture).toHaveBeenCalledWith(5);
    expect(slider.captured.has(5)).toBe(false);
    expect(slider.input.value).toBe("40");
    expect(manager.initialize(slider.root)).toBeUndefined();
  });

  it("makes reentrant destroy during focus authoritative", () => {
    const slider = createInteractiveRoot();
    manager = new SliderManager(slider.root);
    vi.mocked(slider.input.focus).mockImplementation(() => manager?.destroy());

    slider.rail.dispatchEvent(pointerDown(9));

    expect(slider.input.value).toBe("40");
    expect(slider.root.hasAttribute("data-component")).toBe(true);
    expect(slider.root.releasePointerCapture).toHaveBeenCalledWith(9);
  });

  it("does not capture or mutate when geometry throws", () => {
    const slider = createInteractiveRoot();
    const sentinel = new Error("geometry failed");
    vi.mocked(slider.rail.getBoundingClientRect).mockImplementation(() => {
      throw sentinel;
    });
    manager = new SliderManager(slider.root);

    dispatchWithExpectedError(slider.rail, pointerDown(), sentinel);

    expect(slider.root.setPointerCapture).not.toHaveBeenCalled();
    expect(slider.input.focus).not.toHaveBeenCalled();
    expect(slider.input.value).toBe("40");
  });

  it("stops remaining notifications when a listener destroys the manager", () => {
    const slider = createInteractiveRoot();
    const adapter = vi.fn();
    manager = new SliderManager(slider.root, { onChange: adapter });
    slider.root.addEventListener("slider:change", () => manager?.destroy());

    slider.rail.dispatchEvent(pointerDown());

    expect(adapter).not.toHaveBeenCalled();
    expect(slider.root.hasAttribute("data-component")).toBe(true);
  });

  it("keeps synchronized state and liveness when an adapter throws", () => {
    const slider = createInteractiveRoot();
    const sentinel = { source: "adapter" };
    manager = new SliderManager(slider.root, {
      onChange: () => {
        throw sentinel;
      },
    });

    dispatchWithExpectedError(slider.rail, pointerDown(), sentinel);

    expect(slider.input.value).toBe("50");
    expect(manager.initialize(slider.root)).toBeUndefined();
  });

  it("rolls completed synchronization surfaces back when an input write throws", () => {
    const slider = createInteractiveRoot();
    manager = new SliderManager(slider.root);
    const valueDescriptor = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      "value",
    );
    if (valueDescriptor?.get === undefined || valueDescriptor.set === undefined) {
      throw new Error("HTMLInputElement.value descriptor is unavailable");
    }
    const sentinel = new Error("value write failed");
    Object.defineProperty(slider.input, "value", {
      configurable: true,
      get: () => Reflect.apply(valueDescriptor.get as () => string, slider.input, []),
      set: (value: string) => {
        if (value === "50") {
          throw sentinel;
        }
        Reflect.apply(valueDescriptor.set as (value: string) => void, slider.input, [
          value,
        ]);
      },
    });

    dispatchWithExpectedError(slider.rail, pointerDown(), sentinel);

    expect(slider.input.value).toBe("40");
    expect(slider.input).toHaveAttribute("aria-valuenow", "40");
    expect(manager.initialize(slider.root)).toBeUndefined();
  });

  it("preserves the forward failure and terminates when rollback also fails", () => {
    const slider = createInteractiveRoot();
    manager = new SliderManager(slider.root);
    const valueDescriptor = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      "value",
    );
    if (valueDescriptor?.get === undefined || valueDescriptor.set === undefined) {
      throw new Error("HTMLInputElement.value descriptor is unavailable");
    }
    const forwardFailure = { source: "forward" };
    const rollbackFailure = { source: "rollback" };
    Object.defineProperty(slider.input, "value", {
      configurable: true,
      get: () => Reflect.apply(valueDescriptor.get as () => string, slider.input, []),
      set: (value: string) => {
        if (value === "50") throw forwardFailure;
        if (value === "40") throw rollbackFailure;
        Reflect.apply(valueDescriptor.set as (value: string) => void, slider.input, [
          value,
        ]);
      },
    });

    dispatchWithExpectedError(slider.rail, pointerDown(), forwardFailure);

    expect(() => manager?.initialize(slider.root)).toThrowError(
      expect.objectContaining({ code: "OWNERSHIP_CONFLICT" }),
    );
  });

  it("makes reentrant destroy during public initialization terminal and rolls back", () => {
    const browserDocument = document;
    vi.stubGlobal("document", undefined);
    manager = new SliderManager();
    vi.stubGlobal("document", browserDocument);
    const slider = createInteractiveRoot();
    const add = slider.root.addEventListener.bind(slider.root);
    let cancelled = false;
    vi.spyOn(slider.root, "addEventListener").mockImplementation(
      (type, listener, options) => {
        add(type, listener, options);
        if (!cancelled) {
          cancelled = true;
          manager?.destroy();
        }
      },
    );

    expect(() => manager?.initialize(slider.root)).toThrowError(
      expect.objectContaining({
        name: "SliderRegistrationError",
        code: "OWNERSHIP_CONFLICT",
      }),
    );
    expect(slider.root).toHaveAttribute("data-component", "slider");
    expect(slider.input.value).toBe("40");
    expect(() => manager?.initialize(slider.root)).toThrow(SliderRegistrationError);
  });

  it("guards rollback recovery from nested construction and originating destroy", () => {
    const browserDocument = document;
    vi.stubGlobal("document", undefined);
    manager = new SliderManager();
    vi.stubGlobal("document", browserDocument);
    const slider = createInteractiveRoot();
    const primaryFailure = { source: "listener acquisition" };
    let nestedFailure: unknown;
    let failAcquisition = true;
    const add = slider.root.addEventListener.bind(slider.root);
    const remove = slider.root.removeEventListener.bind(slider.root);
    vi.spyOn(slider.root, "addEventListener").mockImplementation(
      (type, listener, options) => {
        if (failAcquisition && type === "keydown") throw primaryFailure;
        add(type, listener, options);
      },
    );
    vi.spyOn(slider.root, "removeEventListener").mockImplementation(
      (type, listener, options) => {
        if (type === "pointerdown" && nestedFailure === undefined) {
          manager?.destroy();
          try {
            new SliderManager(slider.root);
          } catch (error) {
            nestedFailure = error;
          }
        }
        remove(type, listener, options);
      },
    );

    let thrown: unknown;
    try {
      manager?.initialize(slider.root);
    } catch (error) {
      thrown = error;
    }
    expect(thrown).toBe(primaryFailure);
    expect(nestedFailure).toBeInstanceOf(SliderRegistrationError);
    expect(nestedFailure).toMatchObject({ code: "OWNERSHIP_CONFLICT" });

    failAcquisition = false;
    expect(manager?.initialize(slider.root)).toBeUndefined();
  });
});
