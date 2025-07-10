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
