import type { Placement, Alignment, TooltipConfig, TooltipPosition } from "./type";

/**
 * Class responsible for managing tooltips in the application
 * @class TooltipManager
 */
export class TooltipManager {
  /** Map to store tooltip elements and their configurations */
  private tooltips: Map<
    HTMLElement,
    TooltipConfig & { arrowElement: HTMLElement | null }
  > = new Map();

  /** Currently active tooltip element */
  private activeTooltip: HTMLElement | null = null;

  // Layout Constants
  /** Offset distance between tooltip and trigger element */
  private readonly TOOLTIP_OFFSET = 16;
  /** Minimum margin from viewport edges */
  private readonly VIEWPORT_MARGIN = 20;
  /** Size of the arrow element */
  private readonly ARROW_SIZE = 10;
  /** Width of the arrow border */
  private readonly ARROW_BORDER_WIDTH = 2;

  // Animation Constants
  /** Duration of the tooltip transition animation */
  private readonly TRANSITION_DURATION = 200;
  /** Initial opacity value for hidden tooltips */
  private readonly HIDDEN_OPACITY = "0";
  /** Final opacity value for visible tooltips */
  private readonly VISIBLE_OPACITY = "1";

  // Style Constants
  /** Z-index value for the arrow element */
  private readonly ARROW_Z_INDEX = "1";
  /** Arrow position offset value */
  private readonly ARROW_POSITION_OFFSET = 4;

  /**
   * Initializes the TooltipManager and sets up global event listeners
   */
  constructor() {
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
    this.init();
  }

  /**
   * Initializes all tooltip elements in the document
   * Finds elements with data-component="tooltip" and sets up their configuration
   * @private
   */
  private init(): void {
    const tooltipElements = document.querySelectorAll<HTMLElement>(
      '[data-component="tooltip"]',
    );

    tooltipElements.forEach((tooltip) => {
      const tooltipElement = tooltip;

      const triggerId = tooltipElement.getAttribute("data-trigger") || "";
      const placement = (tooltipElement.getAttribute("data-placement") ||
        "top") as Placement;
      const alignment = (tooltipElement.getAttribute("data-alignment") ||
        "center") as Alignment;
      const arrowElement = tooltipElement.querySelector<HTMLElement>("[data-arrow]");

      this.tooltips.set(tooltipElement, {
        triggerId,
        placement,
        alignment,
        arrowElement,
      });

      tooltipElement.removeAttribute("data-component");
      tooltipElement.removeAttribute("data-trigger");
      tooltipElement.removeAttribute("data-placement");
      tooltipElement.removeAttribute("data-alignment");
      tooltipElement.removeAttribute("data-trigger-type");
      arrowElement?.removeAttribute("data-arrow");

      tooltipElement.setAttribute("hidden", "");
      tooltipElement.style.opacity = "0";

      this.setupTrigger(tooltipElement);
    });
  }

  /**
   * Sets up event listeners for tooltip trigger elements
   * @private
   * @param {HTMLElement} tooltipElement - The tooltip element to setup
   */
  private setupTrigger(tooltipElement: HTMLElement): void {
    const config = this.tooltips.get(tooltipElement);
    if (!config) return;

    const trigger = document.querySelector<HTMLElement>(`#${config.triggerId}`);
    if (!trigger) {
      throw new Error(`Cannot found trigger.`);
    }

    let hoverTimeout: number;

    const showTooltipHandler = () => {
      clearTimeout(hoverTimeout);
      this.showTooltip(tooltipElement, trigger);
    };

    const hideTooltipHandler = () => {
      hoverTimeout = window.setTimeout(() => {
        if (!tooltipElement.matches(":hover")) {
          this.hideTooltip(tooltipElement);
        }
      }, 700);
    };

    // 트리거에 대한 이벤트
    trigger.addEventListener("mouseenter", showTooltipHandler);
    trigger.addEventListener("mouseleave", hideTooltipHandler);

    // 툴팁에 대한 이벤트
    tooltipElement.addEventListener("mouseenter", showTooltipHandler);
    tooltipElement.addEventListener("mouseleave", hideTooltipHandler);

    // 키보드 접근성 유지
    trigger.addEventListener("focus", () => this.showTooltip(tooltipElement, trigger));
    trigger.addEventListener("blur", () => this.hideTooltip(tooltipElement));
  }

