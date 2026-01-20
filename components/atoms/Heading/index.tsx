import classNames from "classnames/bind";
import React from "react";
import styles from "./index.module.scss";
import type { HeadingProps } from "./type";

const cx = classNames.bind(styles);

function Heading({ level, children, className, ...props }: HeadingProps) {
  const Component = `h${level}` as React.ElementType;

  return (
    <Component className={cx("heading", `heading--level-${level}`, className)} {...props}>
      {children}
    </Component>
  );
}

export default Heading;
