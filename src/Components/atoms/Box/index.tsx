import styles from "./index.module.scss";
import classNames from "classnames";
import React, { CSSProperties } from "react";

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  style?: CSSProperties;
}

const Box: React.FC<BoxProps> = ({ children, style, ...props }: BoxProps) => {
  const className = classNames(styles.container, props.className);

  return (
    <div {...props} className={className} style={style}>
      {children}
    </div>
  );
};

export default Box;
