import React from "react";
import classNames from "classnames/bind";
import styles from "@/styles/css-modules-map.json";
import type { ButtonProps } from "./Button";

const cx = classNames.bind(styles["/components/atoms/Buttons/index.module"]);

function DefaultButton({
  type = "button",
  size = "medium",
  appearance = "fill",
  className,
  children,
  ...remainProps
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cx(
        "btn-basic",
        `btn-basic--${size}`,
        `btn-basic--${appearance}`,
        className,
      )}
      {...remainProps}
    >
      {children}
    </button>
  );
}

export default DefaultButton;
