import PropTypes from "prop-types";
import clsx from "clsx";
import { useState } from "react";
import styles from "./TodoCard.module.css";
import { Button } from "../Button";
import { ColorDot } from "../ColorDot";
import { Checkbox } from "../Checkbox";

export const TodoCard = ({
  text,
  title,
  tags,
  onDelete,
  onEdit,
  done,
  onDoneChange,
}) => {
  return (
    <div className={clsx(styles.card, { [styles.done]: done })}>
      <div className={styles.cardHeader}>
        <p className={styles.cardTitle}>{title}</p>
        <div className={styles.wrapperButton}>
          <Button
            onClick={onEdit}
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
      <p className={styles.cardText}>{text}</p>
      <div className={styles.cardFooter}>
        <div className={styles.cardColorWrapper}>
          {tags.map(({ color, id }) => (
            <ColorDot className={styles.color} key={id} color={color} />
          ))}
        </div>
        <Checkbox
          className={styles.cardCheckbox}
          checked={done}
          onChange={onDoneChange}
        >
          Done
        </Checkbox>
      </div>
    </div>
  );
};

TodoCard.propTypes = {
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDoneChange: PropTypes.func.isRequired,
  done: PropTypes.bool.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      color: PropTypes.string.isRequired,
    })
  ),
};

TodoCard.defaultTypes = {
  tags: [],
};
