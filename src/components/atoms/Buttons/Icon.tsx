import React, { useId } from "react";
import FeatherIcon from "feather-icons-react";
import classNames from "classnames/bind";
import styles from "@/styles/css-modules-map.json";
import type { IconButtonProps } from "./Button";

const cx = classNames.bind(styles["/components/atoms/Buttons/index.module"]);

function IconButton({
  id,
  label,
  type = "button",
  size = "medium",
  appearance = "fill",
  icon,
  stroke = "medium",
  className,
  ...remainProps
}: IconButtonProps) {
  const uid = useId();
  const cid = id ?? uid;

  return (
    <button
      id={cid}
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={cx(
        "btn",
        "btn-icon",
        `btn-icon--${size}`,
        `btn-icon--${appearance}`,
        className,
      )}
      {...remainProps}
    >
      <span id={`btn-label-${cid}`} className={cx("btn-icon__label")}>
        {label}
      </span>
      <FeatherIcon
        icon={icon}
        className={cx("btn-icon__icon", `btn-icon__icon--${stroke}`)}
      />
    </button>
  );
}

export default IconButton;
