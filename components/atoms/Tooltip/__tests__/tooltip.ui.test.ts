import {
  HIDE_DELAY,
  SHOW_DELAY,
  TRANSITION_DURATION,
  TooltipManager,
} from "../tooltip.ui";

function createTooltipDom({
  triggerId,
  tooltipId,
  placement = "top",
  alignment = "center",
  triggerText = "Trigger",
}: {
  triggerId: string;
  tooltipId: string;
  placement?: "top" | "bottom" | "left" | "right";
  alignment?: "start" | "center" | "end";
  triggerText?: string;
}): {
  trigger: HTMLButtonElement;
  tooltip: HTMLSpanElement;
} {
  const trigger = document.createElement("button");
  trigger.id = triggerId;
  trigger.type = "button";
  trigger.textContent = triggerText;

  const tooltip = document.createElement("span");
  tooltip.id = tooltipId;
  tooltip.setAttribute("role", "tooltip");
  tooltip.setAttribute("data-component", "tooltip");
  tooltip.setAttribute("data-trigger", triggerId);
  tooltip.setAttribute("data-placement", placement);
  tooltip.setAttribute("data-alignment", alignment);
  tooltip.hidden = true;
  tooltip.style.opacity = "0";
  tooltip.textContent = "Tooltip content";

  const arrow = document.createElement("span");
  arrow.setAttribute("data-arrow", "");
  arrow.setAttribute("aria-hidden", "true");
  tooltip.appendChild(arrow);

  document.body.appendChild(trigger);
  document.body.appendChild(tooltip);

  return { trigger, tooltip };
}

function mockRect(
  element: HTMLElement,
  rect: {
    top: number;
    left: number;
    width: number;
    height: number;
  },
): void {
  Object.defineProperty(element, "getBoundingClientRect", {
    configurable: true,
    value: jest.fn(() => ({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      right: rect.left + rect.width,
      bottom: rect.top + rect.height,
      x: rect.left,
      y: rect.top,
      toJSON: jest.fn(),
    })),
  });
}

