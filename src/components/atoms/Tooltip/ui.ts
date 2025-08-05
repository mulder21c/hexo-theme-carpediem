import type {
  Placement,
  Alignment,
  TooltipInternalConfig,
  TooltipPosition,
  EventListenerAttachmentParams,
  HorizontalAlignmentParams,
  VerticalAlignmentParams,
  HorizontalPositionAdjustmentParams,
  PlacementCalculationParams,
  ElementDimensions,
  PlacementBoundsCheckParams,
  FallbackPlacementParams,
  TooltipEventHandlers,
  TimeoutRef,
} from "./type";

/**
 * Class responsible for managing tooltips in the application
 * @class TooltipManager
 */
export class TooltipManager {
  /** Singleton instance */
  private static instance: TooltipManager | null = null;

  /** Map to store tooltip elements and their configurations */
  private tooltips: Map<HTMLElement, TooltipInternalConfig> = new Map();

  /** Bound event handler for keydown events */
  private boundHandleKeyDown!: (event: KeyboardEvent) => void;

  /** Currently active tooltip element */
  private activeTooltip: HTMLElement | null = null;

  // Layout Constants
  /** Offset distance between tooltip and trigger element */
  private readonly TOOLTIP_OFFSET = 16;
  /** Minimum margin from viewport edges */
  private readonly VIEWPORT_MARGIN = 20;
  /** Delay before showing the tooltip on hover */
  private readonly HOVER_DELAY = 700;

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

  // Selector Constant
  private readonly TOOLTIP_SELECTOR = '[data-component="tooltip"]';
  private readonly DATA_ATTRIBUTES = {
    COMPONENT: "data-component",
    TRIGGER: "data-trigger",
    PLACEMENT: "data-placement",
    ALIGNMENT: "data-alignment",
    TRIGGER_TYPE: "data-trigger-type",
    ARROW: "data-arrow",
  } as const;

  /**
   * Initializes the TooltipManager and sets up global event listeners
   */
  constructor() {
    if (!TooltipManager.instance) {
      this.boundHandleKeyDown = this.handleKeyDown.bind(this);
      document.addEventListener("keydown", this.boundHandleKeyDown);
      this.init();
      TooltipManager.instance = this;

      return this;
    }

    return TooltipManager.instance;
  }

  /**
   * Get the singleton instance of TooltipManager
   * @returns {TooltipManager} The singleton instance
   */
  public static getInstance(): TooltipManager {
    if (!TooltipManager.instance) {
      TooltipManager.instance = new TooltipManager();
    }

    return TooltipManager.instance;
  }

  /**
   * Initializes all tooltip elements in the document
   * Finds elements with data-component="tooltip" and sets up their configuration
   * @private
   */
  private init(): void {
    const tooltipElements = document.querySelectorAll<HTMLElement>(this.TOOLTIP_SELECTOR);

    tooltipElements.forEach((tooltip) => {
      const tooltipElement = tooltip;

      const config = this.createTooltipConfig(tooltipElement);
      this.tooltips.set(tooltipElement, config);

      this.cleanupTooltipAttributes(tooltipElement, config.arrowElement);
      this.setupTooltipInitialState(tooltipElement);
      this.setupTrigger(tooltipElement);
    });
  }

  /**
   * Creates a tooltip configuration from element attributes
   * @private
   * @param {HTMLElement} tooltipElement - The tooltip element
   * @returns {TooltipInternalConfig} The tooltip configuration
   */
  private createTooltipConfig(tooltipElement: HTMLElement): TooltipInternalConfig {
    const triggerId = tooltipElement.getAttribute(this.DATA_ATTRIBUTES.TRIGGER) || "";
    const placement = (tooltipElement.getAttribute(this.DATA_ATTRIBUTES.PLACEMENT) ||
      "top") as Placement;
    const alignment = (tooltipElement.getAttribute(this.DATA_ATTRIBUTES.ALIGNMENT) ||
      "center") as Alignment;
    const arrowElement = tooltipElement.querySelector<HTMLElement>(
      `[${this.DATA_ATTRIBUTES.ARROW}]`,
    );

    return {
      triggerId,
      placement,
      alignment,
      arrowElement,
      originalAttributes: {
        component: "tooltip",
        trigger: triggerId,
        placement,
        alignment,
      },
    };
  }

