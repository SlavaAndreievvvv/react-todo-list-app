import PropTypes from "prop-types";
import clsx from "clsx";
import { useState } from "react";
import styles from "./Card.module.css";
import { Button } from "../Button";
import { ColorDot } from "../ColorDot";
import { Checkbox } from "../Checkbox";
import { PopupDelete } from "../PopupDelete";
import { Popover } from "../Popover";

export const Card = ({ text, title }) => {
  const [check, setCheck] = useState(false);
  // const [isCardVisible, setIsCardVisible] = useState(true);
  // // const onDelete = () => setIsCardVisible(!isCardVisible);
  // // // const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  // // // const togglePopover = () => setIsPopoverVisible(!isPopoverVisible);
  // // const [isPopupVisible, setIsPopupVisible] = useState(false);
  // // const openPopup = () => setIsPopupVisible(!isPopupVisible);
  // // const [onClosePopup, setonClosePopup] = useState(true);
  // // const onClose = () => setonClosePopup(!onClosePopup);

  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const togglePopover = () => setIsPopoverVisible(!isPopoverVisible);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <p className={styles.cardTitle}>{title}</p>
        <Button
          onClick={togglePopover}
          variant="icon"
          icon="more"
          size="small"
        />
      </div>
      <div className={styles.popoverWrapper}>
        {isPopoverVisible && <Popover onClosePopover={togglePopover} />}
      </div>
      <p className={check ? styles.cardTextCheck : styles.cardText}>{text}</p>
      <div className={styles.cardFooter}>
        <div className={styles.cardColorWrapper}>
          <ColorDot className={styles.cardColor} color="#bcb9ff" />
          <ColorDot className={styles.cardColor} color="#76b6ff" />
          <ColorDot className={styles.cardColor} color="#ff9960" />
          <ColorDot className={styles.cardColor} color="#a0ec83" />
        </div>
        <Checkbox
          className={styles.cardCheckbox}
          checked={check}
          onChange={setCheck}
        >
          Done
        </Checkbox>
      </div>
    </div>
  );
};

Card.propTypes = {
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
