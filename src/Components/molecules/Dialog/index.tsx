import classNames from "classnames";
import React from "react";
import Box from "../../atoms/Box";
import BackDrop from "../../atoms/BackDrop";
import styles from "./index.module.scss";

export interface IDialogProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "sm" | "lg";
  escapeIcon?: boolean;
  position?:
    | "center"
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";
  closeOnEsc?: boolean;
  closeOnClick?: boolean;
  visible: boolean;
  onClose: Function;
  onComplete?: Function;
}

const Dialog: React.FC<IDialogProps> = ({
  variant = "sm",
  position = "center",
  visible = false,
  closeOnEsc = true,
  closeOnClick = true,
  escapeIcon = true,
  children,
  onClose,
  ...props
}: IDialogProps) => {
  const classname = classNames(
    styles.container,
    props.className,
    styles[variant]
  );

  return (
    <BackDrop
      onClose={onClose}
      closeOnClick={closeOnClick}
      closeOnEsc={closeOnEsc}
      visible={visible}
      position={position}
    >
      <Box
        className={classname}
        onClick={(e: any) => {
          e.stopPropagation();
        }}
      >
        {children}
      </Box>
    </BackDrop>
  );
};

export default Dialog;
