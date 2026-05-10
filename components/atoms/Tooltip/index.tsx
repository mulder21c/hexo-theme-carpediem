import classNames from "classnames/bind";
import React, { createContext, useContext, useId } from "react";
import styles from "./index.module.scss";
import type { TooltipConfig, TooltipContentProps, TooltipProps } from "./type";

const cx = classNames.bind(styles);

const TooltipContext = createContext<TooltipConfig>({
  triggerId: "",
  placement: "top",
  alignment: "center",
  purpose: "description",
});

function Tooltip({
  id,
  triggerId,
  placement,
  alignment,
  purpose = "description",
  className,
  children,
  ...props
}: TooltipProps) {
  const tooltipId = useId();

  const values = {
    triggerId,
    placement,
    alignment,
    tooltipId: id || tooltipId,
    purpose,
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
  const { tooltipId, purpose } = useContext(TooltipContext);

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          const ariaProps =
            purpose === "description"
              ? { "aria-describedby": tooltipId }
              : { "aria-labelledby": tooltipId };
          return React.cloneElement(child, {
            ...ariaProps,
          } as Partial<React.HTMLAttributes<HTMLElement>>);
        }
        return child;
      })}
    </>
  );
}

function Content({ className, children, ...props }: TooltipContentProps) {
  const { triggerId, tooltipId, placement, alignment, purpose } =
    useContext(TooltipContext);

  const isVertical = placement === "top" || placement === "bottom";
  const isHorizontal = placement === "left" || placement === "right";
  const isLabelPurpose = purpose === "label";

  return (
    <span
      id={tooltipId}
      role="tooltip"
      data-component="tooltip"
      data-trigger={triggerId}
      data-placement={placement}
      data-alignment={alignment}
      data-purpose={purpose}
      className={[
        cx(
          "tooltip",
          { ["tooltip--vertical"]: isVertical },
          { ["tooltip--horizontal"]: isHorizontal },
          className,
        ),
        isLabelPurpose ? "visually-hidden" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      {...(isLabelPurpose ? {} : { hidden: true })}
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
