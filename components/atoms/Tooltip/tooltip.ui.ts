import {
  TooltipInternalConfig,
  Placement,
  Alignment,
  TooltipEventHandlers,
} from "./type";

// Constants for timing and positioning
export const SHOW_DELAY = 200;
export const HIDE_DELAY = 200;
export const TRANSITION_DURATION = 200;
const LONG_PRESS_DELAY = 500;
const TOUCH_MOVE_TOLERANCE = 10;
const TOOLTIP_OFFSET = 12;
const VIEWPORT_PADDING = 8;

// Constants for arrow positioning
const ARROW_DEFAULT_SIZE = 8;
const ARROW_BORDER_RADIUS = 4;
const ARROW_OFFSET = "-4px";

export class TooltipManager {
  // Private properties - State management
  private tooltips: Map<string, TooltipInternalConfig> = new Map();
  private activeTooltip: TooltipInternalConfig | null = null;
  private activeTriggerMethod: "mouse" | "keyboard" | "touch" | null = null;
  private observer: MutationObserver | null = null;

  // Timers
  private showTimer: number | undefined;
  private hideTimer: number | undefined;
  private longPressTimer: number | undefined;

  // Touch state
  private touchStartX: number = 0;
  private touchStartY: number = 0;
  private isLongPressTriggered: boolean = false;

  private handleScroll = (): void => {
    this.hideActiveTooltipIfExists();
  };

  private handleResize = (): void => {
    this.hideActiveTooltipIfExists();
  };

  private handleKeydown = (e: KeyboardEvent): void => {
    if (e.key === "Escape") {
      if (this.activeTooltip && this.activeTooltip.triggerElement) {
        this.hideTooltip(this.activeTooltip.triggerElement, true);
      }
    }
  };

  private handleOutsideTouch = (event: TouchEvent): void => {
    if (!this.activeTooltip || !this.activeTooltip.triggerElement) return;

    const target = event.target as HTMLElement;
    const tooltip = document.getElementById(this.activeTooltip.tooltipId || "");

    // If touch is NOT inside trigger AND NOT inside tooltip
    if (
      !this.activeTooltip.triggerElement.contains(target) &&
      (!tooltip || !tooltip.contains(target))
    ) {
      this.hideTooltip(this.activeTooltip.triggerElement);
    }
  };

  // Constructor
  public constructor() {
    if (typeof window !== "undefined") {
      this.addGlobalListeners();
    }

    this.init();

    return this;
  }

  // Private methods - Initialization & Setup
  private init() {
    if (typeof document === "undefined") return;

    const tooltipElements = document.querySelectorAll('[data-component="tooltip"]');

    tooltipElements.forEach((element) => {
      const tooltipEl = element as HTMLElement;
      // Skip if already managed
      if (this.isTooltipManaged(tooltipEl)) return;

      const config = this.createTooltipConfig(tooltipEl);
      if (config) {
        this.registerTooltip(config);
      }
    });

    this.initMutationObserver();
  }

  private isTooltipManaged(element: HTMLElement): boolean {
    for (const config of this.tooltips.values()) {
      if (config.tooltipId && document.getElementById(config.tooltipId) === element) {
        return true;
      }
    }
    return false;
  }

  private createTooltipConfig(element: HTMLElement): TooltipInternalConfig | null {
    const triggerId = element.getAttribute("data-trigger");
    const placement = (element.getAttribute("data-placement") as Placement) || "top";
    const alignment = (element.getAttribute("data-alignment") as Alignment) || "center";
    const tooltipId = element.id;

    if (!triggerId) {
      console.error(
        "TooltipManager: Missing data-trigger attribute on tooltip element",
        element,
      );
      return null;
    }

    const triggerElement = document.getElementById(triggerId);
    if (!triggerElement) {
      console.error(`TooltipManager: Trigger element with ID "${triggerId}" not found.`);
      return null;
    }

    const arrowElement = element.querySelector("[data-arrow]") as HTMLElement;

    if (!triggerElement.hasAttribute("aria-describedby")) {
      triggerElement.setAttribute("aria-describedby", tooltipId);
    }

    element.style.transition = `opacity ${TRANSITION_DURATION}ms ease-in-out`;

    const config: TooltipInternalConfig = {
      triggerId,
      placement,
      alignment,
      tooltipId,
      arrowElement,
      triggerElement,
      originalAttributes: {
        component: "tooltip",
        trigger: triggerId,
        placement,
        alignment,
      },
    };

    // Clean up data attributes
    element.removeAttribute("data-component");
    element.removeAttribute("data-trigger");
    element.removeAttribute("data-placement");
    element.removeAttribute("data-alignment");

    return config;
  }