  /**
   * Removes data attributes from tooltip elements
   * @private
   * @param {HTMLElement} tooltipElement - The tooltip element
   * @param {HTMLElement | null} arrowElement - The arrow element
   */
  private cleanupTooltipAttributes(
    tooltipElement: HTMLElement,
    arrowElement: HTMLElement | null,
  ): void {
    tooltipElement.removeAttribute(this.DATA_ATTRIBUTES.COMPONENT);
    tooltipElement.removeAttribute(this.DATA_ATTRIBUTES.TRIGGER);
    tooltipElement.removeAttribute(this.DATA_ATTRIBUTES.PLACEMENT);
    tooltipElement.removeAttribute(this.DATA_ATTRIBUTES.ALIGNMENT);
    tooltipElement.removeAttribute(this.DATA_ATTRIBUTES.TRIGGER_TYPE);
    arrowElement?.removeAttribute(this.DATA_ATTRIBUTES.ARROW);
  }

  /**
   * Sets up initial state for tooltip element
   * @private
   * @param {HTMLElement} tooltipElement - The tooltip element
   */
  private setupTooltipInitialState(tooltipElement: HTMLElement): void {
    tooltipElement.setAttribute("hidden", "");
    tooltipElement.style.opacity = this.HIDDEN_OPACITY;
  }

  /**
   * Creates a show tooltip handler with timeout clearing
   * @private
   * @param {HTMLElement} tooltipElement - The tooltip element
   * @param {HTMLElement} trigger - The trigger element
   * @param {number} hoverTimeoutRef - Reference to the current timeout
   * @returns {NoArgVoidFunction} The show handler function
   */
  private createShowTooltipHandler(
    tooltipElement: HTMLElement,
    trigger: HTMLElement,
    timeoutRef: TimeoutRef,
  ): () => void {
    return () => {
      clearTimeout(timeoutRef.current);
      this.showTooltip(tooltipElement, trigger);
    };
  }

