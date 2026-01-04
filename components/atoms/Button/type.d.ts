export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * HTML button type attribute
   * @example
   * <Button type="button">Button</Button>
   * <Button type="submit">Submit</Button>
   * <Button type="reset">Reset</Button>
   */
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  /**
   * Button variant
   * @example
   * <Button variant="contained">Contained Button</Button>
   * <Button variant="outlined">Outlined Button</Button>
   */
  variant: "contained" | "outlined";
  /**
   * Button color
   * @example
   * <Button color="primary">Primary Button</Button>
   * <Button color="secondary">Secondary Button</Button>
   */
  color: "primary" | "secondary";
  /**
   * Button size
   * @example
   * <Button size="small">Small Button</Button>
   * <Button size="medium">Medium Button</Button>
   * <Button size="large">Large Button</Button>
   */
  size: "small" | "medium" | "large";
}
