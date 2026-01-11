import classNames from "classnames/bind";
import React, { createContext, useContext, useId } from "react";
import styles from "./index.module.scss";
import type { TooltipConfig, TooltipContentProps, TooltipProps } from "./type";

const cx = classNames.bind(styles);

const TooltipContext = createContext<TooltipConfig>({
  triggerId: "",
  placement: "top",
  alignment: "center",
});

function Tooltip({
  triggerId,
  placement,
  alignment,
  className,
  children,
  ...props
}: TooltipProps) {
  const tooltipId = useId();

  const values = {
    triggerId,
    placement,
    alignment,
    tooltipId,
  };

  return (
    <TooltipContext.Provider value={values}>
      <span className={cx("tooltip__container", className)} {...props}>
        {children}
      </span>
    </TooltipContext.Provider>
  );
}

function Trigger({
  children,
}: React.PropsWithChildren<React.HTMLAttributes<HTMLSpanElement>>) {
  const { tooltipId } = useContext(TooltipContext);

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            "aria-describedby": tooltipId,
          } as Partial<React.HTMLAttributes<HTMLElement>>);
        }
        return child;
      })}
    </>
  );
}

function Content({ className, children, ...props }: TooltipContentProps) {
  const { triggerId, tooltipId, placement, alignment } = useContext(TooltipContext);

  const isVertical = placement === "top" || placement === "bottom";
  const isHorizontal = placement === "left" || placement === "right";

  return (
    <span
      id={tooltipId}
      role="tooltip"
      data-component="tooltip"
      data-trigger={triggerId}
      data-placement={placement}
      data-alignment={alignment}
      className={cx(
        "tooltip",
        { ["tooltip--vertical"]: isVertical },
        { ["tooltip--horizontal"]: isHorizontal },
        className,
      )}
      hidden
      {...props}
    >
      {children}
      <span className={cx("tooltip__arrow")} data-arrow aria-hidden="true" />
    </span>
  );
}

Tooltip.Trigger = Trigger;
Tooltip.Content = Content;

export default Tooltip;
