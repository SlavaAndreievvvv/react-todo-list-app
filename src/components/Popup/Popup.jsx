import clsx from "clsx";
import PropTypes from "prop-types";
import styles from "./Popup.module.css";

export const Popup = ({ className, children }) => {
  return (
    <div className={styles.container}>
      <div className={clsx(styles.card, className)}>{children}</div>
    </div>
  );
};

Popup.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
