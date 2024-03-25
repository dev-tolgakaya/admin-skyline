import classNames from "classnames";
import React, { useEffect } from "react";
import styles from "./index.module.scss";
import ReactDOM from "react-dom";

export interface IBackDropProps extends React.HTMLAttributes<HTMLDivElement> {
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
  visible?: boolean;
  closeOnClick?: boolean;
  closeOnEsc?: boolean;
  onClose?: Function;
}

const BackDrop: React.FC<IBackDropProps> = ({
  position = "center",
  visible = false,
  closeOnClick = true,
  closeOnEsc = true,
  children,
  ...props
}: IBackDropProps) => {
  const classname = classNames(
    styles.container,
    styles[position],
    props.className
  );

  const closeOnEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape" || event.key === "Esc") {
      props.onClose?.();
    }
  };

  const onClickHandler = () => {
    props.onClose?.();
  };

  useEffect(() => {
    if (visible) {
      if (closeOnEsc) {
        document.addEventListener("keydown", closeOnEscape);
      }
      document.getElementsByTagName("html")[0].style.overflow = "hidden";
      document.body.style.overflowY = "hidden!important";
    }
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.getElementsByTagName("html")[0].style.overflow = "unset";
      document.body.style.overflowY = "unset";
    };
  }, [visible]);

  if (typeof window !== "undefined") {
    return ReactDOM.createPortal(
      visible ? (
        <div
          {...props}
          onClick={closeOnClick ? onClickHandler : undefined}
          className={classname}
        >
          {children}
        </div>
      ) : null,
      document.body
    );
  }

  return null;
};

export default BackDrop;
