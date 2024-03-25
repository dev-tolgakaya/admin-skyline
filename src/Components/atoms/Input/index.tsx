import React, {
  FC,
  FocusEventHandler,
  InputHTMLAttributes,
  useState,
} from "react";
import classNames from "classnames";
import styles from "./index.module.scss";
import Icon from "../Icon";
import Text from "../Text";

export interface IInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  className?: string;
  placeholder?: string;
  icon?: string;
  iconClick?: React.MouseEventHandler<HTMLImageElement>;
  iconEnd?: string;
  iconEndClick?: React.MouseEventHandler<HTMLImageElement>;
  size?: "sm" | "md" | "lg" | "xl" | "fullWidth";
  label?: string;
  iconSize?: number;
  error?: boolean;
  fieldMsg?: string;
  validationError?: boolean;
  validationErrorMsg?: string;
  success?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
}

const Input: FC<IInputProps> = ({
  placeholder,
  className,
  icon,
  iconClick,
  iconEnd,
  iconEndClick,
  size = "md",
  label,
  iconSize,
  error,
  success,
  fullWidth,
  disabled,
  fieldMsg,
  validationError,
  validationErrorMsg,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputContainerClass = classNames(styles.inputContainer, className, {
    [styles.fullWidth]: fullWidth,
    [styles[size]]: size,
    [styles.error]: error,
    [styles.succes]: success,
  });

  const handleInputFocus: FocusEventHandler<HTMLInputElement> = () => {
    setIsFocused(true);
  };

  const handleInputBlur: FocusEventHandler<HTMLInputElement> = () => {
    setIsFocused(false);
  };

  return (
    <div className={inputContainerClass}>
      {label && (
        <div className={styles.label}>
          <Text size="subtitle-s">{label}</Text>
        </div>
      )}
      {icon && (
        <Icon
          data-testid="icon-left"
          name={icon}
          className={classNames(styles.icon, {
            [styles.disabled]: disabled,
            [styles.success]: success,
            [styles.error]: error,
            [styles.hasLabel]: label,
          })}
          size={20}
        />
      )}
      <input
        className={classNames(
          styles.input,
          icon && styles.withStartIcon,
          iconEnd && styles.withEndIcon,
          {
            [styles.disabled]: disabled,
            [styles.success]: success,
            [styles.error]: error,
            [styles.validationError]: validationError,
          }
        )}
        type="text"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        disabled={disabled}
        {...props}
      />

      {iconEnd && (
        <Icon
          name={iconEnd}
          className={classNames(styles.iconEnd, {
            [styles.disabled]: disabled,
            [styles.success]: success,
            [styles.error]: error,
            [styles.hasLabel]: label,
            [styles.hasValidationError]: validationError,
          })}
          onClick={iconEndClick}
          size={16}
        />
      )}
      {fieldMsg && (
        <Text
          className={classNames(styles.fieldMsg, {
            [styles.disabled]: disabled,
            [styles.focus]: isFocused,
          })}
          size="caption-400"
        >
          {fieldMsg}
        </Text>
      )}
      {validationError && (
        <Text className={styles.validationErrorMsg} size="caption-400">
          {validationErrorMsg}
        </Text>
      )}
    </div>
  );
};

export default Input;
