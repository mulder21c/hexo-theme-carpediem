import type { FeatherIconName } from "feather-icons-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * HTML button type attribute
   */
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  /**
   * Button size
   */
  size?: "small" | "medium" | "large" | "fluid";
  /**
   * Button appearance
   */
  appearance?: "fill" | "outline";
}

export interface IconButtonProps extends Omit<ButtonProps, "size"> {
  /**
   * Accessible name for button
   */
  label: string;
  /**
   * Button size
   */
  size?: "small" | "medium" | "large";
  /**
   * Icon Name
   */
  icon: FeatherIconName;
  /**
   * Icon stroke thickness
   */
  stroke?: "thin" | "medium" | "bold";
};
