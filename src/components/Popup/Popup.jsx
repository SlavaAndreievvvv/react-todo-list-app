import clsx from "clsx";
import PropTypes from "prop-types";
import styles from "./Popup.module.css";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Popup = ({ className, children }) => {
  useEffect(() => {
    document.documentElement.classList.add("open-popup");
    return () => {
      document.documentElement.classList.remove("open-popup");
    };
  }, []);
  return (
    <div className={styles.container}>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className={clsx(styles.card, className)}
      >
        {children}
      </motion.div>
    </div>
  );
};

Popup.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
