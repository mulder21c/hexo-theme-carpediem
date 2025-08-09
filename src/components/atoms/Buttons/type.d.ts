import type { TooltipConfig } from "@/components/atoms/Tooltip/type";
import type { FeatherIconName } from "feather-icons-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * HTML button type attribute
   */
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  /**
   * Button size
   *
   * `small`: Compact button for tight spaces <br />
   * `medium`: Standard button size (default) <br />
   * `large`: Larger button with increased padding and text size <br />
   * `fluid`: Full-width button that adapts to container width
   */
  size?: "small" | "medium" | "large" | "fluid";
  /**
   * Button appearance
   *
   * `fill`: Solid background button for primary actions <br />
   * `outline`: Border-only button for secondary actions
   */
  appearance?: "fill" | "outline";
}

export interface IconButtonProps extends Partial<Omit<TooltipConfig, "triggerId">>, Omit<ButtonProps, "size"> {
  /**
   * Accessible name for button
   */
  label: string;
  /**
   * Button size
   *
   * `small`: Compact button for tight spaces <br />
   * `medium`: Standard button size (default) <br />
   * `large`: Larger button with increased padding and text size
   */
  size?: "small" | "medium" | "large";
  /**
   * Icon Name
   */
  icon: FeatherIconName;
  /**
   * Icon stroke thickness
   *
   * `thin`: Light stroke weight for subtle, minimal appearance <br />
   * `medium`: Standard stroke weight (default) <br />
   * `bold`: Heavy stroke weight for emphasis and better visibility
   */
  stroke?: "thin" | "medium" | "bold";
};
