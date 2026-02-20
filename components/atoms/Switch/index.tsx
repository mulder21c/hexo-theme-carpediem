import { useHexo } from "@context/HexoContext";
import classNames from "classnames/bind";
import { useId } from "react";
import styles from "./index.module.scss";
import type { SwitchProps } from "./type.d.ts";

const cx = classNames.bind(styles);

function Switch({
  id,
  name,
  label,
  size = "medium",
  className,
  disabled,
  checked,
  value,
  "aria-labelledby": ariaLabelledby,
  ...props
}: SwitchProps) {
  const { hexoLog } = useHexo();
  const uid = useId();

  if (!label && !ariaLabelledby) {
    hexoLog.warn(
      '[Switch] Either "label" or "aria-labelledby" prop must be provided for accessibility.',
    );
  }

  const switchId = id || uid;
  const resolvedAriaLabelledby = ariaLabelledby || undefined;
  const resolvedAriaLabel = !resolvedAriaLabelledby && label ? label : undefined;

  return (
    <span className={cx("switch", `switch--${size}`, className)}>
      <label htmlFor={switchId} className={cx("switch__wrapper")}>
        <input
          id={switchId}
          type="checkbox"
          role="switch"
          name={name}
          value={value}
          className={cx("switch__input")}
          aria-labelledby={resolvedAriaLabelledby}
          aria-label={resolvedAriaLabel}
          disabled={disabled}
          defaultChecked={checked}
          {...props}
        />
        <span className={cx("switch__track")} aria-hidden="true">
          <span className={cx("switch__thumb")} />
        </span>
      </label>
    </span>
  );
}

export default Switch;
