import type { Fragment } from "react";
import type { RadioProps } from "@components/atoms/Radio/type";

/** Option item for RadioGroup: value and label required, rest from RadioProps */
export type RadioGroupOptionItem = Required<Pick<RadioProps, "value" | "label">> &
  Omit<RadioProps, "value" | "label">;

type RadioChild = React.ReactElement<RadioProps>;
type RadioGroupFragment = React.ReactElement<
  { children?: RadioGroupChildren },
  typeof Fragment
>;
export type RadioGroupChildren =
  | RadioChild
  | RadioGroupFragment
  | ReadonlyArray<RadioChild | RadioGroupFragment>
  | null
  | undefined
  | false;

export interface RadioGroupProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    Pick<RadioProps, "name" | "variant" | "size" | "align"> {
  /**
   * Array of radio button option props
   * If both `options` and `children` are provided, `children` takes precedence.
   */
  options?: Array<RadioGroupOptionItem>;
  /**
   * Set the layout direction of radio buttons (horizontal or vertical)
   */
  direction?: "horizontal" | "vertical";
  /**
   * Only accepts:
   * - `Radio` element(s)
   * - `React.Fragment` that wraps only `Radio` element(s)
   *
   * If both `options` and `children` are provided, `children` takes precedence.
   */
  children?: RadioGroupChildren;
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
  children?: RadioGroupChildren;
};