  private registerTooltip(config: TooltipInternalConfig): void {
    this.tooltips.set(config.triggerId, config);
    this.bindEvents(config);
  }

  private bindEvents(config: TooltipInternalConfig): void {
    if (!config.triggerElement) return;

    const handlers = this.createEventHandlers(config);
    config.handlers = handlers;

    this.addEventListeners(config);
  }

  private createEventHandlers(config: TooltipInternalConfig): TooltipEventHandlers {
    return {
      mouseenter: (event: MouseEvent) => this.handleMouseEnter(event, config),
      mouseleave: (event: MouseEvent) => this.handleMouseLeave(event, config),
      focus: (event: FocusEvent) => this.handleFocus(event, config),
      blur: (event: FocusEvent) => this.handleBlur(event, config),
      touchstart: (event: TouchEvent) => this.handleTouchStart(event, config),
      touchmove: (event: TouchEvent) => this.handleTouchMove(event, config),
      touchend: (event: TouchEvent) => this.handleTouchEnd(event, config),
      tooltipMouseEnter: () => this.handleTooltipMouseEnter(config),
      tooltipMouseLeave: () => this.handleTooltipMouseLeave(config),
    };
  }

  private addEventListeners(config: TooltipInternalConfig): void {
    if (!config.triggerElement || !config.handlers) return;

    const trigger = config.triggerElement;
    const tooltip = document.getElementById(config.tooltipId || "");
    const handlers = config.handlers;

    trigger.addEventListener("mouseenter", handlers.mouseenter);
    trigger.addEventListener("mouseleave", handlers.mouseleave);
    trigger.addEventListener("focus", handlers.focus);
    trigger.addEventListener("blur", handlers.blur);

    if (handlers.touchstart) {
      trigger.addEventListener("touchstart", handlers.touchstart, { passive: true });
    }
    if (handlers.touchmove) {
      trigger.addEventListener("touchmove", handlers.touchmove, { passive: true });
    }
    if (handlers.touchend) {
      trigger.addEventListener("touchend", handlers.touchend);
    }

    if (tooltip) {
      if (handlers.tooltipMouseEnter) {
        tooltip.addEventListener("mouseenter", handlers.tooltipMouseEnter);
      }
      if (handlers.tooltipMouseLeave) {
        tooltip.addEventListener("mouseleave", handlers.tooltipMouseLeave);
      }
    }
  }

  private removeEventListeners(config: TooltipInternalConfig): void {
    if (!config.triggerElement || !config.handlers) return;

    const trigger = config.triggerElement;
    const handlers = config.handlers;

    trigger.removeEventListener("mouseenter", handlers.mouseenter);
    trigger.removeEventListener("mouseleave", handlers.mouseleave);
    trigger.removeEventListener("focus", handlers.focus);
    trigger.removeEventListener("blur", handlers.blur);

    if (handlers.touchstart) {
      trigger.removeEventListener("touchstart", handlers.touchstart);
    }
    if (handlers.touchmove) {
      trigger.removeEventListener("touchmove", handlers.touchmove);
    }
    if (handlers.touchend) {
      trigger.removeEventListener("touchend", handlers.touchend);
    }

    const tooltip = document.getElementById(config.tooltipId || "");
    if (tooltip) {
      if (handlers.tooltipMouseEnter) {
        tooltip.removeEventListener("mouseenter", handlers.tooltipMouseEnter);
      }
      if (handlers.tooltipMouseLeave) {
        tooltip.removeEventListener("mouseleave", handlers.tooltipMouseLeave);
      }
    }
  }

  private addGlobalListeners(): void {
    window.addEventListener("scroll", this.handleScroll, { passive: true });
    window.addEventListener("resize", this.handleResize, { passive: true });
    window.addEventListener("keydown", this.handleKeydown);
  }

