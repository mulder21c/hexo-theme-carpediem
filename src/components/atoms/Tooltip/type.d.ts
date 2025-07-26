import type { TooltipManager } from "./ui";

export type Placement = "top" | "bottom" | "left" | "right";
export type Alignment = "start" | "center" | "end";

/** Configuration options for a tooltip instance */
export interface TooltipConfig {
  /** The placement direction of the tooltip */
  placement: Placement;
  /** The alignment of the tooltip */
  alignment: Alignment;
  /** The ID of the element that triggers this tooltip */
  triggerId: string;
}

/** Represents the calculated position of a tooltip in the viewport */
export interface TooltipPosition {
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

export interface TooltipProps extends TooltipConfig, React.HTMLAttributes<HTMLSpanElement> {}
export interface TooltipContainerProps extends React.HTMLAttributes<HTMLSpanElement> {}
export interface TooltipContentProps extends React.HTMLAttributes<HTMLSpanElement> {}


declare global {
  interface Window {
    TooltipManager: typeof TooltipManager;
  }
}
