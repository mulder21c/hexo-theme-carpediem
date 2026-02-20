export interface RadioProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "size" | "checked"
> {
  /**
   * Radio group identifier (HTML `name` attribute)
   */
  name?: React.InputHTMLAttributes<HTMLInputElement>["name"];
  /**
   * Option value (HTML `value` attribute)
   */
  value: React.InputHTMLAttributes<HTMLInputElement>["value"];
  /**
   * Text label or aria-label when children exist
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
   * Alignment of the label
   *
   * - `start`: Align the label to the start of the radio button
   * - `center`: Align the label to the center of the radio button
   */
  align?: "start" | "center";
  /**
   * Visual style variant
   *
   * - `native`: Traditional circular radio button indicator
   * - `outline`: Outline-like appearance with no border
   * - `button`: Button-like appearance with outline border
   */
  variant?: "native" | "button" | "outline";
  /**
   * Component size
   */
  size?: "small" | "medium" | "large";
  /**
   * Initial checked state
   */
  checked?: React.InputHTMLAttributes<HTMLInputElement>["defaultChecked"];
  /**
   * Disabled state
   */
  disabled?: React.InputHTMLAttributes<HTMLInputElement>["disabled"];
  /**
   * Custom HTML id attribute <br>
   * Auto-generated if not provided.
   */
  id?: React.InputHTMLAttributes<HTMLInputElement>["id"];
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Custom visual content for radio label
   *
   * When provided, `label` prop becomes `aria-label`.
   * If children contains no text, provide `label` for accessibility.
   *
   * **IMPORTANT**: If `children` has no text content, provide `label`
   * for accessibility.
   */
  children?: React.ReactNode;
}
