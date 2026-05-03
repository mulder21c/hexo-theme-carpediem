import type { FeatherIconName } from "feather-icons-react";

export type TextFieldType = "text" | "password" | "search" | "url" | "email";
export type TextFieldVariant = "outlined" | "underlined";
export type TextFieldSize = "small" | "medium" | "large";

export interface TextFieldProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "size" | "children"
> {
  /**
   * Supported native text input purpose.
   */
  type?: TextFieldType;
  /**
   * Visual boundary variant.
   */
  variant?: TextFieldVariant;
  /**
   * Field size variant.
   */
  size?: TextFieldSize;
  /**
   * Optional decorative leading Feather icon.
   */
  icon?: FeatherIconName;
  /**
   * Additional CSS classes for the root wrapper.
   */
  className?: string;
}