  /**
   * Creates a hide tooltip handler with proper timeout management
   * @private
   * @param {HTMLElement} tooltipElement - The tooltip element
   * @param {number} hoverTimeout - Reference to the current timeout
   * @returns {NoArgVoidFunction} The hide handler function
   */
  private createHideTooltipHandler(
    tooltipElement: HTMLElement,
    timeoutRef: TimeoutRef,
  ): () => void {
    return () => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        if (!tooltipElement.matches(":hover")) {
          this.hideTooltip(tooltipElement);
        }
      }, this.HOVER_DELAY);
    };
  }

  /**
   * Creates all event handlers for tooltip interactions
   * @private
   * @param {HTMLElement} tooltipElement - The tooltip element
   * @param {HTMLElement} trigger - The trigger element
   * @returns {TooltipEventHandlers} Object containing all event handlers
   */
  private createEventHandlers(
    tooltipElement: HTMLElement,
    trigger: HTMLElement,
  ): TooltipEventHandlers {
    const timeoutRef: TimeoutRef = { current: 0 };

    return {
      mouseenter: this.createShowTooltipHandler(tooltipElement, trigger, timeoutRef),
      mouseleave: this.createHideTooltipHandler(tooltipElement, timeoutRef),
      focus: () => this.showTooltip(tooltipElement, trigger),
      blur: () => this.hideTooltip(tooltipElement),
    };
  }

  /**
   * Finds and validates the trigger element
   * @private
   * @param {string} triggerId - The ID of the trigger element
   * @returns {HTMLElement} The trigger element
   * @throws {Error} If trigger element is not found
   */
  private findTriggerElement(triggerId: string): HTMLElement {
    const trigger = document.querySelector<HTMLElement>(`#${triggerId}`);
    if (!trigger) {
      throw new Error(`Cannot find trigger element with ID: ${triggerId}`);
    }
    return trigger;
  }

  /**
   * Sets up event listeners for tooltip trigger elements
   * @private
   * @param {HTMLElement} tooltipElement - The tooltip element to setup
   */
  private setupTrigger(tooltipElement: HTMLElement): void {
    const config = this.tooltips.get(tooltipElement);
    if (!config) return;

    const trigger = this.findTriggerElement(config.triggerId);
    const handlers = this.createEventHandlers(tooltipElement, trigger);

    config.handlers = handlers;
    config.triggerElement = trigger;

    this.attachEventListeners({ trigger, tooltipElement, handlers });
  }

  /**
   * Attaches event listeners to trigger and tooltip elements
   * @private
   * @param {Object} params - Parameters object
   * @param {HTMLElement} params.trigger - The trigger element that activates the tooltip
   * @param {HTMLElement} params.tooltipElement - The tooltip element to be shown/hidden
   * @param {Object} params.handlers - Event handler functions
   * @param {Function} params.handlers.mouseenter - Handler for showing the tooltip
   * @param {Function} params.handlers.mouseleave - Handler for hiding the tooltip
   * @param {Function} params.handlers.focus - Handler for focus events
   * @param {Function} params.handlers.blur - Handler for blur events
   */
  private attachEventListeners({
    trigger,
    tooltipElement,
    handlers,
  }: EventListenerAttachmentParams): void {
    trigger.addEventListener("mouseenter", handlers.mouseenter);
    trigger.addEventListener("mouseleave", handlers.mouseleave);
    trigger.addEventListener("focus", handlers.focus);
    trigger.addEventListener("blur", handlers.blur);
    tooltipElement.addEventListener("mouseenter", handlers.mouseenter);
    tooltipElement.addEventListener("mouseleave", handlers.mouseleave);
  }

  /**
   * Calculates horizontal alignment based on alignment type
   * @private
   * @param {Object} options - The options for calculating horizontal alignment
   * @param {Alignment} options.alignment - The alignment type ('center', 'start', or 'end')
   * @param {number} options.triggerWidth - The width of the trigger element in pixels
   * @param {number} options.tooltipWidth - The width of the tooltip element in pixels
   * @returns {number} The calculated horizontal offset in pixels
   */
  private calculateHorizontalAlignment({
    alignment,
    triggerWidth,
    tooltipWidth,
  }: HorizontalAlignmentParams): number {
    switch (alignment) {
      case "center":
        return (triggerWidth - tooltipWidth) / 2;
      case "start":
        return 0;
      case "end":
        return triggerWidth - tooltipWidth;
      default:
        return (triggerWidth - tooltipWidth) / 2;
    }
  }

  /**
   * Calculates vertical alignment based on alignment type
   * @private
   * @param {Object} options - The options for calculating vertical alignment
   * @param {Alignment} options.alignment - The alignment type ('center', 'start', or 'end')
   * @param {number} options.triggerHeight - The height of the trigger element in pixels
   * @param {number} options.tooltipHeight - The height of the tooltip element in pixels
   * @returns {number} The calculated vertical offset in pixels
   */
  private calculateVerticalAlignment({
    alignment,
    triggerHeight,
    tooltipHeight,
  }: VerticalAlignmentParams): number {
    switch (alignment) {
      case "center":
        return (triggerHeight - tooltipHeight) / 2;
      case "start":
        return 0;
      case "end":
        return triggerHeight - tooltipHeight;
      default:
        return (triggerHeight - tooltipHeight) / 2;
    }
  }

  /**
   * Adjusts the horizontal position of the tooltip to ensure it remains within the viewport
   * boundaries
   * @param options - Configuration object for position adjustment
   * @param options.left - Initial left position offset
   * @param options.triggerRect - Bounding rectangle of the trigger element
   * @param options.tooltipWidth - Width of the tooltip element
   * @param options.viewportWidth - Width of the current viewport
   * @returns The adjusted left position offset
   * @private
   */
  private adjustHorizontalPosition({
    left,
    triggerRect,
    tooltipWidth,
    viewportWidth,
  }: HorizontalPositionAdjustmentParams): number {
    if (triggerRect.left + left < this.VIEWPORT_MARGIN) {
      return this.VIEWPORT_MARGIN - triggerRect.left;
    } else if (
      triggerRect.left + left + tooltipWidth >
      viewportWidth - this.VIEWPORT_MARGIN
    ) {
      return viewportWidth - tooltipWidth - triggerRect.left - this.VIEWPORT_MARGIN;
    }
    return left;
  }

  /**
   * Calculates the position and arrow placement for tooltip positioned above the trigger element
   * @private
   * @param params - Configuration object for position calculation
   * @param params.triggerRect - Bounding rectangle of the trigger element
   * @param params.tooltipWidth - Width of the tooltip element
   * @param params.tooltipHeight - Height of the tooltip element
   * @param params.triggerWidth - Width of the trigger element
   * @param params.alignment - Horizontal alignment preference (left, center, right)
   * @param params.viewportWidth - Width of the viewport for boundary checking
   * @returns Position object containing top, left coordinates and arrow positioning
   */
  private calculateTopPosition({
    triggerRect,
    tooltipWidth,
    tooltipHeight,
    triggerWidth,
    alignment,
    viewportWidth,
  }: Omit<PlacementCalculationParams, "triggerHeight">): TooltipPosition {
    const top = -tooltipHeight - this.TOOLTIP_OFFSET;
    let left = this.calculateHorizontalAlignment({
      alignment,
      triggerWidth,
      tooltipWidth,
    });

    // Adjust if tooltip would go outside viewport
    left = this.adjustHorizontalPosition({
      left,
      triggerRect,
      tooltipWidth,
      viewportWidth,
    });

    const arrowTop = tooltipHeight;
    const arrowLeft = triggerRect.left + triggerWidth / 2 - (triggerRect.left + left);

    return { top, left, arrowTop, arrowLeft, actualPlacement: "top" };
  }

  /**
   * Calculates position for bottom placement
   * @private
   */
  private calculateBottomPosition({
    triggerRect,
    tooltipWidth,
    triggerWidth,
    triggerHeight,
    alignment,
    viewportWidth,
  }: Omit<PlacementCalculationParams, "tooltipHeight">): TooltipPosition {
    const top = triggerHeight + this.TOOLTIP_OFFSET;
    let left = this.calculateHorizontalAlignment({
      alignment,
      triggerWidth,
      tooltipWidth,
    });

    // Adjust if tooltip would go outside viewport
    left = this.adjustHorizontalPosition({
      left,
      triggerRect,
      tooltipWidth,
      viewportWidth,
    });

    const arrowTop = -1 * this.ARROW_POSITION_OFFSET;
    const arrowLeft = triggerRect.left + triggerWidth / 2 - (triggerRect.left + left);

    return { top, left, arrowTop, arrowLeft, actualPlacement: "bottom" };
  }

  /**
   * Calculates the position coordinates for tooltip placement on the left side of the trigger element.
   *
   * @private
   * @param {Object} params - The positioning parameters
   * @param {DOMRect} params.triggerRect - The bounding rectangle of the trigger element
   * @param {number} params.tooltipWidth - The width of the tooltip element
   * @param {number} params.tooltipHeight - The height of the tooltip element
   * @param {number} params.triggerHeight - The height of the trigger element
   * @param {Alignment} params.alignment - The vertical alignment preference for the tooltip
   * @returns {TooltipPosition} The calculated position object containing top, left coordinates and arrow positioning
   */
  private calculateLeftPosition({
    triggerRect,
    tooltipWidth,
    tooltipHeight,
    triggerHeight,
    alignment,
  }: Omit<
    PlacementCalculationParams,
    "triggerWidth" | "viewportWidth"
  >): TooltipPosition {
    const left = -tooltipWidth - this.TOOLTIP_OFFSET;
    const top = this.calculateVerticalAlignment({
      alignment,
      triggerHeight,
      tooltipHeight,
    });

    const arrowLeft = tooltipWidth;
    const arrowTop = triggerRect.top + triggerHeight / 2 - (triggerRect.top + top);

    return { top, left, arrowTop, arrowLeft, actualPlacement: "left" };
  }

  /**
   * Calculates the position for tooltip placement on the right side of the trigger element.
   *
   * @private
   * @param {Object} params - The positioning parameters
   * @param {DOMRect} params.triggerRect - The bounding rectangle of the trigger element
   * @param {number} params.tooltipHeight - The height of the tooltip element
   * @param {number} params.triggerWidth - The width of the trigger element
   * @param {number} params.triggerHeight - The height of the trigger element
   * @param {Alignment} params.alignment - The vertical alignment preference for the tooltip
   * @returns {TooltipPosition} The calculated position object containing top, left coordinates and arrow positioning
   */
  private calculateRightPosition({
    triggerRect,
    tooltipHeight,
    triggerWidth,
    triggerHeight,
    alignment,
  }: Omit<
    PlacementCalculationParams,
    "tooltipWidth" | "viewportWidth"
  >): TooltipPosition {
    const left = triggerWidth + this.TOOLTIP_OFFSET;
    const top = this.calculateVerticalAlignment({
      alignment,
      triggerHeight,
      tooltipHeight,
    });

    const arrowLeft = -1 * this.ARROW_POSITION_OFFSET;
    const arrowTop = triggerRect.top + triggerHeight / 2 - (triggerRect.top + top);

    return { top, left, arrowTop, arrowLeft, actualPlacement: "right" };
  }

  /**
   * Factory mapping for placement-specific position calculation methods
   *
   * @private
   * @readonly
   * @type {Record<Placement, (params: PlacementCalculationParams) => TooltipPosition>}
   *
   * @see {@link calculatePositionByPlacement} - Method that utilizes this mapping
   * @see {@link PlacementCalculationParams} - Parameters passed to calculation methods
   * @see {@link TooltipPosition} - Return type of calculation methods
   */
  private readonly positionCalculators = {
    top: this.calculateTopPosition.bind(this),
    bottom: this.calculateBottomPosition.bind(this),
    left: this.calculateLeftPosition.bind(this),
    right: this.calculateRightPosition.bind(this),
  } as const;

  /**
   * Calculates tooltip position using the appropriate placement-specific method
   *
   * @private
   * @param {Placement} placement - The desired placement position ('top', 'bottom', 'left', or 'right')
   * @param {PlacementCalculationParams} params - Configuration object containing all necessary positioning data
   * @returns {TooltipPosition} Calculated position object containing coordinates and arrow positioning
   *
   * @see {@link positionCalculators} - Factory mapping used for method selection
   * @see {@link PlacementCalculationParams} - Input parameter type definition
   * @see {@link TooltipPosition} - Return type definition
   * @see {@link calculateTopPosition} - Default fallback calculation method
   */
  private calculatePositionByPlacement(
    placement: Placement,
    params: PlacementCalculationParams,
  ): TooltipPosition {
    const calculator = this.positionCalculators[placement];
    if (!calculator) {
      return this.calculateTopPosition(params);
    }
    return calculator(params);
  }

  /**
   * Checks if the tooltip would exceed viewport boundaries when positioned at the specified placement
   *
   * @private
   * @param {PlacementBoundsCheckParams} params - Configuration object for boundary checking
   * @param {Placement} params.placement - The desired placement position ('top', 'bottom', 'left', or 'right')
   * @param {DOMRect} params.triggerRect - The bounding rectangle of the trigger element
   * @param {number} params.tooltipWidth - The width of the tooltip element in pixels
   * @param {number} params.tooltipHeight - The height of the tooltip element in pixels
   * @param {number} params.viewportWidth - The current viewport width in pixels
   * @param {number} params.viewportHeight - The current viewport height in pixels
   * @returns {boolean} Returns true if the tooltip would exceed viewport boundaries, false otherwise
   *
   */
  private isPlacementOutOfBounds({
    placement,
    triggerRect,
    tooltipWidth,
    tooltipHeight,
    viewportWidth,
    viewportHeight,
  }: PlacementBoundsCheckParams): boolean {
    switch (placement) {
      case "top":
        return (
          triggerRect.top - tooltipHeight - this.TOOLTIP_OFFSET < this.VIEWPORT_MARGIN
        );
      case "bottom":
        return (
          triggerRect.bottom + tooltipHeight + this.TOOLTIP_OFFSET >
          viewportHeight - this.VIEWPORT_MARGIN
        );
      case "left":
        return (
          triggerRect.left - tooltipWidth - this.TOOLTIP_OFFSET < this.VIEWPORT_MARGIN
        );
      case "right":
        return (
          triggerRect.right + tooltipWidth + this.TOOLTIP_OFFSET >
          viewportWidth - this.VIEWPORT_MARGIN
        );
      default:
        return false;
    }
  }

  /**
   * Determines the best fallback placement when the original placement would exceed viewport boundaries
   */
  private getFallbackPlacement({
    originalPlacement,
    triggerRect,
    tooltipWidth,
    tooltipHeight,
    viewportWidth,
    viewportHeight,
  }: FallbackPlacementParams): Placement {
    const fallbackMap: Record<Placement, Placement> = {
      top: "bottom",
      bottom: "top",
      left: "right",
      right: "left",
    };

    const fallback = fallbackMap[originalPlacement];

    if (
      this.isPlacementOutOfBounds({
        placement: fallback,
        triggerRect,
        tooltipWidth,
        tooltipHeight,
        viewportWidth,
        viewportHeight,
      })
    ) {
      return originalPlacement;
    }

    return fallback;
  }

  /**
   * Gets dimensions of tooltip and trigger elements
   * @private
   * @param {HTMLElement} tooltip - The tooltip element
   * @param {HTMLElement} trigger - The trigger element
   * @returns {Object} Object containing element rectangles
   */
  private getElementDimensions(
    tooltip: HTMLElement,
    trigger: HTMLElement,
  ): ElementDimensions {
    const isHidden = tooltip.hidden;
    const originalOpacity = tooltip.style.opacity;

    if (isHidden) {
      tooltip.style.opacity = "0";
      tooltip.hidden = false;
    }

    const tooltipRect = tooltip.getBoundingClientRect();
    const triggerRect = trigger.getBoundingClientRect();

    if (isHidden) {
      tooltip.hidden = true;
      tooltip.style.opacity = originalOpacity;
    }

    return { tooltipRect, triggerRect };
  }

  /**
   * Retrieves the current viewport dimensions for boundary calculations
   */
  private getViewportDimensions() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  /**
   * Creates a standardized parameter object for tooltip position calculations
   *
   * @private
   * @param {ElementDimensions} dimensions - Object containing bounding rectangles of tooltip and trigger elements
   * @param {{ width: number; height: number }} viewportDimensions - Current viewport size information
   * @param {number} viewportDimensions.width - The viewport width in pixels
   * @param {number} viewportDimensions.height - The viewport height in pixels
   * @param {Alignment} alignment - The alignment preference for tooltip positioning
   * @returns {PlacementCalculationParams} Standardized parameter object for position calculations
   *
   * @see {@link ElementDimensions} - Input dimensions type definition
   * @see {@link PlacementCalculationParams} - Output parameter type definition
   *
   * @since 1.0.0
   */
  private createCalculationParams(
    dimensions: ElementDimensions,
    viewportDimensions: { width: number; height: number },
    alignment: Alignment,
  ): PlacementCalculationParams {
    return {
      triggerRect: dimensions.triggerRect,
      tooltipWidth: dimensions.tooltipRect.width,
      tooltipHeight: dimensions.tooltipRect.height,
      triggerWidth: dimensions.triggerRect.width,
      triggerHeight: dimensions.triggerRect.height,
      alignment,
      viewportWidth: viewportDimensions.width,
    };
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

    const dimensions = this.getElementDimensions(tooltip, trigger);
    const viewportDimensions = this.getViewportDimensions();

    const calculationParams = this.createCalculationParams(
      dimensions,
      viewportDimensions,
      config.alignment,
    );

    let targetPlacement = config.placement;

    if (
      this.isPlacementOutOfBounds({
        placement: targetPlacement,
        triggerRect: dimensions.triggerRect,
        tooltipWidth: dimensions.tooltipRect.width,
        tooltipHeight: dimensions.tooltipRect.height,
        viewportWidth: viewportDimensions.width,
        viewportHeight: viewportDimensions.height,
      })
    ) {
      targetPlacement = this.getFallbackPlacement({
        originalPlacement: targetPlacement,
        triggerRect: dimensions.triggerRect,
        tooltipWidth: dimensions.tooltipRect.width,
        tooltipHeight: dimensions.tooltipRect.height,
        viewportWidth: viewportDimensions.width,
        viewportHeight: viewportDimensions.height,
      });
    }

    const position = this.calculatePositionByPlacement(
      targetPlacement,
      calculationParams,
    );
    position.actualPlacement = targetPlacement;

    return position;
  }

  /**
   * Positions the arrow element based on tooltip position
   * @private
   * @param {HTMLElement} tooltip - The tooltip element
   * @param {TooltipPosition} position - The calculated position
   */
  private positionArrow(tooltip: HTMLElement, position: TooltipPosition): void {
    const config = this.tooltips.get(tooltip);
    const arrowElement = config?.arrowElement;

    if (!arrowElement) return;

    arrowElement.style.cssText = "";
    arrowElement.style.position = "absolute";
    arrowElement.style.zIndex = this.ARROW_Z_INDEX;

    if (position.arrowLeft !== undefined) {
      arrowElement.style.left = `${position.arrowLeft}px`;
    }

    if (position.arrowTop !== undefined) {
      arrowElement.style.top = `${position.arrowTop}px`;
    }

    this.styleArrowByPlacement(arrowElement, position.actualPlacement);
  }

  /**
   * Applies styles to arrow based on placement
   * @private
   * @param {HTMLElement} arrowElement - The arrow element
   * @param {Placement} placement - The actual placement
   */
  private styleArrowByPlacement(arrowElement: HTMLElement, placement: Placement): void {
    switch (placement) {
      case "top":
        arrowElement.style.top = "100%";
        arrowElement.style.transform = "translate(-50%, -50%) rotate(45deg)";
        arrowElement.style.borderTopColor = "transparent";
        arrowElement.style.borderLeftColor = "transparent";
        break;

      case "bottom":
        arrowElement.style.top = "0";
        arrowElement.style.transform = "translate(-50%, -50%) rotate(45deg)";
        arrowElement.style.borderBottomColor = "transparent";
        arrowElement.style.borderRightColor = "transparent";
        break;

      case "left":
        arrowElement.style.left = "100%";
        arrowElement.style.top = "50%";
        arrowElement.style.transform = "translate(-50%, -50%) rotate(225deg)";
        arrowElement.style.borderTopColor = "transparent";
        arrowElement.style.borderRightColor = "transparent";
        break;

      case "right":
        arrowElement.style.left = "0";
        arrowElement.style.top = "50%";
        arrowElement.style.transform = "translate(-50%, -50%) rotate(225deg)";
        arrowElement.style.borderBottomColor = "transparent";
        arrowElement.style.borderLeftColor = "transparent";
        break;
    }
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

    this.positionArrow(tooltip, position);

    requestAnimationFrame(() => {
      tooltip.style.opacity = this.VISIBLE_OPACITY;
    });

    this.activeTooltip = tooltip;
  }

  /**
   * Hides the tooltip with a fade-out animation
   * @private
   * @param {HTMLElement} tooltip - The tooltip element to hide
   */
  private hideTooltip(tooltip: HTMLElement): void {
    tooltip.style.opacity = this.HIDDEN_OPACITY;

    setTimeout(() => {
      tooltip.setAttribute("hidden", "");

      if (this.activeTooltip === tooltip) {
        this.activeTooltip = null;
      }
    }, this.TRANSITION_DURATION);
  }

  /**
   * Handles keyboard events for tooltip interactions
   * @private
   * @param {KeyboardEvent} event - The keyboard event
   */
  private handleKeyDown(event: KeyboardEvent): void {
    if (event.key === "Escape" && this.activeTooltip) {
      this.hideTooltip(this.activeTooltip);
    }
  }

  /**
   * Restores a tooltip to its original state
   * @private
   * @param {HTMLElement} tooltipElement - The tooltip element
   * @param {TooltipInternalConfig} config - The tooltip configuration
   */
  private restoreTooltipToOriginalState(
    tooltipElement: HTMLElement,
    config: TooltipInternalConfig,
  ): void {
    if (config.triggerElement && config.handlers) {
      const { triggerElement, handlers } = config;

      // Remove event listeners
      triggerElement.removeEventListener("mouseenter", handlers.mouseenter);
      triggerElement.removeEventListener("mouseleave", handlers.mouseleave);
      triggerElement.removeEventListener("focus", handlers.focus);
      triggerElement.removeEventListener("blur", handlers.blur);

      tooltipElement.removeEventListener("mouseenter", handlers.mouseenter);
      tooltipElement.removeEventListener("mouseleave", handlers.mouseleave);

      tooltipElement.removeAttribute("hidden");

      // Restore original attributes
      if (config.originalAttributes) {
        Object.entries(config.originalAttributes).forEach(([key, value]) => {
          tooltipElement.setAttribute(`data-${key}`, value);
        });
      }

      // Reset styles
      tooltipElement.style.cssText = "";
      if (config.arrowElement) {
        config.arrowElement.style.cssText = "";
        config.arrowElement.setAttribute(this.DATA_ATTRIBUTES.ARROW, "");
      }
    }
  }

  /**
   * Destroys the TooltipManager instance and restores initial state.
   * Removes all event listeners and resets tooltips to their original state
   * @public
   */
  public destroy(): void {
    if (this.activeTooltip) {
      this.hideTooltip(this.activeTooltip);
    }

    this.tooltips.forEach((config, tooltipElement) => {
      this.restoreTooltipToOriginalState(tooltipElement, config);
    });

    document.removeEventListener("keydown", this.boundHandleKeyDown);

    this.tooltips.clear();
    this.activeTooltip = null;
    TooltipManager.instance = null;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new TooltipManager();
});
