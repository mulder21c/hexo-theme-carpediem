import type { RadioProps } from "@components/atoms/Radio/type";

/** Option item for RadioGroup: value and label required, rest from RadioProps */
export type RadioGroupOptionItem = Required<Pick<RadioProps, "value" | "label">> &
  Partial<Omit<RadioProps, "value" | "label">>;

export interface RadioGroupProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    Pick<RadioProps, "name" | "variant" | "size" | "align"> {
  /**
   * Array of radio button option props
   */
  options?: Array<RadioGroupOptionItem>;
  /**
   * Set the layout direction of radio buttons (horizontal or vertical)
   */
  direction?: "horizontal" | "vertical";
  /**
   * Only accepts React element(s) of type Radio
   */
  children?: React.ReactElement<RadioProps> | Array<React.ReactElement<RadioProps>>;
  /**
   * Custom CSS classes
   */
  className?: string;
}

export type RenderOptionsContentProps = Pick<
  RadioGroupProps,
  "name" | "variant" | "size" | "align"
> &
  Required<Pick<RadioGroupProps, "options">>;

export type RenderChildrenContentProps = Omit<RadioGroupProps, "options" | "children"> & {
  children?: React.ReactNode;
};
