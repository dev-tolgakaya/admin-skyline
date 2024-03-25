import React, { useMemo } from "react";
import classNames from "classnames";
import styles from "./index.module.scss";
import Text, { Size } from "../Text";
import Icon, { IconProps } from "../Icon";

type ButtonSize = "sm" | "md" | "lg";

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary";
  btnClassName?: string;
  icon?: IconProps["name"];
  iconSize?: number;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  fullWidth?: boolean;
  size?: ButtonSize;
  btnTextSize?: Size;
}

const Button: React.FC<IButtonProps> = ({
  variant = "primary",
  btnClassName,
  icon,
  iconSize = 18,
  iconPosition = "left",
  children,
  disabled = false,
  fullWidth = false,
  size = "md",
  btnTextSize = variant == "tertiary" ? "button-link" : "button-basic",
  ...props
}) => {
  const className = classNames(
    styles.container,
    styles[variant],
    styles[size],
    {
      [styles.fullWidth]: fullWidth,
      [styles.disabled]: disabled,
    },
    btnClassName
  );

  const renderIcon = useMemo(
    () =>
      icon && <Icon name={icon} size={iconSize} className={styles.iconColor} />,
    [icon, iconSize, iconPosition]
  );

  return (
    <button className={className} disabled={disabled} {...props}>
      <div className={styles.btnInside}>
        {iconPosition === "left" && renderIcon}
        <Text className={styles.text} size={btnTextSize}>
          {children}
        </Text>
        {iconPosition === "right" && renderIcon}
      </div>
    </button>
  );
};

export default Button;
