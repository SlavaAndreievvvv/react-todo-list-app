import clsx from "clsx";
import PropTypes from "prop-types";
import styles from "./ColorDot.module.css";

export const ColorDot = ({ className, color }) => {
  return (
    <div
      style={{ backgroundColor: color }}
      className={clsx(className, styles.container)}
    ></div>
  );
};

ColorDot.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string.isRequired,
};
