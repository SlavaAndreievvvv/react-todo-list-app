import PropTypes from "prop-types";
import clsx from "clsx";
import styles from "./Popover.module.css";
import { useState, useRef, useEffect } from "react";

export const Popover = ({ className, onClosePopover, onClick }) => {
  const wrapperRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      onClosePopover();
    }
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleOutsideClick);
    return () => {
      document.removeEventListener("mouseup", handleOutsideClick);
    };
  }, []);
  return (
    <div ref={wrapperRef} className={clsx(styles.popover, className)}>
      <button className={styles.popoverText}>Edit</button>
      <button className={styles.popoverText} onClick={onClick}>
        Delete
      </button>
    </div>
  );
};
Popover.propTypes = {
  className: PropTypes.string,
  onClosePopover: PropTypes.func.isRequired,
};
