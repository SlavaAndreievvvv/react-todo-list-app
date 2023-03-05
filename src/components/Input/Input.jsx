import clsx from "clsx";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import styles from "./Input.module.css";

export const Input = forwardRef(
  (
    {
      className,
      value,
      onChange,
      disabled,
      placeholder,
      id,
      name,
      type,
      size,
      onBlur,
    },
    ref
  ) => {
    return (
      <input
        ref={ref}
        placeholder={placeholder}
        type={type}
        className={clsx(className, styles.input, styles[size])}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        id={id}
        name={name}
        onBlur={onBlur}
      />
    );
  }
);

Input.propTypes = {
  value: PropTypes.string.isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.oneOf(["large", "small"]),
  onBlur: PropTypes.func,
};

Input.defaultProps = {
  size: "large",
};
