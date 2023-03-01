import clsx from "clsx";
import PropTypes from "prop-types";
import styles from "./Checkbox.module.css";
import { Icon } from "../Icon";

export const Checkbox = ({ className, checked, onChange, children }) => {
  return (
    <label className={clsx(styles.checkbox, className)}>
      <input
        type="checkbox"
        className={styles.checkboxInput}
        checked={checked}
        onChange={() => onChange(!checked)}
      />
      <span className={styles.checkboxButton}>
        <span className={styles.checkboxIcon}>
          <Icon name="checkbox" width={11} height={9} fill="white" />
        </span>
      </span>
      <span className={styles.checkboxText}>{children}</span>
    </label>
  );
};

Checkbox.propTypes = {
  className: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  children: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
