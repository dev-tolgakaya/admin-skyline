import React, { useMemo } from "react";
import classNames from "classnames";
import styles from "./index.module.scss";
import Icon, { IconProps } from "../Icon";

type IconButtonSize = "xs" | "sm" | "md" | "lg";

export interface IIconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconBtnClassName?: string;
  icon?: IconProps["name"];
  disabled?: boolean;
  size?: IconButtonSize;
}

const IconButton: React.FC<IIconButtonProps> = ({
  iconBtnClassName,
  icon,
  disabled = false,
  size = "md",
  ...props
}) => {
  const className = classNames(
    styles.container,
    styles[size],
    {
      [styles.disabled]: disabled,
    },
    iconBtnClassName
  );

  const findIconSize = () => {
    switch (size) {
      case "xs":
        return 12;
      case "sm":
        return 16;
      case "md":
        return 20;
      case "lg":
        return 24;
      default:
        return 20;
    }
  };

  const renderIcon = useMemo(
    () =>
      icon && (
        <Icon name={icon} size={findIconSize()} className={styles.iconColor} />
      ),
    [icon]
  );

  return (
    <button className={className} disabled={disabled} {...props}>
      {renderIcon}
    </button>
  );
};

export default IconButton;
