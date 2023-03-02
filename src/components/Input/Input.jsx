import clsx from "clsx";
import PropTypes from "prop-types";
import styles from "./Input.module.css";

export const Input = ({
  className,
  value,
  onChange,
  disabled,
  placeholder,
  id,
  name,
  type,
}) => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      className={clsx(className, styles.input)}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      id={id}
      name={name}
    />
  );
};

Input.propTypes = {
  value: PropTypes.string.isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
};
