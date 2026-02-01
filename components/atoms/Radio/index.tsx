import classNames from "classnames/bind";
import { useId } from "react";
import styles from "./index.module.scss";
import type { RadioProps } from "./type";

const cx = classNames.bind(styles);

function Radio({
  id,
  name,
  value,
  label,
  align = "start",
  variant = "native",
  size = "medium",
  className,
  children,
  disabled,
  checked,
  ...props
}: RadioProps) {
  const uid = useId();

  if (!label && !children) {
    console.warn(
      '[Radio] Either "label" or "children" prop must be provided for accessibility.',
    );
    return null;
  }

  const optionId = id || uid;
  const labelContent = children || label || "";
  const ariaLabel = children && label ? label : undefined;

  return (
    <span
      className={cx(
        "radio",
        `radio--${variant}`,
        `radio--${size}`,
        `radio--${align}`,
        className,
      )}
    >
      <label htmlFor={optionId}>
        <input
          id={optionId}
          type="radio"
          name={name}
          value={value}
          className={cx("radio__input")}
          aria-label={ariaLabel}
          disabled={disabled}
          defaultChecked={checked}
          {...props}
        />
        <span className={cx("radio__label")}>{labelContent}</span>
      </label>
    </span>
  );
}

export default Radio;