describe("TooltipManager UI", () => {
  let manager: TooltipManager;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
    document.body.innerHTML = "";

    if (window.tooltip) {
      window.tooltip.destroy();
    }

    global.requestAnimationFrame = jest.fn((callback: FrameRequestCallback) => {
      callback(0);
      return 0;
    }) as typeof global.requestAnimationFrame;
  });

  afterEach(() => {
    if (manager) {
      manager.destroy();
    }
    document.body.innerHTML = "";
    jest.useRealTimers();
  });

  it("initializes tooltip config and links trigger/tooltip accessibility attributes", () => {
    const { trigger, tooltip } = createTooltipDom({
      triggerId: "trigger-init",
      tooltipId: "tooltip-init",
      placement: "top",
      alignment: "center",
    });

    manager = new TooltipManager();

    expect(tooltip.hasAttribute("data-component")).toBe(false);
    expect(tooltip.hasAttribute("data-trigger")).toBe(false);
    expect(tooltip.hasAttribute("data-placement")).toBe(false);
    expect(tooltip.hasAttribute("data-alignment")).toBe(false);
    expect(trigger).toHaveAttribute("aria-describedby", "tooltip-init");
    expect(tooltip.style.transition).toContain(`opacity ${TRANSITION_DURATION}ms`);
  });

  it("keeps existing aria-describedby on trigger during initialization", () => {
    const { trigger } = createTooltipDom({
      triggerId: "trigger-described-by",
      tooltipId: "tooltip-described-by",
    });
    trigger.setAttribute("aria-describedby", "existing-describedby");

    manager = new TooltipManager();

    expect(trigger).toHaveAttribute("aria-describedby", "existing-describedby");
  });

  it("shows tooltip after mouse hover delay", () => {
    jest.useFakeTimers();
    const { trigger, tooltip } = createTooltipDom({
      triggerId: "trigger-hover",
      tooltipId: "tooltip-hover",
    });
    manager = new TooltipManager();

    trigger.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
    expect(tooltip.hidden).toBe(true);

    jest.advanceTimersByTime(SHOW_DELAY - 1);
    expect(tooltip.hidden).toBe(true);

    jest.advanceTimersByTime(1);
    expect(tooltip.hidden).toBe(false);
  });

  it("hides tooltip after mouse leave delay and transition", () => {
    jest.useFakeTimers();
    const { trigger, tooltip } = createTooltipDom({
      triggerId: "trigger-leave",
      tooltipId: "tooltip-leave",
    });
    manager = new TooltipManager();

    manager.showTooltip(trigger, "mouse");
    expect(tooltip.hidden).toBe(false);

    trigger.dispatchEvent(new MouseEvent("mouseleave", { bubbles: true }));

    jest.advanceTimersByTime(HIDE_DELAY - 1);
    expect(tooltip.hidden).toBe(false);

    jest.advanceTimersByTime(1);
    expect(tooltip.style.opacity).toBe("0");
    expect(tooltip.hidden).toBe(false);

    jest.advanceTimersByTime(TRANSITION_DURATION);
    expect(tooltip.hidden).toBe(true);
  });

  it("keeps tooltip visible when pointer moves from trigger to tooltip", () => {
    jest.useFakeTimers();
    const { trigger, tooltip } = createTooltipDom({
      triggerId: "trigger-hover-stay",
      tooltipId: "tooltip-hover-stay",
    });
    manager = new TooltipManager();

    trigger.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
    jest.advanceTimersByTime(SHOW_DELAY);
    expect(tooltip.hidden).toBe(false);

    trigger.dispatchEvent(new MouseEvent("mouseleave", { bubbles: true }));
    jest.advanceTimersByTime(HIDE_DELAY / 2);

    tooltip.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
    jest.advanceTimersByTime(HIDE_DELAY + TRANSITION_DURATION);

    expect(tooltip.hidden).toBe(false);
  });

  it("shows tooltip on focus and hides immediately on Escape", () => {
    const { trigger, tooltip } = createTooltipDom({
      triggerId: "trigger-focus",
      tooltipId: "tooltip-focus",
    });
    manager = new TooltipManager();

    trigger.dispatchEvent(new FocusEvent("focus", { bubbles: true }));
    expect(tooltip.hidden).toBe(false);

    window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    expect(tooltip.hidden).toBe(true);
    expect(tooltip.style.opacity).toBe("0");
  });

  it("switches active tooltip when another trigger gets focus", () => {
    const first = createTooltipDom({
      triggerId: "trigger-first",
      tooltipId: "tooltip-first",
      triggerText: "First",
    });
    const second = createTooltipDom({
      triggerId: "trigger-second",
      tooltipId: "tooltip-second",
      triggerText: "Second",
    });

    manager = new TooltipManager();

    first.trigger.dispatchEvent(new FocusEvent("focus", { bubbles: true }));
    expect(first.tooltip.hidden).toBe(false);
    expect(second.tooltip.hidden).toBe(true);

    second.trigger.dispatchEvent(new FocusEvent("focus", { bubbles: true }));
    expect(second.tooltip.hidden).toBe(false);
    expect(first.tooltip.hidden).toBe(true);
  });

  it("shows tooltip on long press and prevents default on touch end", () => {
    jest.useFakeTimers();
    const { trigger, tooltip } = createTooltipDom({
      triggerId: "trigger-touch",
      tooltipId: "tooltip-touch",
    });
    manager = new TooltipManager();

    const touchStartEvent = new Event("touchstart", {
      bubbles: true,
      cancelable: true,
    }) as TouchEvent;
    Object.defineProperty(touchStartEvent, "touches", {
      value: [{ clientX: 100, clientY: 100 }],
    });

    trigger.dispatchEvent(touchStartEvent);
    jest.advanceTimersByTime(499);
    expect(tooltip.hidden).toBe(true);

    jest.advanceTimersByTime(1);
    expect(tooltip.hidden).toBe(false);

    const touchEndEvent = new Event("touchend", {
      bubbles: true,
      cancelable: true,
    }) as TouchEvent;
    const preventDefaultSpy = jest.spyOn(touchEndEvent, "preventDefault");

    trigger.dispatchEvent(touchEndEvent);
    expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
  });

  it("falls back to opposite placement when primary placement is out of viewport", () => {
    const { trigger, tooltip } = createTooltipDom({
      triggerId: "trigger-fallback",
      tooltipId: "tooltip-fallback",
      placement: "top",
      alignment: "center",
    });
    const arrow = tooltip.querySelector("[data-arrow]") as HTMLElement;

    Object.defineProperty(window, "innerWidth", { configurable: true, value: 500 });
    Object.defineProperty(window, "innerHeight", { configurable: true, value: 400 });

    mockRect(trigger, { top: 5, left: 200, width: 40, height: 20 });
    mockRect(tooltip, { top: 0, left: 0, width: 100, height: 60 });

    manager = new TooltipManager();
    manager.showTooltip(trigger, "mouse");

    expect(tooltip.hidden).toBe(false);
    expect(Number.parseFloat(tooltip.style.top)).toBeCloseTo(37, 0);
    expect(arrow.style.top).toBe("-4px");
    expect(arrow.style.bottom).toBe("");
  });

  it("clamps tooltip coordinates within viewport when fallback placement also overflows", () => {
    const { trigger, tooltip } = createTooltipDom({
      triggerId: "trigger-clamp",
      tooltipId: "tooltip-clamp",
      placement: "top",
      alignment: "center",
    });

    Object.defineProperty(window, "innerWidth", { configurable: true, value: 300 });
    Object.defineProperty(window, "innerHeight", { configurable: true, value: 200 });

    mockRect(trigger, { top: 5, left: 260, width: 30, height: 20 });
    mockRect(tooltip, { top: 0, left: 0, width: 250, height: 60 });

    manager = new TooltipManager();
    manager.showTooltip(trigger, "mouse");

    expect(tooltip.hidden).toBe(false);
    expect(Number.parseFloat(tooltip.style.top)).toBeCloseTo(8, 0);
    expect(Number.parseFloat(tooltip.style.left)).toBeCloseTo(42, 0);
  });

  it("adjusts overflowing bottom-right coordinates into viewport bounds", () => {
    const { trigger, tooltip } = createTooltipDom({
      triggerId: "trigger-adjust",
      tooltipId: "tooltip-adjust",
      placement: "bottom",
      alignment: "center",
    });

    Object.defineProperty(window, "innerWidth", { configurable: true, value: 300 });
    Object.defineProperty(window, "innerHeight", { configurable: true, value: 200 });

    mockRect(trigger, { top: 180, left: 280, width: 30, height: 20 });
    mockRect(tooltip, { top: 0, left: 0, width: 100, height: 60 });

    manager = new TooltipManager();
    manager.showTooltip(trigger, "mouse");

    expect(tooltip.hidden).toBe(false);
    expect(Number.parseFloat(tooltip.style.top)).toBeCloseTo(132, 0);
    expect(Number.parseFloat(tooltip.style.left)).toBeCloseTo(192, 0);
  });

  it("hides active touch tooltip when touching outside trigger and tooltip", () => {
    jest.useFakeTimers();
    const { trigger, tooltip } = createTooltipDom({
      triggerId: "trigger-outside-touch",
      tooltipId: "tooltip-outside-touch",
    });
    manager = new TooltipManager();

    manager.showTooltip(trigger, "touch");
    expect(tooltip.hidden).toBe(false);

    const outside = document.createElement("div");
    document.body.appendChild(outside);

    const outsideTouchEvent = new Event("touchstart", {
      bubbles: true,
      cancelable: true,
    }) as TouchEvent;
    Object.defineProperty(outsideTouchEvent, "target", {
      value: outside,
      configurable: true,
    });

    const internalManager = manager as unknown as {
      handleOutsideTouch: (event: TouchEvent) => void;
    };
    internalManager.handleOutsideTouch(outsideTouchEvent);
    expect(tooltip.style.opacity).toBe("0");
  });

  it("cleans active tooltip when trigger node is removed from DOM", async () => {
    const { trigger, tooltip } = createTooltipDom({
      triggerId: "trigger-remove",
      tooltipId: "tooltip-remove",
    });
    manager = new TooltipManager();

    manager.showTooltip(trigger, "keyboard");
    expect(tooltip.hidden).toBe(false);

    trigger.remove();
    await new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 0);
    });

    expect(tooltip.hidden).toBe(true);

    manager.showTooltip(trigger, "keyboard");
    expect(tooltip.hidden).toBe(true);
  });

  it("keeps keyboard-triggered tooltip visible on mouse leave", () => {
    jest.useFakeTimers();
    const { trigger, tooltip } = createTooltipDom({
      triggerId: "trigger-keyboard-priority",
      tooltipId: "tooltip-keyboard-priority",
    });
    manager = new TooltipManager();

    trigger.dispatchEvent(new FocusEvent("focus", { bubbles: true }));
    expect(tooltip.hidden).toBe(false);

    trigger.dispatchEvent(new MouseEvent("mouseleave", { bubbles: true }));
    jest.advanceTimersByTime(HIDE_DELAY + TRANSITION_DURATION);

    expect(tooltip.hidden).toBe(false);
  });

  it("cancels long-press tooltip when touch moves beyond tolerance", () => {
    jest.useFakeTimers();
    const { trigger, tooltip } = createTooltipDom({
      triggerId: "trigger-touch-move",
      tooltipId: "tooltip-touch-move",
    });
    manager = new TooltipManager();

    const touchStartEvent = new Event("touchstart", {
      bubbles: true,
      cancelable: true,
    }) as TouchEvent;
    Object.defineProperty(touchStartEvent, "touches", {
      value: [{ clientX: 100, clientY: 100 }],
    });
    trigger.dispatchEvent(touchStartEvent);

    const touchMoveEvent = new Event("touchmove", {
      bubbles: true,
      cancelable: true,
    }) as TouchEvent;
    Object.defineProperty(touchMoveEvent, "touches", {
      value: [{ clientX: 130, clientY: 130 }],
    });
    trigger.dispatchEvent(touchMoveEvent);

    jest.advanceTimersByTime(500);
    expect(tooltip.hidden).toBe(true);
  });

  it("applies left placement start alignment and positions arrow on right edge", () => {
    const { trigger, tooltip } = createTooltipDom({
      triggerId: "trigger-left-start",
      tooltipId: "tooltip-left-start",
      placement: "left",
      alignment: "start",
    });
    const arrow = tooltip.querySelector("[data-arrow]") as HTMLElement;

    Object.defineProperty(window, "innerWidth", { configurable: true, value: 800 });
    Object.defineProperty(window, "innerHeight", { configurable: true, value: 600 });

    mockRect(trigger, { top: 100, left: 500, width: 80, height: 40 });
    mockRect(tooltip, { top: 0, left: 0, width: 120, height: 60 });

    manager = new TooltipManager();
    manager.showTooltip(trigger, "mouse");

    expect(tooltip.hidden).toBe(false);
    expect(Number.parseFloat(tooltip.style.top)).toBeCloseTo(100, 0);
    expect(Number.parseFloat(tooltip.style.left)).toBeCloseTo(368, 0);
    expect(arrow.style.right).toBe("-4px");
    expect(arrow.style.left).toBe("");
    expect(arrow.style.top).not.toBe("");
  });

  it("applies right placement end alignment and positions arrow on left edge", () => {
    const { trigger, tooltip } = createTooltipDom({
      triggerId: "trigger-right-end",
      tooltipId: "tooltip-right-end",
      placement: "right",
      alignment: "end",
    });
    const arrow = tooltip.querySelector("[data-arrow]") as HTMLElement;

    Object.defineProperty(window, "innerWidth", { configurable: true, value: 1000 });
    Object.defineProperty(window, "innerHeight", { configurable: true, value: 700 });

    mockRect(trigger, { top: 200, left: 100, width: 80, height: 70 });
    mockRect(tooltip, { top: 0, left: 0, width: 140, height: 90 });

    manager = new TooltipManager();
    manager.showTooltip(trigger, "mouse");

    expect(tooltip.hidden).toBe(false);
    expect(Number.parseFloat(tooltip.style.top)).toBeCloseTo(180, 0);
    expect(Number.parseFloat(tooltip.style.left)).toBeCloseTo(192, 0);
    expect(arrow.style.left).toBe("-4px");
    expect(arrow.style.right).toBe("");
    expect(arrow.style.top).not.toBe("");
  });

  it("hides active tooltip on window scroll and resize", () => {
    const { trigger, tooltip } = createTooltipDom({
      triggerId: "trigger-global-hide",
      tooltipId: "tooltip-global-hide",
    });
    manager = new TooltipManager();

    manager.showTooltip(trigger, "mouse");
    expect(tooltip.hidden).toBe(false);

    window.dispatchEvent(new Event("scroll"));
    expect(tooltip.hidden).toBe(true);

    manager.showTooltip(trigger, "mouse");
    expect(tooltip.hidden).toBe(false);

    window.dispatchEvent(new Event("resize"));
    expect(tooltip.hidden).toBe(true);
  });

  it("skips tooltip already managed when init runs again", () => {
    const { tooltip } = createTooltipDom({
      triggerId: "trigger-reinit-skip",
      tooltipId: "tooltip-reinit-skip",
    });
    manager = new TooltipManager();

    tooltip.setAttribute("data-component", "tooltip");
    const internalManager = manager as unknown as {
      init: () => void;
      tooltips: Map<string, unknown>;
    };

    internalManager.init();
    expect(internalManager.tooltips.size).toBe(1);
  });

  it("logs error when tooltip data-trigger attribute is missing", () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    const tooltip = document.createElement("span");
    tooltip.id = "tooltip-missing-trigger";
    tooltip.setAttribute("role", "tooltip");
    tooltip.setAttribute("data-component", "tooltip");
    document.body.appendChild(tooltip);

    manager = new TooltipManager();

    expect(errorSpy).toHaveBeenCalledWith(
      "TooltipManager: Missing data-trigger attribute on tooltip element",
      tooltip,
    );

    errorSpy.mockRestore();
  });

  it("logs error when tooltip trigger element cannot be found", () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    const tooltip = document.createElement("span");
    tooltip.id = "tooltip-without-target";
    tooltip.setAttribute("role", "tooltip");
    tooltip.setAttribute("data-component", "tooltip");
    tooltip.setAttribute("data-trigger", "missing-target");
    document.body.appendChild(tooltip);

    manager = new TooltipManager();

    expect(errorSpy).toHaveBeenCalledWith(
      'TooltipManager: Trigger element with ID "missing-target" not found.',
    );

    errorSpy.mockRestore();
  });

  it("hides keyboard-triggered tooltip on blur", () => {
    const { trigger, tooltip } = createTooltipDom({
      triggerId: "trigger-blur-hide",
      tooltipId: "tooltip-blur-hide",
    });
    manager = new TooltipManager();

    trigger.dispatchEvent(new FocusEvent("focus", { bubbles: true }));
    expect(tooltip.hidden).toBe(false);

    trigger.dispatchEvent(new FocusEvent("blur", { bubbles: true }));
    expect(tooltip.hidden).toBe(true);
  });

  it("schedules hide when pointer leaves tooltip content", () => {
    jest.useFakeTimers();
    const { trigger, tooltip } = createTooltipDom({
      triggerId: "trigger-tooltip-leave",
      tooltipId: "tooltip-tooltip-leave",
    });
    manager = new TooltipManager();

    trigger.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
    jest.advanceTimersByTime(SHOW_DELAY);
    expect(tooltip.hidden).toBe(false);

    tooltip.dispatchEvent(new MouseEvent("mouseleave", { bubbles: true }));
    jest.advanceTimersByTime(HIDE_DELAY);
    jest.advanceTimersByTime(TRANSITION_DURATION);

    expect(tooltip.hidden).toBe(true);
  });

  it("resets touch trigger mode after short tap and allows subsequent hover", () => {
    jest.useFakeTimers();
    const { trigger, tooltip } = createTooltipDom({
      triggerId: "trigger-short-tap",
      tooltipId: "tooltip-short-tap",
    });
    manager = new TooltipManager();

    const touchStartEvent = new Event("touchstart", {
      bubbles: true,
      cancelable: true,
    }) as TouchEvent;
    Object.defineProperty(touchStartEvent, "touches", {
      value: [{ clientX: 100, clientY: 100 }],
    });
    trigger.dispatchEvent(touchStartEvent);

    const touchEndEvent = new Event("touchend", {
      bubbles: true,
      cancelable: true,
    }) as TouchEvent;
    trigger.dispatchEvent(touchEndEvent);

    trigger.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
    jest.advanceTimersByTime(SHOW_DELAY);

    expect(tooltip.hidden).toBe(false);
  });

  it("removes detached inactive trigger from internal registry", async () => {
    const first = createTooltipDom({
      triggerId: "trigger-registry-first",
      tooltipId: "tooltip-registry-first",
    });
    const second = createTooltipDom({
      triggerId: "trigger-registry-second",
      tooltipId: "tooltip-registry-second",
    });
    manager = new TooltipManager();

    second.trigger.remove();
    await new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 0);
    });

    manager.showTooltip(second.trigger, "mouse");
    expect(second.tooltip.hidden).toBe(true);

    manager.showTooltip(first.trigger, "mouse");
    expect(first.tooltip.hidden).toBe(false);
  });

  it.each([
    { alignment: "start" as const, expectedLeft: 300 },
    { alignment: "end" as const, expectedLeft: 320 },
  ])(
    "applies top placement horizontal offset for alignment=$alignment",
    ({ alignment, expectedLeft }) => {
      const { trigger, tooltip } = createTooltipDom({
        triggerId: `trigger-top-${alignment}`,
        tooltipId: `tooltip-top-${alignment}`,
        placement: "top",
        alignment,
      });

      Object.defineProperty(window, "innerWidth", { configurable: true, value: 1200 });
      Object.defineProperty(window, "innerHeight", { configurable: true, value: 800 });

      mockRect(trigger, { top: 200, left: 300, width: 100, height: 40 });
      mockRect(tooltip, { top: 0, left: 0, width: 80, height: 30 });

      manager = new TooltipManager();
      manager.showTooltip(trigger, "mouse");

      expect(Number.parseFloat(tooltip.style.left)).toBeCloseTo(expectedLeft, 0);
    },
  );

  it("applies center alignment for horizontal placement", () => {
    const { trigger, tooltip } = createTooltipDom({
      triggerId: "trigger-left-center",
      tooltipId: "tooltip-left-center",
      placement: "left",
      alignment: "center",
    });

    Object.defineProperty(window, "innerWidth", { configurable: true, value: 1200 });
    Object.defineProperty(window, "innerHeight", { configurable: true, value: 800 });

    mockRect(trigger, { top: 300, left: 500, width: 80, height: 80 });
    mockRect(tooltip, { top: 0, left: 0, width: 120, height: 40 });

    manager = new TooltipManager();
    manager.showTooltip(trigger, "mouse");

    expect(Number.parseFloat(tooltip.style.top)).toBeCloseTo(320, 0);
  });

  it("returns expected fallback placement including default branch", () => {
    manager = new TooltipManager();
    const internalManager = manager as unknown as {
      getFallbackPlacement: (
        placement: "top" | "bottom" | "left" | "right" | "invalid",
      ) => string;
    };

    expect(internalManager.getFallbackPlacement("left")).toBe("right");
    expect(internalManager.getFallbackPlacement("right")).toBe("left");
    expect(internalManager.getFallbackPlacement("invalid")).toBe("top");
  });

  it("centers arrow for left placement when trigger is taller than tooltip", () => {
    const { trigger, tooltip } = createTooltipDom({
      triggerId: "trigger-left-tall",
      tooltipId: "tooltip-left-tall",
      placement: "left",
      alignment: "center",
    });
    const arrow = tooltip.querySelector("[data-arrow]") as HTMLElement;

    Object.defineProperty(window, "innerWidth", { configurable: true, value: 1200 });
    Object.defineProperty(window, "innerHeight", { configurable: true, value: 800 });

    mockRect(trigger, { top: 220, left: 600, width: 80, height: 120 });
    mockRect(tooltip, { top: 0, left: 0, width: 120, height: 40 });

    manager = new TooltipManager();
    manager.showTooltip(trigger, "mouse");

    expect(arrow.style.right).toBe("-4px");
    expect(arrow.style.top).toBe("16px");
  });

  it("centers arrow for right placement when trigger is taller than tooltip", () => {
    const { trigger, tooltip } = createTooltipDom({
      triggerId: "trigger-right-tall",
      tooltipId: "tooltip-right-tall",
      placement: "right",
      alignment: "center",
    });
    const arrow = tooltip.querySelector("[data-arrow]") as HTMLElement;

    Object.defineProperty(window, "innerWidth", { configurable: true, value: 1200 });
    Object.defineProperty(window, "innerHeight", { configurable: true, value: 800 });

    mockRect(trigger, { top: 220, left: 200, width: 80, height: 120 });
    mockRect(tooltip, { top: 0, left: 0, width: 140, height: 40 });

    manager = new TooltipManager();
    manager.showTooltip(trigger, "mouse");

    expect(arrow.style.left).toBe("-4px");
    expect(arrow.style.top).toBe("16px");
  });

  it("updates trigger method when showTooltip is called again for active tooltip", () => {
    const { trigger } = createTooltipDom({
      triggerId: "trigger-repeated-show",
      tooltipId: "tooltip-repeated-show",
    });
    manager = new TooltipManager();
    const internalManager = manager as unknown as {
      activeTriggerMethod: "mouse" | "keyboard" | "touch" | null;
    };

    manager.showTooltip(trigger, "keyboard");
    expect(internalManager.activeTriggerMethod).toBe("keyboard");

    manager.showTooltip(trigger, "mouse");
    expect(internalManager.activeTriggerMethod).toBe("keyboard");

    manager.showTooltip(trigger, "touch");
    expect(internalManager.activeTriggerMethod).toBe("touch");
  });

  it("hides tooltip in transition callback when another tooltip becomes active", () => {
    jest.useFakeTimers();
    const first = createTooltipDom({
      triggerId: "trigger-timeout-first",
      tooltipId: "tooltip-timeout-first",
    });
    const second = createTooltipDom({
      triggerId: "trigger-timeout-second",
      tooltipId: "tooltip-timeout-second",
    });
    manager = new TooltipManager();

    manager.showTooltip(first.trigger, "mouse");
    expect(first.tooltip.hidden).toBe(false);

    manager.hideTooltip(first.trigger, false);
    manager.showTooltip(second.trigger, "mouse");

    jest.advanceTimersByTime(TRANSITION_DURATION);

    expect(first.tooltip.hidden).toBe(true);
    expect(second.tooltip.hidden).toBe(false);
  });
});
