import { useHexo } from "@context/HexoContext";
import classNames from "classnames/bind";
import FeatherIcon from "feather-icons-react";
import styles from "./index.module.scss";
import type { TextFieldProps } from "./type.d.ts";

const cx = classNames.bind(styles);
const TEXTFIELD_ACCESSIBILITY_WARNING =
  "[TextField] Provide id, aria-label, or aria-labelledby for accessibility.";

function TextField({
  id,
  type = "text",
  variant = "outlined",
  size = "medium",
  icon,
  className,
  disabled,
  readOnly,
  value,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  ...props
}: TextFieldProps) {
  const { hexoLog } = useHexo();

  if (!id && !ariaLabel && !ariaLabelledby) {
    hexoLog.warn(TEXTFIELD_ACCESSIBILITY_WARNING);
  }

  return (
    <span
      className={cx(
        "textfield",
        `textfield--${variant}`,
        `textfield--${size}`,
        {
          "textfield--with-icon": Boolean(icon),
          "textfield--disabled": disabled,
          "textfield--readonly": readOnly,
        },
        className,
      )}
    >
      <span className={cx("textfield__field")}>
        {icon ? (
          <FeatherIcon
            icon={icon}
            aria-hidden="true"
            focusable="false"
            className={cx("textfield__icon")}
          />
        ) : null}
        <input
          id={id}
          type={type}
          className={cx("textfield__input")}
          disabled={disabled}
          readOnly={readOnly}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          defaultValue={value}
          {...props}
        />
      </span>
    </span>
  );
}

export default TextField;
