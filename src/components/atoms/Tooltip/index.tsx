import React, { createContext, useContext, useId, useMemo } from "react";
import classNames from "classnames/bind";
import styles from "@/styles/css-modules-map.json";
import type {
  TooltipConfig,
  TooltipContainerProps,
  TooltipContentProps,
  TooltipProps,
} from "./type";

const cx = classNames.bind(styles["/components/atoms/Tooltip/index.module"]);

const TooltipContext = createContext<TooltipConfig>({
  triggerId: "",
  triggerType: "hover",
  placement: "top",
  alignment: "center",
});

function Tooltip({
  triggerId,
  triggerType,
  placement,
  alignment,
  children,
}: TooltipProps) {
  const uid = useId();
  const cid = triggerId || uid;

  const values = useMemo(
    () => ({
      triggerId: cid,
      triggerType,
      placement,
      alignment,
    }),
    [cid, triggerType, placement, alignment],
  );

  return <TooltipContext.Provider value={values}>{children}</TooltipContext.Provider>;
}

function Container({ className, children, ...remainProps }: TooltipContainerProps) {
  return (
    <span className={cx("tooltip__container", className)} {...remainProps}>
      {children}
    </span>
  );
}

function Content({ className, children, ...remainProps }: TooltipContentProps) {
  const { triggerId, triggerType, placement, alignment } = useContext(TooltipContext);
  console.info(`[Context values]`, triggerId, triggerType, placement, alignment);

  return (
    <span
      role="tooltip"
      data-component="tooltip"
      data-trigger={triggerId}
      data-trigger-type={triggerType}
      data-placement={placement}
      data-alignment={alignment}
      className={cx("tooltip", className)}
      hidden
      {...remainProps}
    >
      {children}
      <span className={cx("tooltip__arrow")} data-arrow aria-hidden="true" />
    </span>
  );
}

Tooltip.Container = Container;
Tooltip.Content = Content;

export default Tooltip;
