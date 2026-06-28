import type { TooltipConfig } from "@components/atoms/Tooltip/type";
import type { FeatherIconName } from "feather-icons-react";

export type ButtonVariant = "contained" | "outlined";
export type IconButtonVariant = ButtonVariant | "ghost";

export interface ButtonProps<
  TVariant extends IconButtonVariant = ButtonVariant,
> extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
  variant?: TVariant;
  /**
   * Button color
   * @example
   * <Button color="primary">Primary Button</Button>
   * <Button color="secondary">Secondary Button</Button>
   */
  color?: "primary" | "secondary";
  /**
   * Button size
   * @example
   * <Button size="x-small">X-Small Button</Button>
   * <Button size="small">Small Button</Button>
   * <Button size="medium">Medium Button</Button>
   * <Button size="large">Large Button</Button>
   */
  size?: "x-small" | "small" | "medium" | "large";
}

export interface IconButtonProps
  extends
    ButtonProps<IconButtonVariant>,
    Partial<Omit<TooltipConfig, "triggerId" | "tooltipId">> {
  /**
   * Accessible label for the icon button
   * @example
   * <IconButton label="Plus Button" icon="plus" />
   */
  label: string;
  /**
   * Icon button icon
   * @example
   * <IconButton icon="plus">Plus Button</IconButton>
   */
  icon: FeatherIconName;
  /**
   * Icon stroke thickness
   */
  stroke?: "thin" | "medium" | "bold";
}
