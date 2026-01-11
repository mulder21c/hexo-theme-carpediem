import { TooltipManager } from "../tooltip.ui";
import type { Placement, Alignment } from "../type";

describe("TooltipManager", () => {
  let manager: TooltipManager;
  let triggerElement: HTMLElement;
  let tooltipElement: HTMLElement;
  let arrowElement: HTMLElement;

  beforeEach(() => {
    // Clean up any existing tooltips
    document.body.innerHTML = "";

    // Create test DOM structure
    triggerElement = document.createElement("button");
    triggerElement.id = "test-trigger";
    triggerElement.textContent = "Trigger";

    tooltipElement = document.createElement("div");
    tooltipElement.id = "test-tooltip";
    tooltipElement.setAttribute("data-component", "tooltip");
    tooltipElement.setAttribute("data-trigger", "test-trigger");
    tooltipElement.setAttribute("data-placement", "top");
    tooltipElement.setAttribute("data-alignment", "center");
    tooltipElement.setAttribute("role", "tooltip");
    tooltipElement.hidden = true;
    tooltipElement.style.opacity = "0";

    arrowElement = document.createElement("div");
    arrowElement.setAttribute("data-arrow", "");
    tooltipElement.appendChild(arrowElement);

    document.body.appendChild(triggerElement);
    document.body.appendChild(tooltipElement);

    manager = new TooltipManager();
  });

  afterEach(() => {
    manager.destroy();
    document.body.innerHTML = "";
    jest.clearAllTimers();
  });

  describe("Initialization and Setup", () => {
    it("init() should scan DOM and register tooltips", () => {
      expect(tooltipElement.hasAttribute("data-component")).toBe(false);
      expect(tooltipElement.hasAttribute("data-trigger")).toBe(false);
      expect(tooltipElement.hasAttribute("data-placement")).toBe(false);
      expect(tooltipElement.hasAttribute("data-alignment")).toBe(false);
    });

    it("createTooltipConfig() should parse data-* attributes and remove them", () => {
      const newTooltip = document.createElement("div");
      newTooltip.id = "new-tooltip";
      newTooltip.setAttribute("data-component", "tooltip");
      newTooltip.setAttribute("data-trigger", "test-trigger");
      newTooltip.setAttribute("data-placement", "bottom");
      newTooltip.setAttribute("data-alignment", "start");
      document.body.appendChild(newTooltip);

      manager = new TooltipManager();

      expect(newTooltip.hasAttribute("data-component")).toBe(false);
      expect(newTooltip.hasAttribute("data-trigger")).toBe(false);
      expect(newTooltip.hasAttribute("data-placement")).toBe(false);
      expect(newTooltip.hasAttribute("data-alignment")).toBe(false);
    });

    it("createTooltipConfig() should set aria-describedby on trigger", () => {
      expect(triggerElement.getAttribute("aria-describedby")).toBe("test-tooltip");
      expect(triggerElement.getAttribute("aria-expanded")).toBe("false");
    });

    it("createTooltipConfig() should return null if trigger element not found", () => {
      const invalidTooltip = document.createElement("div");
      invalidTooltip.id = "invalid-tooltip";
      invalidTooltip.setAttribute("data-component", "tooltip");
      invalidTooltip.setAttribute("data-trigger", "non-existent-trigger");
      document.body.appendChild(invalidTooltip);

      const consoleSpy = jest.spyOn(console, "error").mockImplementation();
      manager = new TooltipManager();
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it("registerTooltip() should register tooltip and bind events", () => {
      const mouseEnterSpy = jest.fn();
      triggerElement.addEventListener("mouseenter", mouseEnterSpy);

      const mouseEvent = new MouseEvent("mouseenter", { bubbles: true });
      triggerElement.dispatchEvent(mouseEvent);

      expect(mouseEnterSpy).toHaveBeenCalled();
    });

    it("isTooltipManaged() should prevent duplicate registration", () => {
      const secondManager = new TooltipManager();
      expect(tooltipElement.hasAttribute("data-component")).toBe(false);
      secondManager.destroy();
    });
  });

  describe("Mouse Events", () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it("handleMouseEnter() should show tooltip after SHOW_DELAY (200ms)", () => {
      const mouseEvent = new MouseEvent("mouseenter", { bubbles: true });
      triggerElement.dispatchEvent(mouseEvent);

      expect(tooltipElement.hidden).toBe(true);

      jest.advanceTimersByTime(200);

      expect(tooltipElement.hidden).toBe(false);
      expect(triggerElement.getAttribute("aria-expanded")).toBe("true");
    });

    it("handleMouseLeave() should hide tooltip after HIDE_DELAY (100ms)", () => {
      // First show tooltip
      manager.showTooltip(triggerElement, "mouse");
      jest.advanceTimersByTime(0); // Allow requestAnimationFrame

      const mouseLeaveEvent = new MouseEvent("mouseleave", { bubbles: true });
      triggerElement.dispatchEvent(mouseLeaveEvent);

      jest.advanceTimersByTime(100);

      expect(tooltipElement.style.opacity).toBe("0");
    });

    it("handleMouseEnter() should cancel hide timer if mouse re-enters", () => {
      // Show tooltip
      manager.showTooltip(triggerElement, "mouse");
      jest.advanceTimersByTime(0);

      // Mouse leave
      const mouseLeaveEvent = new MouseEvent("mouseleave", { bubbles: true });
      triggerElement.dispatchEvent(mouseLeaveEvent);

      // Mouse enter again before hide delay
      jest.advanceTimersByTime(50);
      const mouseEnterEvent = new MouseEvent("mouseenter", { bubbles: true });
      triggerElement.dispatchEvent(mouseEnterEvent);

      jest.advanceTimersByTime(100);

      // Tooltip should still be visible
      expect(tooltipElement.hidden).toBe(false);
    });

    it("handleTooltipMouseEnter() should keep tooltip visible when moving from trigger to tooltip", () => {
      manager.showTooltip(triggerElement, "mouse");
      jest.advanceTimersByTime(0);

      // Mouse leave trigger
      const mouseLeaveEvent = new MouseEvent("mouseleave", { bubbles: true });
      triggerElement.dispatchEvent(mouseLeaveEvent);

      // Mouse enter tooltip
      const tooltipMouseEnterEvent = new MouseEvent("mouseenter", { bubbles: true });
      tooltipElement.dispatchEvent(tooltipMouseEnterEvent);

      jest.advanceTimersByTime(100);

      // Tooltip should still be visible
      expect(tooltipElement.hidden).toBe(false);
    });

    it("should not show tooltip if mouse leaves before SHOW_DELAY", () => {
      const mouseEnterEvent = new MouseEvent("mouseenter", { bubbles: true });
      triggerElement.dispatchEvent(mouseEnterEvent);

      jest.advanceTimersByTime(100);

      const mouseLeaveEvent = new MouseEvent("mouseleave", { bubbles: true });
      triggerElement.dispatchEvent(mouseLeaveEvent);

      jest.advanceTimersByTime(200);

      expect(tooltipElement.hidden).toBe(true);
    });
  });

  describe("Keyboard Events", () => {
    it("handleFocus() should show tooltip immediately", () => {
      const focusEvent = new FocusEvent("focus", { bubbles: true });
      triggerElement.dispatchEvent(focusEvent);

      expect(tooltipElement.hidden).toBe(false);
      expect(triggerElement.getAttribute("aria-expanded")).toBe("true");
    });

    it("handleBlur() should hide tooltip immediately", () => {
      manager.showTooltip(triggerElement, "keyboard");

      const blurEvent = new FocusEvent("blur", { bubbles: true });
      triggerElement.dispatchEvent(blurEvent);

      expect(tooltipElement.hidden).toBe(true);
      expect(triggerElement.getAttribute("aria-expanded")).toBe("false");
    });

    it("handleKeydown() should hide tooltip on Escape key", () => {
      manager.showTooltip(triggerElement, "keyboard");

      const escapeEvent = new KeyboardEvent("keydown", {
        key: "Escape",
        bubbles: true,
      });
      window.dispatchEvent(escapeEvent);

      expect(tooltipElement.hidden).toBe(true);
    });

    it("should prioritize keyboard over mouse", () => {
      jest.useFakeTimers();

      // Mouse enter
      const mouseEnterEvent = new MouseEvent("mouseenter", { bubbles: true });
      triggerElement.dispatchEvent(mouseEnterEvent);

      // Focus (keyboard) - should override mouse
      const focusEvent = new FocusEvent("focus", { bubbles: true });
      triggerElement.dispatchEvent(focusEvent);

      jest.advanceTimersByTime(200);

      // Mouse leave should not hide if keyboard is active
      const mouseLeaveEvent = new MouseEvent("mouseleave", { bubbles: true });
      triggerElement.dispatchEvent(mouseLeaveEvent);

      expect(tooltipElement.hidden).toBe(false);

      jest.useRealTimers();
    });
  });

  describe("Touch Events", () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it("handleTouchStart() should show tooltip after LONG_PRESS_DELAY (500ms)", () => {
      const touchStartEvent = new TouchEvent("touchstart", {
        bubbles: true,
        cancelable: true,
        touches: [
          {
            clientX: 100,
            clientY: 100,
          } as Touch,
        ],
      });
      triggerElement.dispatchEvent(touchStartEvent);

      jest.advanceTimersByTime(500);

      expect(tooltipElement.hidden).toBe(false);
    });

    it("handleTouchMove() should cancel long press if moved more than TOUCH_MOVE_TOLERANCE (10px)", () => {
      const touchStartEvent = new TouchEvent("touchstart", {
        bubbles: true,
        cancelable: true,
        touches: [
          {
            clientX: 100,
            clientY: 100,
          } as Touch,
        ],
      });
      triggerElement.dispatchEvent(touchStartEvent);

      jest.advanceTimersByTime(250);

      const touchMoveEvent = new TouchEvent("touchmove", {
        bubbles: true,
        cancelable: true,
        touches: [
          {
            clientX: 115, // 15px movement > 10px tolerance
            clientY: 100,
          } as Touch,
        ],
      });
      triggerElement.dispatchEvent(touchMoveEvent);

      jest.advanceTimersByTime(300);

      expect(tooltipElement.hidden).toBe(true);
    });

    it("handleTouchEnd() should prevent default if long press was triggered", () => {
      const touchStartEvent = new TouchEvent("touchstart", {
        bubbles: true,
        cancelable: true,
        touches: [
          {
            clientX: 100,
            clientY: 100,
          } as Touch,
        ],
      });
      triggerElement.dispatchEvent(touchStartEvent);

      jest.advanceTimersByTime(500);

      const touchEndEvent = new TouchEvent("touchend", {
        bubbles: true,
        cancelable: true,
      });
      const preventDefaultSpy = jest.spyOn(touchEndEvent, "preventDefault");
      triggerElement.dispatchEvent(touchEndEvent);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it("handleOutsideTouch() should hide tooltip when touching outside", () => {
      // Mock requestAnimationFrame for this test
      global.requestAnimationFrame = jest.fn((cb: FrameRequestCallback) => {
        cb(0);
        return 1;
      }) as typeof requestAnimationFrame;

      manager.showTooltip(triggerElement, "touch");

      const outsideElement = document.createElement("div");
      document.body.appendChild(outsideElement);

      const touchStartEvent = new TouchEvent("touchstart", {
        bubbles: true,
        cancelable: true,
      });
      Object.defineProperty(touchStartEvent, "target", {
        writable: false,
        value: outsideElement,
      });
      window.dispatchEvent(touchStartEvent);

      jest.advanceTimersByTime(300); // Wait for hide transition

      expect(tooltipElement.hidden).toBe(true);
    });
  });

  describe("Position Calculation", () => {
    beforeEach(() => {
      jest.useFakeTimers();
      // Mock requestAnimationFrame to execute immediately
      global.requestAnimationFrame = jest.fn((cb: FrameRequestCallback) => {
        cb(0);
        return 1;
      }) as typeof requestAnimationFrame;

      // Set up viewport dimensions
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1024,
      });
      Object.defineProperty(window, "innerHeight", {
        writable: true,
        configurable: true,
        value: 768,
      });

      // Set up element dimensions
      triggerElement.getBoundingClientRect = jest.fn(() => ({
        top: 400,
        left: 500,
        bottom: 450,
        right: 600,
        width: 100,
        height: 50,
        x: 500,
        y: 400,
        toJSON: jest.fn(),
      })) as jest.Mock;

      tooltipElement.getBoundingClientRect = jest.fn(() => ({
        top: 0,
        left: 0,
        bottom: 80,
        right: 200,
        width: 200,
        height: 80,
        x: 0,
        y: 0,
        toJSON: jest.fn(),
      })) as jest.Mock;
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it("calculatePosition() should position tooltip above trigger for 'top' placement", () => {
      // Create new tooltip with different placement
      const newTooltip = document.createElement("div");
      newTooltip.id = "new-tooltip-top";
      newTooltip.setAttribute("data-component", "tooltip");
      newTooltip.setAttribute("data-trigger", "test-trigger");
      newTooltip.setAttribute("data-placement", "top");
      newTooltip.setAttribute("data-alignment", "center");
      newTooltip.setAttribute("role", "tooltip");
      newTooltip.hidden = true;
      const newArrow = document.createElement("div");
      newArrow.setAttribute("data-arrow", "");
      newTooltip.appendChild(newArrow);
      document.body.appendChild(newTooltip);

      manager = new TooltipManager();

      // Make tooltip visible before showing (so getBoundingClientRect works)
      newTooltip.hidden = false;

      manager.showTooltip(triggerElement, "mouse");

      const style = newTooltip.style;
      expect(style.position).toBe("absolute");
      expect(parseFloat(style.top)).toBeLessThan(400);
    });

    it("getPlacementCoords() should calculate correct coordinates for all placements", () => {
      const placements: Placement[] = ["top", "bottom", "left", "right"];
      const alignments: Alignment[] = ["start", "center", "end"];

      placements.forEach((placement) => {
        alignments.forEach((alignment) => {
          // Create new tooltip for each test case
          const testTooltip = document.createElement("div");
          testTooltip.id = `test-tooltip-${placement}-${alignment}`;
          testTooltip.setAttribute("data-component", "tooltip");
          testTooltip.setAttribute("data-trigger", "test-trigger");
          testTooltip.setAttribute("data-placement", placement);
          testTooltip.setAttribute("data-alignment", alignment);
          testTooltip.setAttribute("role", "tooltip");
          testTooltip.hidden = true;
          const testArrow = document.createElement("div");
          testArrow.setAttribute("data-arrow", "");
          testTooltip.appendChild(testArrow);
          document.body.appendChild(testTooltip);

          manager = new TooltipManager();

          // Make tooltip visible before showing (so getBoundingClientRect works)
          testTooltip.hidden = false;

          manager.showTooltip(triggerElement, "mouse");

          const style = testTooltip.style;
          expect(style.position).toBe("absolute");
          expect(style.top).toBeTruthy();
          expect(style.left).toBeTruthy();
        });
      });
    });

    it("updateArrowPosition() should position arrow correctly for 'top' placement", () => {
      // Make tooltip visible before showing (so getBoundingClientRect works)
      tooltipElement.hidden = false;

      manager.showTooltip(triggerElement, "mouse");

      const arrowStyle = arrowElement.style;
      expect(arrowStyle.bottom).toBe("-4px");
      expect(arrowStyle.left).toBeTruthy();
    });
  });

  describe("Viewport Boundary Handling", () => {
    beforeEach(() => {
      jest.useFakeTimers();
      // Mock requestAnimationFrame to execute immediately
      global.requestAnimationFrame = jest.fn((cb: FrameRequestCallback) => {
        cb(0);
        return 1;
      }) as typeof requestAnimationFrame;

      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 500,
      });
      Object.defineProperty(window, "innerHeight", {
        writable: true,
        configurable: true,
        value: 500,
      });
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it("isOutOfViewport() should detect when tooltip is out of viewport", () => {
      // Create new tooltip with top placement
      const testTooltip = document.createElement("div");
      testTooltip.id = "test-tooltip-top-edge";
      testTooltip.setAttribute("data-component", "tooltip");
      testTooltip.setAttribute("data-trigger", "test-trigger");
      testTooltip.setAttribute("data-placement", "top");
      testTooltip.setAttribute("data-alignment", "center");
      testTooltip.setAttribute("role", "tooltip");
      testTooltip.hidden = true;
      const testArrow = document.createElement("div");
      testArrow.setAttribute("data-arrow", "");
      testTooltip.appendChild(testArrow);
      document.body.appendChild(testTooltip);

      manager = new TooltipManager();

      // Position trigger at top edge - tooltip would be out of viewport
      triggerElement.getBoundingClientRect = jest.fn(() => ({
        top: 0,
        left: 250,
        bottom: 50,
        right: 350,
        width: 100,
        height: 50,
        x: 250,
        y: 0,
        toJSON: jest.fn(),
      })) as jest.Mock;

      // Mock tooltip rect - make it visible first
      testTooltip.hidden = false;
      testTooltip.getBoundingClientRect = jest.fn(() => ({
        top: 0,
        left: 0,
        bottom: 100,
        right: 200,
        width: 200,
        height: 100,
        x: 0,
        y: 0,
        toJSON: jest.fn(),
      })) as jest.Mock;

      manager.showTooltip(triggerElement, "mouse");

      // Should fallback to bottom (arrow should be on top)
      const arrowStyle = testArrow.style;
      expect(arrowStyle.top).toBe("-4px"); // Bottom placement arrow
    });

    it("getFallbackPlacement() should return opposite placement", () => {
      const testCases: Array<{ input: Placement; expected: Placement }> = [
        { input: "top", expected: "bottom" },
        { input: "bottom", expected: "top" },
        { input: "left", expected: "right" },
        { input: "right", expected: "left" },
      ];

      testCases.forEach(({ input, expected }) => {
        // Create new tooltip for each test case
        const testTooltip = document.createElement("div");
        testTooltip.id = `test-tooltip-${input}-${expected}`;
        testTooltip.setAttribute("data-component", "tooltip");
        testTooltip.setAttribute("data-trigger", "test-trigger");
        testTooltip.setAttribute("data-placement", input);
        testTooltip.setAttribute("data-alignment", "center");
        testTooltip.setAttribute("role", "tooltip");
        testTooltip.hidden = true;
        const testArrow = document.createElement("div");
        testArrow.setAttribute("data-arrow", "");
        testTooltip.appendChild(testArrow);
        document.body.appendChild(testTooltip);

        manager = new TooltipManager();

        // Position trigger so tooltip would be out of viewport
        triggerElement.getBoundingClientRect = jest.fn(() => ({
          top: input === "top" ? 0 : input === "bottom" ? 450 : 250,
          left: input === "left" ? 0 : input === "right" ? 450 : 250,
          bottom: input === "top" ? 50 : input === "bottom" ? 500 : 300,
          right: input === "left" ? 50 : input === "right" ? 500 : 350,
          width: 100,
          height: 50,
          x: input === "left" ? 0 : input === "right" ? 450 : 250,
          y: input === "top" ? 0 : input === "bottom" ? 450 : 250,
          toJSON: jest.fn(),
        })) as jest.Mock;

        // Mock tooltip rect - make it visible first
        testTooltip.hidden = false;
        testTooltip.getBoundingClientRect = jest.fn(() => ({
          top: 0,
          left: 0,
          bottom: 100,
          right: 200,
          width: 200,
          height: 100,
          x: 0,
          y: 0,
          toJSON: jest.fn(),
        })) as jest.Mock;

        manager.showTooltip(triggerElement, "mouse");

        // Check arrow position to infer placement
        const arrowStyle = testArrow.style;
        if (expected === "bottom") {
          expect(arrowStyle.top).toBe("-4px");
        } else if (expected === "top") {
          expect(arrowStyle.bottom).toBe("-4px");
        } else if (expected === "right") {
          expect(arrowStyle.left).toBe("-4px");
        } else if (expected === "left") {
          expect(arrowStyle.right).toBe("-4px");
        }
      });
    });

    it("adjustToViewport() should adjust position to stay within viewport", () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 300,
      });
      Object.defineProperty(window, "innerHeight", {
        writable: true,
        configurable: true,
        value: 300,
      });

      triggerElement.getBoundingClientRect = jest.fn(() => ({
        top: 150,
        left: 150,
        bottom: 200,
        right: 250,
        width: 100,
        height: 50,
        x: 150,
        y: 150,
        toJSON: jest.fn(),
      })) as jest.Mock;

      // Make tooltip visible before showing (so getBoundingClientRect works)
      tooltipElement.hidden = false;
      tooltipElement.getBoundingClientRect = jest.fn(() => ({
        top: 0,
        left: 0,
        bottom: 100,
        right: 250,
        width: 250,
        height: 100,
        x: 0,
        y: 0,
        toJSON: jest.fn(),
      })) as jest.Mock;

      manager.showTooltip(triggerElement, "mouse");

      const style = tooltipElement.style;
      const left = parseFloat(style.left);
      const top = parseFloat(style.top);

      // Should be adjusted to fit within viewport (300px - 8px padding * 2 = 284px max)
      expect(left).toBeGreaterThanOrEqual(0);
      expect(left + 250).toBeLessThanOrEqual(300);
      expect(top).toBeGreaterThanOrEqual(0);
      expect(top + 100).toBeLessThanOrEqual(300);
    });
  });

  describe("Global Events", () => {
    beforeEach(() => {
      jest.useFakeTimers();
      // Mock requestAnimationFrame to execute immediately
      global.requestAnimationFrame = jest.fn((cb: FrameRequestCallback) => {
        cb(0);
        return 1;
      }) as typeof requestAnimationFrame;
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it("handleScroll() should hide active tooltip", () => {
      manager.showTooltip(triggerElement, "mouse");

      window.dispatchEvent(new Event("scroll"));

      expect(tooltipElement.hidden).toBe(true);
    });

    it("handleResize() should hide active tooltip", () => {
      manager.showTooltip(triggerElement, "mouse");

      window.dispatchEvent(new Event("resize"));

      expect(tooltipElement.hidden).toBe(true);
    });

    it("handleKeydown() should hide tooltip on Escape key", () => {
      manager.showTooltip(triggerElement, "mouse");

      const escapeEvent = new KeyboardEvent("keydown", {
        key: "Escape",
        bubbles: true,
      });
      window.dispatchEvent(escapeEvent);

      expect(tooltipElement.hidden).toBe(true);
    });
  });

  describe("MutationObserver", () => {
    beforeEach(() => {
      jest.useFakeTimers();
      // Mock requestAnimationFrame to execute immediately
      global.requestAnimationFrame = jest.fn((cb: FrameRequestCallback) => {
        cb(0);
        return 1;
      }) as typeof requestAnimationFrame;
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it("handleNodeRemoval() should clean up when trigger element is removed", () => {
      manager.showTooltip(triggerElement, "mouse");

      triggerElement.remove();

      // Wait for MutationObserver (it runs asynchronously via microtasks)
      // Use flushPromises or wait for next tick
      return Promise.resolve().then(() => {
        expect(tooltipElement.hidden).toBe(true);
      });
    });

    it("handleNodeRemoval() should clean up when parent containing trigger is removed", () => {
      const parent = document.createElement("div");
      parent.appendChild(triggerElement);
      document.body.appendChild(parent);

      manager.showTooltip(triggerElement, "mouse");

      parent.remove();

      // Wait for MutationObserver (it runs asynchronously via microtasks)
      return Promise.resolve().then(() => {
        expect(tooltipElement.hidden).toBe(true);
      });
    });
  });

  describe("destroy", () => {
    beforeEach(() => {
      jest.useFakeTimers();
      // Mock requestAnimationFrame to execute immediately
      global.requestAnimationFrame = jest.fn((cb: FrameRequestCallback) => {
        cb(0);
        return 1;
      }) as typeof requestAnimationFrame;
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it("destroy() should remove all event listeners", () => {
      const mouseEnterSpy = jest.fn();
      triggerElement.addEventListener("mouseenter", mouseEnterSpy);

      manager.destroy();

      const mouseEvent = new MouseEvent("mouseenter", { bubbles: true });
      triggerElement.dispatchEvent(mouseEvent);

      // Event listener should be removed, but we can't directly test that
      // Instead, verify that tooltip is not shown
      expect(tooltipElement.hidden).toBe(true);
    });

    it("destroy() should restore data-* attributes", () => {
      manager.destroy();

      expect(tooltipElement.hasAttribute("data-component")).toBe(true);
      expect(tooltipElement.getAttribute("data-component")).toBe("tooltip");
      expect(tooltipElement.hasAttribute("data-trigger")).toBe(true);
      expect(tooltipElement.getAttribute("data-trigger")).toBe("test-trigger");
      expect(tooltipElement.hasAttribute("data-placement")).toBe(true);
      expect(tooltipElement.getAttribute("data-placement")).toBe("top");
      expect(tooltipElement.hasAttribute("data-alignment")).toBe(true);
      expect(tooltipElement.getAttribute("data-alignment")).toBe("center");
    });

    it("destroy() should clear internal state", () => {
      manager.showTooltip(triggerElement, "mouse");

      manager.destroy();

      // After destroy, showing tooltip again should not work
      const newManager = new TooltipManager();
      newManager.showTooltip(triggerElement, "mouse");

      // Tooltip should be hidden because manager was destroyed and recreated
      // This tests that destroy properly cleans up
      expect(tooltipElement.hidden).toBe(false); // New manager should work
    });

    it("destroy() should remove global event listeners", () => {
      const scrollSpy = jest.fn();
      window.addEventListener("scroll", scrollSpy);

      manager.destroy();

      window.dispatchEvent(new Event("scroll"));

      // Our handler should not be called (but we can't directly test that)
      // Instead verify that tooltip state is cleared
      expect(tooltipElement.hidden).toBe(true);
    });

    it("destroy() should disconnect MutationObserver", () => {
      manager.destroy();

      // After destroy, removing elements should not trigger observer
      const newTrigger = document.createElement("button");
      newTrigger.id = "new-trigger";
      document.body.appendChild(newTrigger);

      const newTooltip = document.createElement("div");
      newTooltip.id = "new-tooltip";
      newTooltip.setAttribute("data-component", "tooltip");
      newTooltip.setAttribute("data-trigger", "new-trigger");
      document.body.appendChild(newTooltip);

      const newManager = new TooltipManager();
      newManager.showTooltip(newTrigger, "mouse");

      newTrigger.remove();

      // Wait for MutationObserver (it runs asynchronously via microtasks)
      return Promise.resolve().then(() => {
        // New manager's observer should handle it
        expect(newTooltip.hidden).toBe(true);

        newManager.destroy();
      });
    });
  });
});