  private initMutationObserver(): void {
    if (this.observer) return;

    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          mutation.removedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              this.handleNodeRemoval(node);
            }
          });
        }
      });
    });

    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  private handleNodeRemoval(removedNode: HTMLElement): void {
    if (this.activeTooltip && this.activeTooltip.triggerElement) {
      if (
        removedNode === this.activeTooltip.triggerElement ||
        removedNode.contains(this.activeTooltip.triggerElement)
      ) {
        const triggerId = this.activeTooltip.triggerId;
        this.hideTooltip(this.activeTooltip.triggerElement, true);
        this.tooltips.delete(triggerId);
        this.activeTooltip = null;
      }
    }

    this.tooltips.forEach((config, key) => {
      if (
        config.triggerElement &&
        (removedNode === config.triggerElement ||
          removedNode.contains(config.triggerElement))
      ) {
        this.tooltips.delete(key);
      }
    });
  }

  private hideActiveTooltipIfExists(): void {
    if (this.activeTooltip?.triggerElement) {
      this.hideTooltip(this.activeTooltip.triggerElement, true);
    }
  }

  // Private methods - Event Handlers
  private handleMouseEnter(_: MouseEvent, config: TooltipInternalConfig): void {
    if (this.activeTriggerMethod === "keyboard") return;
    if (this.activeTriggerMethod === "touch") return; // Touch priority

    this.clearTimer(this.hideTimer);
    this.hideTimer = undefined;

    if (this.activeTooltip === config) return;

    this.showTimer = window.setTimeout(() => {
      if (config.triggerElement) {
        this.showTooltip(config.triggerElement, "mouse");
      }
    }, SHOW_DELAY);
  }

  private handleMouseLeave(_: MouseEvent, config: TooltipInternalConfig): void {
    if (this.activeTriggerMethod === "keyboard") return;
    if (this.activeTriggerMethod === "touch") return;

    this.clearTimer(this.showTimer);
    this.showTimer = undefined;

    if (this.activeTooltip === config) {
      this.hideTimer = window.setTimeout(() => {
        if (config.triggerElement) {
          this.hideTooltip(config.triggerElement);
        }
      }, HIDE_DELAY);
    }
  }

  private handleFocus(_: FocusEvent, config: TooltipInternalConfig): void {
    this.clearTimers();
    if (config.triggerElement) {
      this.showTooltip(config.triggerElement, "keyboard");
    }
  }

  private handleBlur(_: FocusEvent, config: TooltipInternalConfig): void {
    if (this.activeTooltip === config && this.activeTriggerMethod === "keyboard") {
      if (config.triggerElement) {
        this.hideTooltip(config.triggerElement, true);
      }
    }
  }

  private handleTouchStart(event: TouchEvent, config: TooltipInternalConfig): void {
    // Start long press timer
    this.clearTimers(); // Clear any mouse timers
    this.activeTriggerMethod = "touch";
    this.touchStartX = event.touches[0]?.clientX || 0;
    this.touchStartY = event.touches[0]?.clientY || 0;
    this.isLongPressTriggered = false;

    this.longPressTimer = window.setTimeout(() => {
      if (config.triggerElement) {
        this.isLongPressTriggered = true;
        this.showTooltip(config.triggerElement, "touch");
      }
    }, LONG_PRESS_DELAY);
  }

  private handleTouchMove(event: TouchEvent, _: TooltipInternalConfig): void {
    if (!this.longPressTimer) return;

    const x = event.touches[0]?.clientX || 0;
    const y = event.touches[0]?.clientY || 0;
    const diff = Math.sqrt(
      Math.pow(x - this.touchStartX, 2) + Math.pow(y - this.touchStartY, 2),
    );

    if (diff > TOUCH_MOVE_TOLERANCE) {
      this.clearTimer(this.longPressTimer);
      this.longPressTimer = undefined;
      this.activeTriggerMethod = null; // Reset if cancelled
    }
  }

  private handleTouchEnd(event: TouchEvent, config: TooltipInternalConfig): void {
    this.clearTimer(this.longPressTimer);
    this.longPressTimer = undefined;

    if (this.isLongPressTriggered) {
      // Prevent default click if long press showed tooltip
      if (event.cancelable) event.preventDefault();
      this.isLongPressTriggered = false;
    } else {
      // Short tap, reset method if we didn't show
      if (this.activeTriggerMethod === "touch" && this.activeTooltip !== config) {
        this.activeTriggerMethod = null;
      }
    }
  }

  private handleTooltipMouseEnter(_: TooltipInternalConfig): void {
    if (this.activeTriggerMethod === "keyboard") return;
    if (this.activeTriggerMethod === "touch") return;

    this.clearTimer(this.hideTimer);
    this.hideTimer = undefined;
  }

  private handleTooltipMouseLeave(config: TooltipInternalConfig): void {
    if (this.activeTriggerMethod === "keyboard") return;
    if (this.activeTriggerMethod === "touch") return;

    if (this.activeTooltip === config) {
      this.hideTimer = window.setTimeout(() => {
        if (config.triggerElement) {
          this.hideTooltip(config.triggerElement);
        }
      }, HIDE_DELAY);
    }
  }

  // Private methods - Utilities
  private clearTimer(timer: number | undefined): void {
    if (timer) window.clearTimeout(timer);
  }

  private clearTimers(): void {
    this.clearTimer(this.showTimer);
    this.clearTimer(this.hideTimer);
    this.clearTimer(this.longPressTimer);
    this.showTimer = undefined;
    this.hideTimer = undefined;
    this.longPressTimer = undefined;
  }

  // Private methods - Positioning
  private calculatePosition(
    trigger: HTMLElement,
    tooltip: HTMLElement,
    placement: Placement,
    alignment: Alignment,
  ): void {
    const triggerRect = trigger.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const { coords, finalPlacement } = this.calculateOptimalCoords(
      placement,
      alignment,
      triggerRect,
      tooltipRect,
      viewportWidth,
      viewportHeight,
    );

    this.applyTooltipStyles(
      tooltip,
      coords,
      triggerRect,
      tooltipRect,
      finalPlacement,
      alignment,
    );
  }

  private calculateOptimalCoords(
    placement: Placement,
    alignment: Alignment,
    triggerRect: DOMRect,
    tooltipRect: DOMRect,
    viewportWidth: number,
    viewportHeight: number,
  ): { coords: { top: number; left: number }; finalPlacement: Placement } {
    let coords = this.getPlacementCoords(placement, alignment, triggerRect, tooltipRect);
    let finalPlacement = placement;

    if (this.isOutOfViewport(coords, tooltipRect, viewportWidth, viewportHeight)) {
      const fallbackPlacement = this.getFallbackPlacement(placement);
      const fallbackCoords = this.getPlacementCoords(
        fallbackPlacement,
        alignment,
        triggerRect,
        tooltipRect,
      );

      if (
        !this.isOutOfViewport(fallbackCoords, tooltipRect, viewportWidth, viewportHeight)
      ) {
        coords = fallbackCoords;
        finalPlacement = fallbackPlacement;
      } else {
        coords = this.adjustToViewport(
          coords,
          tooltipRect,
          viewportWidth,
          viewportHeight,
        );
      }
    } else {
      coords = this.adjustToViewport(coords, tooltipRect, viewportWidth, viewportHeight);
    }

    return { coords, finalPlacement };
  }

  private applyTooltipStyles(
    tooltip: HTMLElement,
    coords: { top: number; left: number },
    triggerRect: DOMRect,
    tooltipRect: DOMRect,
    finalPlacement: Placement,
    alignment: Alignment,
  ): void {
    tooltip.style.position = "absolute";

    const offsetParent = (tooltip.offsetParent as HTMLElement) || document.body;
    const parentRect = offsetParent.getBoundingClientRect();
    const parentScrollTop = offsetParent.scrollTop || 0;
    const parentScrollLeft = offsetParent.scrollLeft || 0;

    const relativeTop =
      coords.top - parentRect.top - (offsetParent.clientTop || 0) + parentScrollTop;
    const relativeLeft =
      coords.left - parentRect.left - (offsetParent.clientLeft || 0) + parentScrollLeft;

    tooltip.style.top = `${relativeTop}px`;
    tooltip.style.left = `${relativeLeft}px`;

    this.updateArrowPosition(triggerRect, tooltipRect, coords, finalPlacement, alignment);
  }

  private getPlacementCoords(
    placement: Placement,
    alignment: Alignment,
    triggerRect: DOMRect,
    tooltipRect: DOMRect,
  ): { top: number; left: number } {
    let top = 0;
    let left = 0;

    switch (placement) {
      case "top":
        top = triggerRect.top - tooltipRect.height - TOOLTIP_OFFSET;
        break;
      case "bottom":
        top = triggerRect.bottom + TOOLTIP_OFFSET;
        break;
      case "left":
        left = triggerRect.left - tooltipRect.width - TOOLTIP_OFFSET;
        break;
      case "right":
        left = triggerRect.right + TOOLTIP_OFFSET;
        break;
    }

    if (placement === "top" || placement === "bottom") {
      switch (alignment) {
        case "start":
          left = triggerRect.left;
          break;
        case "center":
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
          break;
        case "end":
          left = triggerRect.right - tooltipRect.width;
          break;
      }
    } else {
      switch (alignment) {
        case "start":
          top = triggerRect.top;
          break;
        case "center":
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
          break;
        case "end":
          top = triggerRect.bottom - tooltipRect.height;
          break;
      }
    }

    return { top, left };
  }

  private isOutOfViewport(
    coords: { top: number; left: number },
    tooltipRect: DOMRect,
    viewportWidth: number,
    viewportHeight: number,
  ): boolean {
    return (
      coords.top < VIEWPORT_PADDING ||
      coords.left < VIEWPORT_PADDING ||
      coords.top + tooltipRect.height > viewportHeight - VIEWPORT_PADDING ||
      coords.left + tooltipRect.width > viewportWidth - VIEWPORT_PADDING
    );
  }

  private getFallbackPlacement(placement: Placement): Placement {
    switch (placement) {
      case "top":
        return "bottom";
      case "bottom":
        return "top";
      case "left":
        return "right";
      case "right":
        return "left";
      default:
        // Exhaustive check for type safety
        return "top";
    }
  }

  private adjustToViewport(
    coords: { top: number; left: number },
    tooltipRect: DOMRect,
    viewportWidth: number,
    viewportHeight: number,
  ): { top: number; left: number } {
    let { top, left } = coords;

    if (top < VIEWPORT_PADDING) top = VIEWPORT_PADDING;
    if (left < VIEWPORT_PADDING) left = VIEWPORT_PADDING;
    if (top + tooltipRect.height > viewportHeight - VIEWPORT_PADDING) {
      top = viewportHeight - VIEWPORT_PADDING - tooltipRect.height;
    }
    if (left + tooltipRect.width > viewportWidth - VIEWPORT_PADDING) {
      left = viewportWidth - VIEWPORT_PADDING - tooltipRect.width;
    }

    return { top, left };
  }

  private updateArrowPosition(
    triggerRect: DOMRect,
    tooltipRect: DOMRect,
    tooltipCoords: { top: number; left: number },
    placement: Placement,
    _alignment: Alignment,
  ): void {
    if (!this.activeTooltip || !this.activeTooltip.arrowElement) return;

    const arrow = this.activeTooltip.arrowElement;
    arrow.style.top = "";
    arrow.style.left = "";
    arrow.style.bottom = "";
    arrow.style.right = "";
    arrow.style.transform = "";
    arrow.style.borderTopColor = "";
    arrow.style.borderLeftColor = "";
    arrow.style.borderRightColor = "";
    arrow.style.borderBottomColor = "";

    const arrowSize = arrow.offsetWidth || ARROW_DEFAULT_SIZE;

    let arrowTop = 0;
    let arrowLeft = 0;

    const tooltipLeft = tooltipCoords.left;
    const tooltipTop = tooltipCoords.top;

    if (placement === "top") {
      arrow.style.bottom = ARROW_OFFSET;
      arrow.style.borderTopColor = "transparent";
      arrow.style.borderLeftColor = "transparent";
      const triggerCenter = triggerRect.left + triggerRect.width / 2;
      arrowLeft = triggerCenter - tooltipLeft - arrowSize / 2;
    } else if (placement === "bottom") {
      arrow.style.top = ARROW_OFFSET;
      arrow.style.borderBottomColor = "transparent";
      arrow.style.borderRightColor = "transparent";
      const triggerCenter = triggerRect.left + triggerRect.width / 2;
      arrowLeft = triggerCenter - tooltipLeft - arrowSize / 2;
    } else if (placement === "left") {
      arrow.style.right = ARROW_OFFSET;
      arrow.style.borderBottomColor = "transparent";
      arrow.style.borderLeftColor = "transparent";
      const triggerCenter = triggerRect.top + triggerRect.height / 2;
      arrowTop = triggerCenter - tooltipTop - arrowSize / 2;
    } else if (placement === "right") {
      arrow.style.left = ARROW_OFFSET;
      arrow.style.borderTopColor = "transparent";
      arrow.style.borderRightColor = "transparent";
      const triggerCenter = triggerRect.top + triggerRect.height / 2;
      arrowTop = triggerCenter - tooltipTop - arrowSize / 2;
    }

    const borderRadius = ARROW_BORDER_RADIUS;
    const maxLeft = tooltipRect.width - arrowSize - borderRadius;
    const maxTop = tooltipRect.height - arrowSize - borderRadius;

    if (placement === "top" || placement === "bottom") {
      arrowLeft = Math.max(borderRadius, Math.min(arrowLeft, maxLeft));
      arrow.style.left = `${arrowLeft}px`;
    } else {
      arrowTop = Math.max(borderRadius, Math.min(arrowTop, maxTop));
      arrow.style.top = `${arrowTop}px`;
    }
  }

  // Public methods
  public showTooltip(
    triggerElement: HTMLElement,
    method: "mouse" | "keyboard" | "touch" = "mouse",
  ): void {
    const config = this.tooltips.get(triggerElement.id);
    if (!config) return;

    if (this.activeTooltip === config) {
      if (this.activeTriggerMethod === "keyboard" && method === "mouse") return;
      this.activeTriggerMethod = method;
      return;
    }

    if (this.activeTooltip && this.activeTooltip !== config) {
      if (this.activeTooltip.triggerElement) {
        this.hideTooltip(this.activeTooltip.triggerElement, true);
      }
    }

    this.activeTooltip = config;
    this.activeTriggerMethod = method;

    const tooltip = document.getElementById(config.tooltipId || "");
    if (!tooltip) return;

    tooltip.hidden = false;

    this.calculatePosition(triggerElement, tooltip, config.placement, config.alignment);

    requestAnimationFrame(() => {
      tooltip.style.opacity = "1";
    });

    if (method === "touch") {
      window.addEventListener("touchstart", this.handleOutsideTouch, { passive: true });
    }
  }

  public hideTooltip(triggerElement: HTMLElement, immediate: boolean = false): void {
    const config = this.tooltips.get(triggerElement.id);
    if (!config) return;

    const tooltip = document.getElementById(config.tooltipId || "");
    if (!tooltip) return;

    // Clean up touch listener
    window.removeEventListener("touchstart", this.handleOutsideTouch);

    if (immediate) {
      tooltip.hidden = true;
      tooltip.style.opacity = "0";
      if (this.activeTooltip === config) {
        this.activeTooltip = null;
        this.activeTriggerMethod = null;
      }
      return;
    }

    tooltip.style.opacity = "0";

    window.setTimeout(() => {
      if (this.activeTooltip !== config) {
        tooltip.hidden = true;
      } else {
        if (tooltip.style.opacity === "0") {
          if (this.activeTooltip === config) {
            this.activeTooltip = null;
            this.activeTriggerMethod = null;
            tooltip.hidden = true;
          }
        }
      }
    }, TRANSITION_DURATION);
  }

  public destroy(): void {
    if (typeof window === "undefined") return;

    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("keydown", this.handleKeydown);
    window.removeEventListener("touchstart", this.handleOutsideTouch);

    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    this.tooltips.forEach((config) => {
      this.removeEventListeners(config);
      const tooltip = document.getElementById(config.tooltipId || "");
      if (tooltip) {
        tooltip.setAttribute(
          "data-component",
          config.originalAttributes?.component || "tooltip",
        );
        tooltip.setAttribute(
          "data-placement",
          config.originalAttributes?.placement || "top",
        );
        tooltip.setAttribute(
          "data-alignment",
          config.originalAttributes?.alignment || "center",
        );
        tooltip.setAttribute("data-trigger", config.originalAttributes?.trigger || "");
      }
    });
    this.tooltips.clear();
    this.activeTooltip = null;
    this.clearTimers();
  }
}

if (typeof window !== "undefined") {
  window.TooltipManager = TooltipManager;
  window.tooltip = new TooltipManager();
}