  /**
   * Calculates the position of the tooltip relative to its trigger element
   * @private
   * @param {HTMLElement} tooltip - The tooltip element
   * @param {HTMLElement} trigger - The trigger element
   * @returns {TooltipPosition} Calculated position including top, left, and arrow positions
   */
  private calculatePosition(tooltip: HTMLElement, trigger: HTMLElement): TooltipPosition {
    const config = this.tooltips.get(tooltip);
    if (!config) {
      return { top: 0, left: 0, actualPlacement: "top" };
    }

    const isHidden = tooltip.hasAttribute("hidden");
    const originalOpacity = tooltip.style.opacity;

    if (isHidden) {
      tooltip.style.opacity = "0";
      tooltip.removeAttribute("hidden");
    }

    const tooltipRect = tooltip.getBoundingClientRect();
    const triggerRect = trigger.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (isHidden) {
      tooltip.setAttribute("hidden", "");
      tooltip.style.opacity = originalOpacity;
    }

    const tooltipWidth = tooltipRect.width;
    const tooltipHeight = tooltipRect.height;
    const triggerWidth = triggerRect.width;
    const triggerHeight = triggerRect.height;

    let placement = config.placement;
    const alignment = config.alignment;

    let top = 0;
    let left = 0;
    let arrowTop: number | undefined;
    let arrowLeft: number | undefined;

    tooltip.style.position = "absolute";

    switch (placement) {
      case "top":
        top = -tooltipHeight - this.TOOLTIP_OFFSET;

        if (alignment === "center") {
          left = (triggerWidth - tooltipWidth) / 2;
        } else if (alignment === "start") {
          left = 0;
        } else if (alignment === "end") {
          left = triggerWidth - tooltipWidth;
        }

        if (triggerRect.left + left < this.VIEWPORT_MARGIN) {
          left = this.VIEWPORT_MARGIN - triggerRect.left;
        } else if (
          triggerRect.left + left + tooltipWidth >
          viewportWidth - this.VIEWPORT_MARGIN
        ) {
          left = viewportWidth - tooltipWidth - triggerRect.left - this.VIEWPORT_MARGIN;
        }

        if (triggerRect.top + top < this.VIEWPORT_MARGIN) {
          placement = "bottom";
          top = triggerHeight + this.TOOLTIP_OFFSET;
        }

        arrowTop = tooltipHeight;
        arrowLeft = triggerRect.left + triggerWidth / 2 - (triggerRect.left + left);
        break;

      case "bottom":
        top = triggerHeight + this.TOOLTIP_OFFSET;

        if (alignment === "center") {
          left = (triggerWidth - tooltipWidth) / 2;
        } else if (alignment === "start") {
          left = 0;
        } else if (alignment === "end") {
          left = triggerWidth - tooltipWidth;
        }

        if (triggerRect.left + left < this.VIEWPORT_MARGIN) {
          left = this.VIEWPORT_MARGIN - triggerRect.left;
        } else if (
          triggerRect.left + left + tooltipWidth >
          viewportWidth - this.VIEWPORT_MARGIN
        ) {
          left = viewportWidth - tooltipWidth - triggerRect.left - this.VIEWPORT_MARGIN;
        }

        if (
          triggerRect.bottom + top + tooltipHeight >
          viewportHeight - this.VIEWPORT_MARGIN
        ) {
          placement = "top";
          top = -tooltipHeight - this.TOOLTIP_OFFSET;
          arrowTop = tooltipHeight - this.ARROW_POSITION_OFFSET;
        } else {
          arrowTop = -1 * this.ARROW_POSITION_OFFSET;
        }

        arrowLeft = triggerRect.left + triggerWidth / 2 - (triggerRect.left + left);
        break;

      case "left":
        left = -tooltipWidth - this.TOOLTIP_OFFSET;

        if (alignment === "center") {
          top = (triggerHeight - tooltipHeight) / 2;
        } else if (alignment === "start") {
          top = 0;
        } else if (alignment === "end") {
          top = triggerHeight - tooltipHeight;
        }

        if (triggerRect.left + left < this.VIEWPORT_MARGIN) {
          placement = "right";
          left = triggerWidth + this.TOOLTIP_OFFSET;
        }

        arrowLeft = tooltipWidth;
        arrowTop = triggerRect.top + triggerHeight / 2 - (triggerRect.top + top);
        break;

      case "right":
        left = triggerWidth + this.TOOLTIP_OFFSET;

        if (alignment === "center") {
          top = (triggerHeight - tooltipHeight) / 2;
        } else if (alignment === "start") {
          top = 0;
        } else if (alignment === "end") {
          top = triggerHeight - tooltipHeight;
        }

        if (
          triggerRect.right + tooltipWidth + this.TOOLTIP_OFFSET >
          viewportWidth - this.VIEWPORT_MARGIN
        ) {
          placement = "left";
          left = -tooltipWidth - this.TOOLTIP_OFFSET;
        }

        arrowLeft = -1 * this.ARROW_POSITION_OFFSET;
        arrowTop = triggerRect.top + triggerHeight / 2 - (triggerRect.top + top);
        break;
    }

    return {
      top,
      left,
      arrowTop,
      arrowLeft,
      actualPlacement: placement,
    };
  }

