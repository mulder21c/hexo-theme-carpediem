import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Slider from "../index";
import { SliderManager } from "../slider.ui";

interface FormSlider {
  readonly form: HTMLFormElement;
  readonly root: HTMLElement;
  readonly input: HTMLInputElement;
  readonly rail: HTMLElement;
  readonly captures: Set<number>;
}

function renderFormSlider(
  props: Partial<React.ComponentProps<typeof Slider>> = {},
): FormSlider {
  document.body.innerHTML = `<form id="settings">${renderToStaticMarkup(
    createElement(Slider, {
      min: 0,
      max: 100,
      value: 40,
      step: 5,
      name: "volume",
      "aria-label": "Volume",
      ...props,
    }),
  )}</form>`;
  const form = document.querySelector("form") as HTMLFormElement;
  const root = form.firstElementChild as HTMLElement;
  const input = root.querySelector("input") as HTMLInputElement;
  const rail = root.querySelector("[data-slider-rail]") as HTMLElement;
  const captures = new Set<number>();
  Object.defineProperties(root, {
    setPointerCapture: {
      configurable: true,
      value: vi.fn((id: number) => captures.add(id)),
    },
    hasPointerCapture: {
      configurable: true,
      value: vi.fn((id: number) => captures.has(id)),
    },
    releasePointerCapture: {
      configurable: true,
      value: vi.fn((id: number) => captures.delete(id)),
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
  return { form, root, input, rail, captures };
}

function pointerEvent(
  type: "pointerdown" | "pointermove" | "pointerup",
  clientX: number,
  pointerId = 1,
): PointerEvent {
  const event = new MouseEvent(type, {
    bubbles: true,
    cancelable: true,
    button: 0,
    clientX,
  });
  Object.defineProperties(event, {
    pointerId: { value: pointerId },
    isPrimary: { value: true },
  });
  return event as PointerEvent;
}

describe("SliderManager form and notification integration", () => {
  let manager: SliderManager | undefined;

  afterEach(() => {
    manager?.destroy();
    manager = undefined;
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    document.body.innerHTML = "";
  });

  it("submits the canonical value and excludes unnamed or disabled controls", () => {
    const slider = renderFormSlider();
    manager = new SliderManager(slider.root);
    slider.rail.dispatchEvent(pointerEvent("pointerdown", 55));

    expect(new FormData(slider.form).get("volume")).toBe("55");

    manager.destroy();
    const disabled = renderFormSlider({ disabled: true });
    manager = new SliderManager(disabled.root);
    expect(new FormData(disabled.form).has("volume")).toBe(false);

    manager.destroy();
    const unnamed = renderFormSlider({ name: "   " });
    manager = new SliderManager(unnamed.root);
    expect([...new FormData(unnamed.form).entries()]).toEqual([]);
  });

  it("dispatches change then adapter and commit then adapter with one normalized value", () => {
    const slider = renderFormSlider();
    const order: string[] = [];
    const details: number[] = [];
    slider.root.addEventListener("slider:change", (event) => {
      const customEvent = event as CustomEvent<{ value: number }>;
      order.push("change-event");
      details.push(customEvent.detail.value);
      expect(customEvent.bubbles).toBe(true);
      expect(customEvent.cancelable).toBe(false);
    });
    slider.root.addEventListener("slider:commit", (event) => {
      const customEvent = event as CustomEvent<{ value: number }>;
      order.push("commit-event");
      details.push(customEvent.detail.value);
    });
    manager = new SliderManager(slider.root, {
      onChange(value) {
        order.push("change-adapter");
        details.push(value);
      },
      onChangeCommitted(value) {
        order.push("commit-adapter");
        details.push(value);
      },
    });

    slider.rail.dispatchEvent(pointerEvent("pointerdown", 55));
    slider.root.dispatchEvent(pointerEvent("pointerup", 55));

    expect(order).toEqual([
      "change-event",
      "change-adapter",
      "commit-event",
      "commit-adapter",
    ]);
    expect(details).toEqual([55, 55, 55, 55]);
  });

  it("emits a complete change/commit sequence for changed keyboard input only", () => {
    const slider = renderFormSlider();
    const types: string[] = [];
    slider.root.addEventListener("slider:change", () => types.push("change"));
    slider.root.addEventListener("slider:commit", () => types.push("commit"));
    manager = new SliderManager(slider.root);

    slider.input.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "ArrowRight",
        bubbles: true,
        cancelable: true,
      }),
    );
    slider.input.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Home",
        bubbles: true,
        cancelable: true,
      }),
    );
    slider.input.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "ArrowLeft",
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(types).toEqual(["change", "commit", "change", "commit"]);
  });

  it("snapshots the CustomEvent constructor once per notification sequence", () => {
    const slider = renderFormSlider();
    const OriginalCustomEvent = CustomEvent;
    let reads = 0;
    Object.defineProperty(globalThis, "CustomEvent", {
      configurable: true,
      get: () => {
        reads += 1;
        return OriginalCustomEvent;
      },
    });
    manager = new SliderManager(slider.root);

    slider.input.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "ArrowRight",
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(reads).toBe(1);
    Object.defineProperty(globalThis, "CustomEvent", {
      configurable: true,
      value: OriginalCustomEvent,
      writable: true,
    });
  });

  it("resets to the immutable SSR baseline in one silent microtask", async () => {
    const slider = renderFormSlider();
    slider.input.value = "65";
    const notifications = vi.fn();
    slider.root.addEventListener("slider:change", notifications);
    slider.root.addEventListener("slider:commit", notifications);
    manager = new SliderManager(slider.root, {
      onChange: notifications,
      onChangeCommitted: notifications,
    });
    slider.rail.dispatchEvent(pointerEvent("pointerdown", 80));
    slider.root.dispatchEvent(pointerEvent("pointerup", 80));
    notifications.mockClear();

    slider.form.dispatchEvent(new Event("reset", { bubbles: true, cancelable: true }));
    expect(slider.input.value).toBe("80");
    await Promise.resolve();

    expect(slider.input.value).toBe("40");
    expect(slider.input).toHaveAttribute("aria-valuenow", "40");
    expect(notifications).not.toHaveBeenCalled();
  });

  it("honors final reset cancellation and explicit form reassociation", async () => {
    const slider = renderFormSlider();
    manager = new SliderManager(slider.root);
    slider.rail.dispatchEvent(pointerEvent("pointerdown", 70));
    slider.root.dispatchEvent(pointerEvent("pointerup", 70));
    slider.form.addEventListener("reset", (event) => event.preventDefault());
    slider.form.dispatchEvent(new Event("reset", { bubbles: true, cancelable: true }));
    await Promise.resolve();
    expect(slider.input.value).toBe("70");

    const nextForm = document.createElement("form");
    document.body.appendChild(nextForm);
    nextForm.appendChild(slider.root);
    expect(manager.refreshFormAssociation()).toBeUndefined();
    nextForm.dispatchEvent(new Event("reset", { bubbles: true, cancelable: true }));
    await Promise.resolve();
    expect(slider.input.value).toBe("40");
  });
});
