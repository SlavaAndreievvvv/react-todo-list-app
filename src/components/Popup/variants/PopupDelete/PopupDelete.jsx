import clsx from "clsx";
import PropTypes from "prop-types";
import styles from "./PopupDelete.module.css";
import { Popup } from "../../Popup";
import { useState } from "react";
import { Button } from "../../../Button";

export const PopupDelete = ({ onClick }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const closePopup = () => setIsPopupVisible(!isPopupVisible);
  return (
    isPopupVisible && (
      <Popup>
        <div className={styles.container}>
          <Button
            onClick={closePopup}
            className={styles.buttonClose}
            variant="icon"
            icon="close"
            size="medium"
          />
          <p className={styles.popupText}>
            Do you really want to delete this task?
          </p>
          <div className={styles.buttonWrapper}>
            <button
              className={clsx(styles.button, styles.buttonNo)}
              onClick={closePopup}
            >
              No
            </button>
            <button
              className={clsx(styles.button, styles.buttonYes)}
              onClick={onClick}
            >
              Yes
            </button>
          </div>
        </div>
      </Popup>
    )
  );
};

PopupDelete.propTypes = {
  onClick: PropTypes.func.isRequired,
};
