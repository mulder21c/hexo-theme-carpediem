import React, { useId } from "react";
import FeatherIcon from "feather-icons-react";
import classNames from "classnames/bind";
import Tooltip from "@/components/atoms/Tooltip";
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
  triggerType = "hover",
  placement = "right",
  alignment = "center",
  className,
  ...remainProps
}: IconButtonProps) {
  const uid = useId();
  const labelUid = useId();
  const cid = id ?? uid;

  return (
    <Tooltip
      triggerId={cid}
      placement={placement}
      alignment={alignment}
      triggerType={triggerType}
    >
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
        aria-labelledby={labelUid}
        {...remainProps}
      >
        <Tooltip.Content id={labelUid}>
          <span className={cx("btn-icon__label")}>{label}</span>
        </Tooltip.Content>
        <FeatherIcon
          icon={icon}
          className={cx("btn-icon__icon", `btn-icon__icon--${stroke}`)}
        />
      </button>
    </Tooltip>
  );
}

export default IconButton;
