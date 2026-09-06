import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Slider from "../index";
import { SliderManager } from "../slider.ui";

interface RenderedSlider {
  readonly root: HTMLElement;
  readonly input: HTMLInputElement;
  readonly rail: HTMLElement;
  readonly thumb: HTMLElement;
  readonly capturedPointers: Set<number>;
}

function renderSlider(
  props: Partial<React.ComponentProps<typeof Slider>> = {},
): RenderedSlider {
  document.body.innerHTML = renderToStaticMarkup(
    createElement(Slider, {
      min: 0,
      max: 100,
      value: 40,
      step: 5,
      name: "volume",
      "aria-label": "Volume",
      ...props,
    }),
  );
  const root = document.body.firstElementChild as HTMLElement;
  const input = root.querySelector("input") as HTMLInputElement;
  const rail = root.querySelector("[data-slider-rail]") as HTMLElement;
  const thumb = root.querySelector("[data-slider-thumb]") as HTMLElement;
  const capturedPointers = new Set<number>();
  Object.defineProperties(root, {
    setPointerCapture: {
      configurable: true,
      value: vi.fn((pointerId: number) => capturedPointers.add(pointerId)),
    },
    hasPointerCapture: {
      configurable: true,
      value: vi.fn((pointerId: number) => capturedPointers.has(pointerId)),
    },
    releasePointerCapture: {
      configurable: true,
      value: vi.fn((pointerId: number) => capturedPointers.delete(pointerId)),
    },
  });
  vi.spyOn(input, "focus").mockImplementation(() => undefined);
  vi.spyOn(rail, "getBoundingClientRect").mockReturnValue({
    x: 100,
    y: 20,
    top: 20,
    left: 100,
    right: 300,
    bottom: 40,
    width: 200,
    height: 20,
    toJSON: () => ({}),
  });
  return { root, input, rail, thumb, capturedPointers };
}

function pointerEvent(
  type: string,
  init: MouseEventInit & { pointerId?: number; isPrimary?: boolean } = {},
): PointerEvent {
  const event = new MouseEvent(type, {
    bubbles: true,
    cancelable: true,
    button: 0,
    clientX: 100,
    clientY: 20,
    ...init,
  });
  Object.defineProperties(event, {
    pointerId: { value: init.pointerId ?? 1 },
    isPrimary: { value: init.isPrimary ?? true },
  });
  return event as PointerEvent;
}

function expectValueSurfaces(slider: RenderedSlider, value: string, ratio: string): void {
  expect(slider.input.value).toBe(value);
  expect(slider.input).toHaveAttribute("aria-valuenow", value);
  expect(slider.rail.style.getPropertyValue("--slider-value-ratio")).toBe(ratio);
  expect(slider.thumb.style.getPropertyValue("--slider-value-ratio")).toBe(ratio);
}

