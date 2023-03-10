import clsx from "clsx";
import PropTypes from "prop-types";
import styles from "./PopupDelete.module.css";
import { Popup } from "../Popup";
import { useState } from "react";
import { Button } from "../Button";

export const PopupDelete = ({ title, onDelete, onClose }) => {
  return (
    <Popup>
      <div className={styles.container}>
        <Button
          onClick={onClose}
          className={styles.buttonClose}
          variant="icon"
          icon="close"
          size="medium"
        />
        <p className={styles.popupText}>{title}</p>
        <div className={styles.buttonWrapper}>
          <Button
            variant="text"
            className={clsx(styles.button)}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            className={clsx(styles.button)}
            onClick={onDelete}
          >
            Delete
          </Button>
        </div>
      </div>
    </Popup>
  );
};

PopupDelete.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.node,
};

PopupDelete.defaultTypes = {
  title: "Do you really want to delete this task?",
};
