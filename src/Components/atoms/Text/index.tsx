import classNames from "classnames";
import React from "react";
import styles from "./index.module.scss";

export type Variant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
export type Size =
  | "display-l"
  | "display-m"
  | "heading-l"
  | "heading-m"
  | "heading-s"
  | "heading-xs"
  | "button-basic"
  | "button-link"
  | "subtitle-l"
  | "subtitle-m"
  | "subtitle-s"
  | "body-500"
  | "body-400"
  | "body-s"
  | "caption-400"
  | "caption-600"
  | "caption-badge";

export interface ITextProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
  size?: Size;
  color?: string;
}

const Text: React.FC<ITextProps> = ({
  variant,
  size,
  children,
  className = "",
  color,
  ...props
}: ITextProps) => {
  const Element: keyof JSX.IntrinsicElements = variant ?? "p";

  const style = props.style ?? {};

  if (color) {
    style.color = `var(--bs-${color})`;
  }

  return (
    <Element
      {...props}
      style={style}
      className={classNames(className, size && styles[size])}
    >
      {children}
    </Element>
  );
};

export default Text;
