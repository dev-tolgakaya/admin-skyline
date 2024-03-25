import React from "react";
import { ReactComponent as Transactions } from "../../../assets/icons/transactions.svg";
import { ReactComponent as Graphy } from "../../../assets/icons/graph.svg";
import { ReactComponent as Category } from "../../../assets/icons/category.svg";
import { ReactComponent as Mail } from "../../../assets/icons/mail.svg";
import { ReactComponent as Help } from "../../../assets/icons/help.svg";
import { ReactComponent as Check } from "../../../assets/icons/check.svg";
import { ReactComponent as Maximize } from "../../../assets/icons/maximize.svg";
import { ReactComponent as Close } from "../../../assets/icons/close.svg";
import { ReactComponent as Warning } from "../../../assets/icons/warning.svg";
import { ReactComponent as HorizontalAlignLeft } from "../../../assets/icons/horizontal-align-left.svg";

export interface IconProps {
  name: string;
  alt?: string;
  size?: number;
  height?: number;
  className?: any;
  onClick?: any;
  fill?: any;
  constantIcon?: boolean;
  role?: string;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  height,
  constantIcon,
  fill,
  className,
  role,
  ...props
}) => {
  const icons = {
    Transactions: Transactions,
    Graphy: Graphy,
    Category: Category,
    Mail: Mail,
    Help: Help,
    Check: Check,
    Maximize: Maximize,
    Close: Close,
    Warning: Warning,
    HorizontalAlignLeft: HorizontalAlignLeft,
  };

  const IconComponent = icons[name];
  return (
    <IconComponent
      width={size}
      height={height ? height : size}
      fill={constantIcon ? null : fill}
      className={className}
      role={role}
      {...props}
    />
  );
};

export default Icon;
