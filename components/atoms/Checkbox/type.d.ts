export type CheckboxSize = "small" | "medium" | "large";

export interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "size" | "checked"
> {
  /**
   * Text label or aria-label when children exist.
   *
   * Behavior:
   * - Without `children`: displayed as visible label
   * - With `children`: used as `aria-label`
   *
   * **IMPORTANT**: At least one of `label` or `children` must be provided.
   * Component will log warning and return `null` if both are missing.
   */
  label?: string;
  /**
   * Custom visual content for checkbox label.
   *
   * When provided, `label` prop becomes `aria-label`.
   * If children contains no text, provide `label` for accessibility.
   *
   * **IMPORTANT**: If `children` has no text content, provide `label`
   * for accessibility.
   */
  children?: React.ReactNode;
  /**
   * Initial checked state
   */
  checked?: React.InputHTMLAttributes<HTMLInputElement>["defaultChecked"];
  /**
   * Disabled state.
   */
  disabled?: React.InputHTMLAttributes<HTMLInputElement>["disabled"];
  /**
   * Custom HTML id attribute.
   * Auto-generated via useId() if not provided.
   */
  id?: React.InputHTMLAttributes<HTMLInputElement>["id"];
  /**
   * Additional CSS classes.
   */
  className?: string;
  /**
   * Checkbox size variant.
   */
  size?: CheckboxSize;
}
