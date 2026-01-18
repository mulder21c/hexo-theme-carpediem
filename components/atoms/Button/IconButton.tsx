import Tooltip from "@components/atoms/Tooltip";
import classNames from "classnames/bind";
import FeatherIcon from "feather-icons-react";
import { useId } from "react";
import styles from "./index.module.scss";
import type { IconButtonProps } from "./type";

const cx = classNames.bind(styles);

function IconButton({
  id,
  type = "button",
  variant = "contained",
  color = "primary",
  size = "medium",
  className,
  icon,
  stroke = "medium",
  label,
  placement = "right",
  alignment = "center",
  ...props
}: IconButtonProps) {
  const uid = useId();

  const triggerId = id || uid;

  return (
    <Tooltip triggerId={triggerId} placement={placement} alignment={alignment}>
      <Tooltip.Trigger>
        <button
          id={triggerId}
          type={type}
          className={cx(
            "btn",
            "btn-icon",
            { [`btn--${variant}`]: variant },
            { [`btn--${color}`]: color },
            { [`btn-icon--${size}`]: size },
            className,
          )}
          {...props}
        >
          <FeatherIcon
            icon={icon}
            width={undefined}
            height={undefined}
            className={cx("btn-icon__icon", { [`btn-icon__icon--${stroke}`]: stroke })}
          />
        </button>
      </Tooltip.Trigger>
      <Tooltip.Content>{label}</Tooltip.Content>
    </Tooltip>
  );
}

export default IconButton;
