import clsx from "clsx";
import PropTypes from "prop-types";
import styles from "./Input.module.css";

export const Input = ({ className, value, onChange, disabled }) => {
  return (
    <input
      placeholder="Placeholder"
      type="text"
      className={clsx(className, styles.input)}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    />
  );
};

Input.propTypes = {
  value: PropTypes.string.isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};
