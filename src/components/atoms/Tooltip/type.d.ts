import type { TooltipManager } from "./ui";

export type TimeoutRef = { current: number };
export type Placement = "top" | "bottom" | "left" | "right";
export type Alignment = "start" | "center" | "end";

/**
 * Configuration options for a tooltip instance
 */
export type TooltipConfig = {
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
}

export interface TooltipProps extends TooltipConfig, React.HTMLAttributes<HTMLSpanElement> { }
export interface TooltipContainerProps extends React.HTMLAttributes<HTMLSpanElement> { }
export interface TooltipContentProps extends React.HTMLAttributes<HTMLSpanElement> { }

declare global {
  interface Window {
    tooltip: TooltipManager;
  }
}

/**
 * Event handler functions for tooltip interactions
 * @internal
 */
export type TooltipEventHandlers = {
  /** Handler function for mouseenter events on the trigger element */
  mouseenter: MouseEventHandler;
  /** Handler function for mouseleave events on the trigger element */
  mouseleave: MouseEventHandler;
  /** Handler function for focus events on the trigger element */
  focus: FocusEventHandler;
  /** Handler function for blur events on the trigger element */
  blur: FocusEventHandler;
}

/**
 * Original data attributes of a tooltip element before processing
 * Used to restore the tooltip to its initial state when destroyed
 * @internal
 */
type TooltipOriginalAttributes = {
  /** The original data-component attribute value */
  component: string;
  /** The original data-trigger attribute value (trigger element ID) */
  trigger: string;
  /** The original data-placement attribute value */
  placement: string;
  /** The original data-alignment attribute value */
  alignment: string;
}

/**
 * Internal configuration for tooltip instances used by the TooltipManager
 *
 * Extends the base TooltipConfig with additional internal properties needed
 * for tooltip lifecycle management, event handling, and DOM manipulation.
 * This interface is used internally by the tooltip system and contains
 * runtime-specific data that is not part of the public API.
 * @internal
 */
export interface TooltipInternalConfig extends TooltipConfig {
  /** The arrow element of the tooltip, null if no arrow is present */
  arrowElement: HTMLElement | null;
  /** The DOM element that triggers the tooltip display */
  triggerElement?: HTMLElement;
  /** Event handlers attached to the trigger element for tooltip interactions */
  handlers?: TooltipEventHandlers;
  /** Original data attributes stored for tooltip restoration when destroyed */
  originalAttributes?: TooltipOriginalAttributes;
}

/**
 * Parameters required for attaching event listeners to tooltip trigger elements
 * @internal
 */
export type EventListenerAttachmentParams = {
  /** The DOM element that triggers tooltip display when interacted with */
  trigger: HTMLElement;
  /** The tooltip element that will be shown/hidden based on trigger interactions */
  tooltipElement: HTMLElement;
  /** Collection of event handler functions for different interaction types */
  handlers: TooltipEventHandlers;
}

/**
 * Parameters for calculating horizontal alignment of tooltips
 * @internal
 */
export type HorizontalAlignmentParams = {
  /** The desired alignment of the tooltip relative to the trigger element */
  alignment: Alignment;
  /** The width of the trigger element in pixels */
  triggerWidth: number;
  /** The width of the tooltip element in pixels */
  tooltipWidth: number;
}

/**
 * Parameters for calculating vertical alignment of tooltips
 * @internal
 */
export type VerticalAlignmentParams = {
  /** The desired alignment of the tooltip relative to the trigger element */
  alignment: Alignment;
  /** The height of the trigger element in pixels */
  triggerHeight: number;
  /** The height of the tooltip element in pixels */
  tooltipHeight: number;
}

/**
 * Parameters for adjusting horizontal position of tooltips within viewport bounds
 * @internal
 */
export type HorizontalPositionAdjustmentParams = {
  /** The initial left position of the tooltip in pixels */
  left: number;
  /** The bounding rectangle of the trigger element */
  triggerRect: DOMRect;
  /** The width of the tooltip element in pixels */
  tooltipWidth: number;
  /** The width of the viewport in pixels */
  viewportWidth: number;
}

/**
 * Base parameters for tooltip placement calculations
 * Contains all possible measurements needed for positioning tooltips
 * @internal
 */
export type PlacementCalculationParams = {
  /** The bounding rectangle of the trigger element */
  triggerRect: DOMRect;
  /** The width of the tooltip element in pixels */
  tooltipWidth: number;
  /** The height of the tooltip element in pixels */
  tooltipHeight: number;
  /** The width of the trigger element in pixels */
  triggerWidth: number;
  /** The height of the trigger element in pixels */
  triggerHeight: number;
  /** The desired alignment of the tooltip relative to the trigger element */
  alignment: Alignment;
  /** The width of the viewport in pixels for boundary checking */
  viewportWidth: number;
}

/**
 * Parameters for checking if a tooltip placement would exceed viewport boundaries
 */
export interface PlacementBoundsCheckParams {
  /** The desired placement position */
  placement: Placement;
  /** The bounding rectangle of the trigger element */
  triggerRect: DOMRect;
  /** The width of the tooltip element in pixels */
  tooltipWidth: number;
  /** The height of the tooltip element in pixels */
  tooltipHeight: number;
  /** The current viewport width in pixels */
  viewportWidth: number;
  /** The current viewport height in pixels */
  viewportHeight: number;
}

/**
 * Parameters for determining fallback placement when original placement exceeds viewport boundaries
 * @internal
 */
export interface FallbackPlacementParams {
  /** The originally requested placement position */
  originalPlacement: Placement;
  /** The bounding rectangle of the trigger element */
  triggerRect: DOMRect;
  /** The width of the tooltip element in pixels */
  tooltipWidth: number;
  /** The height of the tooltip element in pixels */
  tooltipHeight: number;
  /** The current viewport width in pixels */
  viewportWidth: number;
  /** The current viewport height in pixels */
  viewportHeight: number;
}

/**
 * Represents the calculated position of a tooltip in the viewport
 * @internal
 */
export type TooltipPosition = {
  /** The top position in pixels */
  top: number;
  /** The left position in pixels */
  left: number;
  /** The top position of the arrow in pixels (if applicable) */
  arrowTop?: number;
  /** The left position of the arrow in pixels (if applicable) */
  arrowLeft?: number;
  /** The actual placement that was applied after position adjustments */
  actualPlacement: Placement;
}

/**
 * Container for dimension information of tooltip and trigger elements
 * @internal
 */
export interface ElementDimensions {
  /** The bounding rectangle of the tooltip element */
  tooltipRect: DOMRect;
  /** The bounding rectangle of the trigger element */
  triggerRect: DOMRect;
}