import PropTypes from "prop-types";
import clsx from "clsx";
import styles from "./Popover.module.css";
import { useState } from "react";

export const Popover = ({ className }) => {
  return (
    <div className={clsx(styles.popover, className)}>
      <button className={styles.popoverText}>Edit</button>
      <button className={styles.popoverText}>Delete</button>
    </div>
  );
};
Popover.propTypes = {
  className: PropTypes.string,
};
