import classNames from "classnames";
import React from "react";
import styles from "./index.module.scss";
import Icon from "../Icon";

export interface ICheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  checkBoxPosition?: "center" | "end" | "start";
  variant?: "check" | "half";
}

const Checkbox: React.FC<ICheckboxProps> = ({
  checkBoxPosition = "center",
  variant = "check",
  children,
  ...props
}) => {
  const classname = classNames(styles.checkbox, props.className);
  const uniqueid = React.useId();

  return (
    <>
      <input type="checkbox" id={uniqueid} className={classname} {...props} />
      <label className={`align-items-${checkBoxPosition}`} htmlFor={uniqueid}>
        <span className={styles.checkedIcon}>
          <Icon
            name={variant == "check" ? "Check" : "Maximize"}
            size={20}
            className={styles.iconColor}
          />
        </span>
        {children}
      </label>
    </>
  );
};

export default Checkbox;
