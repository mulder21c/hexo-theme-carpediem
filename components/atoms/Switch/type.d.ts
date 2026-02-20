export type SwitchSize = "small" | "medium" | "large";

export interface SwitchProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "size" | "children" | "checked" | "disabled"
> {
  /**
   * Accessible label text used as `aria-label` when `aria-labelledby` is not provided.
   * At least one of `label` or `aria-labelledby` must be provided.
   */
  label?: string;
  /**
   * Initial checked state.
   */
  checked?: React.InputHTMLAttributes<HTMLInputElement>["defaultChecked"];
  /**
   * Disabled state.
   */
  disabled?: React.InputHTMLAttributes<HTMLInputElement>["disabled"];
  /**
   * Custom HTML id attribute. Auto-generated via `useId()` if not provided.
   */
  id?: React.InputHTMLAttributes<HTMLInputElement>["id"];
  /**
   * Additional CSS classes.
   */
  className?: string;
  /**
   * Switch size variant.
   */
  size?: SwitchSize;
}
