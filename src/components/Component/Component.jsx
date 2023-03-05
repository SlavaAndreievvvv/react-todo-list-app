import clsx from "clsx";
import PropTypes from "prop-types";
import styles from "./Component.module.css";

export const Component = ({ className }) => {
  return <div className={clsx(className)}></div>;
};

Component.propTypes = {
  className: PropTypes.string,
};
