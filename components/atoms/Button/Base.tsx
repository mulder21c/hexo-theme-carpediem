import classNames from "classnames/bind";
import styles from "./index.module.scss";
import type { ButtonProps } from "./type";

const cx = classNames.bind(styles);

function Button({
  type = "button",
  variant = "contained",
  color = "primary",
  size = "medium",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cx(
        "btn",
        "btn-base",
        { [`btn--${variant}`]: variant },
        { [`btn--${color}`]: color },
        { [`btn-base--${size}`]: size },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
