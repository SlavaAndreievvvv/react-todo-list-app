import clsx from "clsx";
import PropTypes from "prop-types";
import styles from "./ColorDot.module.css";

export const ColorDot = ({ className, variant }) => {
  return (
    <div className={clsx(className, styles[variant], styles.container)}></div>
  );
};

ColorDot.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(["purple", "blue", "orange", "green"]).isRequired,
};