  /**
   * Shows the tooltip with proper positioning and animation
   * @private
   * @param {HTMLElement} tooltip - The tooltip element to show
   * @param {HTMLElement} trigger - The trigger element
   */
  private showTooltip(tooltip: HTMLElement, trigger: HTMLElement): void {
    if (this.activeTooltip && this.activeTooltip !== tooltip) {
      this.hideTooltip(this.activeTooltip);
    }

    trigger.style.position = "relative";
    tooltip.removeAttribute("hidden");

    const position = this.calculatePosition(tooltip, trigger);

    tooltip.style.position = "absolute";
    tooltip.style.top = `${position.top}px`;
    tooltip.style.left = `${position.left}px`;

    const config = this.tooltips.get(tooltip);
    const arrowElement = config?.arrowElement;

    if (arrowElement) {
      arrowElement.style.cssText = "";

      arrowElement.style.position = "absolute";
      arrowElement.style.zIndex = this.ARROW_Z_INDEX;
      arrowElement.style.width = `${this.ARROW_SIZE}px`;
      arrowElement.style.height = `${this.ARROW_SIZE}px`;
      arrowElement.style.backgroundColor = "inherit";
      arrowElement.style.border = `${this.ARROW_BORDER_WIDTH}px solid`;

      if (position.arrowLeft !== undefined) {
        arrowElement.style.left = `${position.arrowLeft}px`;
      }

      switch (position.actualPlacement) {
        case "top":
          arrowElement.style.top = "100%";
          arrowElement.style.transform = "translate(-50%, -50%) rotate(45deg)";
          arrowElement.style.borderBottomColor = "inherit";
          arrowElement.style.borderRightColor = "inherit";
          arrowElement.style.borderTopColor = "transparent";
          arrowElement.style.borderLeftColor = "transparent";
          break;

        case "bottom":
          arrowElement.style.top = "0";
          arrowElement.style.transform = "translate(-50%, -50%) rotate(45deg)";
          arrowElement.style.borderTopColor = "inherit";
          arrowElement.style.borderLeftColor = "inherit";
          arrowElement.style.borderBottomColor = "transparent";
          arrowElement.style.borderRightColor = "transparent";
          break;

        case "left":
          arrowElement.style.left = "100%";
          arrowElement.style.top = "50%";
          arrowElement.style.transform = "translate(-50%, -50%) rotate(225deg)";
          arrowElement.style.borderBottomColor = "inherit";
          arrowElement.style.borderLeftColor = "inherit";
          arrowElement.style.borderTopColor = "transparent";
          arrowElement.style.borderRightColor = "transparent";
          break;

        case "right":
          arrowElement.style.left = "0";
          arrowElement.style.top = "50%";
          arrowElement.style.transform = "translate(-50%, -50%) rotate(225deg)";
          arrowElement.style.borderTopColor = "inherit";
          arrowElement.style.borderRightColor = "inherit";
          arrowElement.style.borderBottomColor = "transparent";
          arrowElement.style.borderLeftColor = "transparent";
          break;
      }
    }

    requestAnimationFrame(() => {
      tooltip.style.opacity = this.VISIBLE_OPACITY;
    });

    this.activeTooltip = tooltip;
  }

  private hideTooltip(tooltip: HTMLElement): void {
    tooltip.style.opacity = this.HIDDEN_OPACITY;

    setTimeout(() => {
      tooltip.setAttribute("hidden", "");

      if (this.activeTooltip === tooltip) {
        this.activeTooltip = null;
      }
    }, this.TRANSITION_DURATION);
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (event.key === "Escape" && this.activeTooltip) {
      this.hideTooltip(this.activeTooltip);
    }
  }
}

window.TooltipManager = TooltipManager;

document.addEventListener("DOMContentLoaded", () => {
  new TooltipManager();
});
