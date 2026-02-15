import { useHexo } from "@context/HexoContext";
import classNames from "classnames/bind";
import { useId } from "react";
import styles from "./index.module.scss";
import type { CheckboxProps } from "./type.d.ts";

const cx = classNames.bind(styles);

function Checkbox({
  id,
  name,
  label,
  size = "medium",
  className,
  children,
  disabled,
  checked,
  ...props
}: CheckboxProps) {
  const { hexoLog } = useHexo();
  const uid = useId();

  if (!label && !children) {
    hexoLog.warn(
      '[Checkbox] Either "label" or "children" prop must be provided for accessibility.',
    );
    return null;
  }

  const checkboxId = id || uid;
  const labelContent = children || label || "";
  const ariaLabel = children && label ? label : undefined;

  return (
    <span className={cx("checkbox", `checkbox--${size}`, className)}>
      <label htmlFor={checkboxId}>
        <input
          id={checkboxId}
          type="checkbox"
          name={name}
          className={cx("checkbox__input")}
          aria-label={ariaLabel}
          disabled={disabled}
          defaultChecked={checked}
          {...props}
        />
        <span className={cx("checkbox__label")}>{labelContent}</span>
      </label>
    </span>
  );
}

export default Checkbox;