describe("SliderManager pointer and keyboard interaction", () => {
  let manager: SliderManager | undefined;

  afterEach(() => {
    manager?.destroy();
    manager = undefined;
    vi.restoreAllMocks();
    document.body.innerHTML = "";
  });

  it("captures on the root, focuses with preventScroll, and synchronizes pointer values", () => {
    const slider = renderSlider();
    const ancestorPointerDown = vi.fn();
    document.body.addEventListener("pointerdown", ancestorPointerDown);
    manager = new SliderManager(slider.root);
    const start = performance.now();
    const down = pointerEvent("pointerdown", { clientX: 200, pointerId: 7 });

    slider.rail.dispatchEvent(down);

    expect(down.defaultPrevented).toBe(true);
    expect(slider.root.setPointerCapture).toHaveBeenCalledWith(7);
    expect(slider.root.hasPointerCapture).toHaveBeenCalledTimes(2);
    expect(slider.input.focus).toHaveBeenCalledWith({ preventScroll: true });
    expect(ancestorPointerDown).toHaveBeenCalledTimes(1);
    expectValueSurfaces(slider, "50", "0.5");
    expect(performance.now() - start).toBeLessThan(100);

    const move = pointerEvent("pointermove", { clientX: 300, pointerId: 7 });
    slider.root.dispatchEvent(move);
    expect(move.defaultPrevented).toBe(true);
    expectValueSurfaces(slider, "100", "1");

    slider.root.dispatchEvent(pointerEvent("pointerup", { pointerId: 7 }));
    expect(slider.root.releasePointerCapture).toHaveBeenCalledWith(7);
    expect(slider.capturedPointers.has(7)).toBe(false);
  });

  it("selects an initialization-time mark-label identity without reading geometry", () => {
    const slider = renderSlider();
    slider.root.setAttribute("data-slider-marks", "custom");
    const mark = document.createElement("span");
    mark.setAttribute("data-slider-mark", "");
    mark.setAttribute("data-slider-mark-value", "75");
    const label = document.createElement("span");
    label.setAttribute("data-slider-mark-label", "");
    label.textContent = "Three quarters";
    mark.appendChild(label);
    slider.rail.appendChild(mark);
    manager = new SliderManager(slider.root);

    label.dispatchEvent(pointerEvent("pointerdown", { pointerId: 3 }));

    expect(slider.rail.getBoundingClientRect).not.toHaveBeenCalled();
    expectValueSurfaces(slider, "75", "0.75");
  });

  it("uses a fresh event-local rect, clamps endpoints, and recovers after invalid geometry", () => {
    const slider = renderSlider();
    const rectSpy = vi.mocked(slider.rail.getBoundingClientRect);
    manager = new SliderManager(slider.root);
    slider.rail.dispatchEvent(pointerEvent("pointerdown", { clientX: -100 }));
    expectValueSurfaces(slider, "0", "0");

    rectSpy.mockReturnValueOnce({
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: 0,
      height: 0,
      toJSON: () => ({}),
    });
    slider.root.dispatchEvent(pointerEvent("pointermove", { clientX: 50 }));
    expectValueSurfaces(slider, "0", "0");

    rectSpy.mockReturnValueOnce({
      x: 200,
      y: 20,
      top: 20,
      left: 200,
      right: 300,
      bottom: 40,
      width: 100,
      height: 20,
      toJSON: () => ({}),
    });
    slider.root.dispatchEvent(pointerEvent("pointermove", { clientX: 250 }));
    expectValueSurfaces(slider, "50", "0.5");
    expect(rectSpy).toHaveBeenCalledTimes(3);
  });

  it("rejects non-owned, pre-canceled, non-primary, secondary, and disabled pointerdown", () => {
    const slider = renderSlider();
    manager = new SliderManager(slider.root);
    const initialSetCaptureCalls = vi.mocked(slider.root.setPointerCapture).mock.calls
      .length;
    const events = [
      pointerEvent("pointerdown", { isPrimary: false }),
      pointerEvent("pointerdown", { button: 1 }),
      pointerEvent("pointerdown"),
    ];
    events[2]?.preventDefault();

    slider.input.dispatchEvent(pointerEvent("pointerdown"));
    for (const event of events) {
      slider.rail.dispatchEvent(event);
    }

    expect(slider.root.setPointerCapture).toHaveBeenCalledTimes(initialSetCaptureCalls);
    expectValueSurfaces(slider, "40", "0.4");

    manager.destroy();
    const disabled = renderSlider({ disabled: true });
    manager = new SliderManager(disabled.root);
    disabled.rail.dispatchEvent(pointerEvent("pointerdown"));
    expect(disabled.root.setPointerCapture).not.toHaveBeenCalled();
  });

  it("maps every keyboard family, repeat, boundaries, and modifier gates", () => {
    const slider = renderSlider();
    manager = new SliderManager(slider.root);
    const dispatchKey = (key: string, init: KeyboardEventInit = {}): KeyboardEvent => {
      const event = new KeyboardEvent("keydown", {
        key,
        bubbles: true,
        cancelable: true,
        ...init,
      });
      slider.input.dispatchEvent(event);
      return event;
    };

    expect(dispatchKey("ArrowRight").defaultPrevented).toBe(true);
    expectValueSurfaces(slider, "45", "0.45");
    dispatchKey("ArrowUp", { repeat: true });
    expectValueSurfaces(slider, "50", "0.5");
    dispatchKey("PageUp");
    expectValueSurfaces(slider, "60", "0.6");
    dispatchKey("PageDown");
    expectValueSurfaces(slider, "50", "0.5");
    dispatchKey("Home");
    expectValueSurfaces(slider, "0", "0");
    dispatchKey("ArrowLeft");
    expectValueSurfaces(slider, "0", "0");
    dispatchKey("End");
    expectValueSurfaces(slider, "100", "1");
    expect(dispatchKey("ArrowRight", { ctrlKey: true }).defaultPrevented).toBe(false);
    expectValueSurfaces(slider, "100", "1");
    expect(dispatchKey("Unrecognized").defaultPrevented).toBe(false);
  });

  it("lets an active pointer take precedence over admitted keyboard input", () => {
    const slider = renderSlider();
    manager = new SliderManager(slider.root);
    slider.rail.dispatchEvent(pointerEvent("pointerdown", { clientX: 150 }));
    const event = new KeyboardEvent("keydown", {
      key: "End",
      bubbles: true,
      cancelable: true,
    });

    slider.input.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
    expectValueSurfaces(slider, "25", "0.25");
  });

  it("does not synthesize or intercept native input and change events", () => {
    const slider = renderSlider();
    const nativeInput = vi.fn();
    const nativeChange = vi.fn();
    slider.input.addEventListener("input", nativeInput);
    slider.input.addEventListener("change", nativeChange);
    manager = new SliderManager(slider.root);

    slider.rail.dispatchEvent(pointerEvent("pointerdown", { clientX: 200 }));
    slider.root.dispatchEvent(pointerEvent("pointerup"));

    expect(nativeInput).not.toHaveBeenCalled();
    expect(nativeChange).not.toHaveBeenCalled();
  });

  it("uses restricted marks for pointer, Arrow, Page, endpoints, and aria-valuetext", () => {
    const slider = renderSlider({
      step: null,
      value: 35,
      shiftStep: 15,
      marks: [
        { value: 20, label: "Low" },
        { value: 50, label: "Mid" },
        { value: 80, label: "High" },
      ],
    });
    const labels = slider.root.querySelectorAll<HTMLElement>("[data-slider-mark-label]");
    manager = new SliderManager(slider.root);
    labels[2]?.dispatchEvent(pointerEvent("pointerdown", { pointerId: 8 }));
    slider.root.dispatchEvent(pointerEvent("pointerup", { pointerId: 8 }));
    expect(slider.input.value).toBe("80");
    expect(slider.input).toHaveAttribute("aria-valuetext", "High");

    const key = (value: string): void => {
      slider.input.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: value,
          bubbles: true,
          cancelable: true,
        }),
      );
    };
    key("ArrowLeft");
    expect(slider.input.value).toBe("50");
    expect(slider.input).toHaveAttribute("aria-valuetext", "Mid");
    key("PageDown");
    expect(slider.input.value).toBe("20");
    key("Home");
    expect(slider.input.value).toBe("20");
    key("End");
    expect(slider.input.value).toBe("80");
  });

  it("maps vertical pointer coordinates bottom-to-top with one fresh read", () => {
    const slider = renderSlider({ orientation: "vertical" });
    const rectSpy = vi.mocked(slider.rail.getBoundingClientRect);
    rectSpy.mockReturnValue({
      x: 20,
      y: 100,
      top: 100,
      left: 20,
      right: 40,
      bottom: 300,
      width: 20,
      height: 200,
      toJSON: () => ({}),
    });
    manager = new SliderManager(slider.root);

    slider.rail.dispatchEvent(
      pointerEvent("pointerdown", { clientX: 30, clientY: 300, pointerId: 4 }),
    );
    expectValueSurfaces(slider, "0", "0");
    slider.root.dispatchEvent(
      pointerEvent("pointermove", { clientX: 30, clientY: 100, pointerId: 4 }),
    );
    expectValueSurfaces(slider, "100", "1");
    expect(rectSpy).toHaveBeenCalledTimes(2);
  });

  it("keeps the horizontal value axis physically left-to-right in RTL", () => {
    const slider = renderSlider();
    slider.root.dir = "rtl";
    manager = new SliderManager(slider.root);

    slider.rail.dispatchEvent(pointerEvent("pointerdown", { clientX: 100 }));
    expectValueSurfaces(slider, "0", "0");
    slider.root.dispatchEvent(pointerEvent("pointermove", { clientX: 300 }));
    expectValueSurfaces(slider, "100", "1");
  });
});
