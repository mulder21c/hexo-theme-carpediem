import Radio from "@components/atoms/Radio";
import { useHexo } from "@context/HexoContext";
import classNames from "classnames/bind";
import { Children, cloneElement, Fragment, isValidElement } from "react";
import { areOptionValuesUnique } from "./index.helper";
import styles from "./index.module.scss";
import type {
  RadioGroupProps,
  RenderChildrenContentProps,
  RenderOptionsContentProps,
} from "./type";
import type { RadioProps } from "@components/atoms/Radio/type";

const REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
const cx = classNames.bind(styles);

function isFragment(
  element: React.ReactElement,
): element is React.ReactElement<{ children?: React.ReactNode }> {
  return element.type === Fragment || (element.type as unknown) === REACT_FRAGMENT_TYPE;
}

function renderChildrenContent({
  name,
  variant,
  size,
  align,
  children,
}: RenderChildrenContentProps): React.ReactNode {
  const childList = Children.toArray(children);
  const context = { name, variant, size, align };

  return childList.flatMap((child) => {
    if (!isValidElement(child)) {
      return [child];
    }
    if (isFragment(child)) {
      return Children.toArray(
        renderChildrenContent({ ...context, children: child.props.children }),
      );
    }

    const radioChild = child as React.ReactElement<RadioProps>;
    const { checked, disabled, ...props } = radioChild.props;

    return [
      cloneElement(radioChild, {
        ...(props || {}),
        name,
        variant,
        size,
        align,
        disabled,
        checked,
        className: cx("radiogroup__item", radioChild.props.className),
      }),
    ];
  });
}

function renderOptionsContent({
  name,
  variant,
  size,
  align,
  options,
}: RenderOptionsContentProps): React.ReactNode {
  return (options || []).map((option) => {
    return (
      <Radio
        key={`${option.value}`}
        name={name}
        value={option.value}
        label={option.label}
        variant={variant || option.variant || "native"}
        size={size || option.size || "medium"}
        align={align || option.align || "start"}
        disabled={option.disabled}
        checked={option.checked}
        className={cx("radiogroup__item", option.className)}
      >
        {option.children}
      </Radio>
    );
  });
}

function RadioGroup({
  name,
  options,
  children,
  variant = "native",
  size = "medium",
  align = "start",
  direction = "horizontal",
  className,
  ...props
}: RadioGroupProps) {
  const { hexoLog } = useHexo();
  const hasChildren = children != null && Children.count(children) > 0;
  const hasOptions = !!options?.length;

  if (!hasChildren && !hasOptions) {
    return null;
  }

  if (hasOptions && !hasChildren && !areOptionValuesUnique(options)) {
    hexoLog.error("[RadioGroup] Duplicate option value in group:", options);
    return null;
  }

  if (!props["aria-label"] && !props["aria-labelledby"]) {
    hexoLog.warn("[RadioGroup] Provide aria-label or aria-labelledby for accessibility.");
  }

  const content = hasChildren
    ? renderChildrenContent({
        name,
        variant,
        size,
        align,
        children: children,
      })
    : renderOptionsContent({
        name,
        variant,
        size,
        align,
        options: options || [],
      });

  return (
    <div
      className={cx(
        "radiogroup",
        `radiogroup--${direction}`,
        `radiogroup--${variant}`,
        className,
      )}
      role="radiogroup"
      {...props}
    >
      {content}
    </div>
  );
}

export default RadioGroup;
