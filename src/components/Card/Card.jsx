import PropTypes from "prop-types";
import clsx from "clsx";
import { useState } from "react";
import styles from "./Card.module.css";
import { Button } from "../Button";
import { ColorDot } from "../ColorDot";
import { Checkbox } from "../Checkbox";

export const Card = ({ text, title, onDelete }) => {
  const [check, setCheck] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <p className={styles.cardTitle}>{title}</p>
        <div className={styles.wrapperButton}>
          <Button
            className={styles.cardButton}
            variant="icon"
            icon="pencil"
            size="small"
          />
          <Button
            className={styles.cardButton}
            onClick={onDelete}
            variant="icon"
            icon="trash"
            size="small"
          />
        </div>
      </div>
      <div className={styles.popoverWrapper}></div>
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
  onDelete: PropTypes.func,
};
