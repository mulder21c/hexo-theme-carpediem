export type Placement = "top" | "bottom" | "left" | "right";
export type Alignment = "start" | "center" | "end";
export type Purpose = "label" | "description";

/**
 * Configuration options for a tooltip instance
 */
export interface TooltipConfig {
  /**
   * The placement direction of the tooltip
   *
   * `top`: Tooltip appears above the trigger element <br />
   * `bottom`: Tooltip appears below the trigger element <br />
   * `left`: Tooltip appears to the left of the trigger element <br />
   * `right`: Tooltip appears to the right of the trigger element
   */
  placement: Placement;
  /**
   * The alignment of the tooltip
   *
   * `start`: Tooltip aligns to the start edge (left for horizontal, top for vertical placement)
   * <br />
   * `center`: Tooltip centers relative to the trigger element (default) <br />
   * `end`: Tooltip aligns to the end edge (right for horizontal, bottom for vertical placement)
   */
  alignment: Alignment;
  /** The ID of the element that triggers this tooltip */
  triggerId: string;
  /** The ID of the tooltip element */
  tooltipId?: string;
  /** The purpose of the tooltip */
  purpose?: Purpose;
}

export interface TooltipProps
  extends
    Omit<TooltipConfig, "tooltipId">,
    Omit<React.HTMLAttributes<HTMLSpanElement>, "style"> {}

export type TooltipContentProps = Omit<React.HTMLAttributes<HTMLSpanElement>, "style">;

// Internal types for TooltipManager UI logic
export interface TooltipInternalConfig {
  triggerId: string;
  placement: Placement;
  alignment: Alignment;
  purpose?: Purpose;
  tooltipId?: string;
  arrowElement: HTMLElement | null;
  triggerElement?: HTMLElement;
  handlers?: TooltipEventHandlers;
  originalAttributes: TooltipOriginalAttributes;
  showTimer?: number;
  hideTimer?: number;
  touchTimer?: number;
  isLongPress?: boolean;
  touchStartX?: number;
  touchStartY?: number;
  outsideTouchHandler?: (event: TouchEvent) => void;
}

export type TooltipPosition = {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  arrowTop?: number;
  arrowLeft?: number;
  actualPlacement: Placement;
};

export type TooltipEventHandlers = {
  mouseenter: (event: MouseEvent) => void;
  mouseleave: (event: MouseEvent) => void;
  focus: (event: FocusEvent) => void;
  blur: (event: FocusEvent) => void;
  touchstart?: (event: TouchEvent) => void;
  touchmove?: (event: TouchEvent) => void;
  touchend?: (event: TouchEvent) => void;
  contextmenu?: (event: Event) => void;
  tooltipMouseEnter?: () => void;
  tooltipMouseLeave?: () => void;
};

export type ArrowStyleConfig = {
  top?: string;
  left?: string;
  transform: string;
  transparentBorders: Array<"top" | "bottom" | "left" | "right">;
};

export type TooltipOriginalAttributes = {
  tooltip: {
    component: string;
    trigger: string;
    placement: Placement;
    alignment: Alignment;
    purpose: Purpose;
  };
};

export type ElementDimensions = {
  tooltipRect: DOMRect;
  triggerRect: DOMRect;
};

export type PlacementCalculationParams = {
  triggerRect: DOMRect;
  tooltipWidth: number;
  tooltipHeight: number;
  triggerWidth: number;
  triggerHeight: number;
  alignment: Alignment;
  viewportWidth: number;
};

export type PlacementBoundsCheckParams = {
  placement: Placement;
  triggerRect: DOMRect;
  tooltipWidth: number;
  tooltipHeight: number;
  viewportWidth: number;
  viewportHeight: number;
};

export type FallbackPlacementParams = {
  originalPlacement: Placement;
  triggerRect: DOMRect;
  tooltipWidth: number;
  tooltipHeight: number;
  viewportWidth: number;
  viewportHeight: number;
};

declare global {
  interface Window {
    tooltip: TooltipManager;
    TooltipManager: typeof TooltipManager;
  }
}
