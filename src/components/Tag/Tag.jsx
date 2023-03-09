import clsx from "clsx";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Button } from "../Button";
import { ColorDot } from "../ColorDot";
import { Input } from "../Input";
import styles from "./Tag.module.css";
import { useEditable } from "../../hooks/useEditable";

export const Tag = ({
  className,
  children,
  onClick,
  active,
  color,
  onSave,
  onDelete,
  isEditable,
}) => {
  const {
    inputRef,
    isInputActive,
    handleSave,
    onChange,
    value,
    setIsInputActive,
  } = useEditable({
    onSave,
  });

  useEffect(() => {
    onChange(children);
  }, [children]);

  const renderEditableButton = () => {
    if (isEditable && isInputActive) {
      return (
        <Input
          size="small"
          className={styles.input}
          ref={inputRef}
          onBlur={handleSave}
          value={value}
          onChange={onChange}
          onEnterPress={handleSave}
        />
      );
    }
    if (isEditable && !isInputActive) {
      return (
        <div className={styles.actions}>
          <Button
            onClick={() => setIsInputActive(true)}
            className={styles.actionsButton}
            variant="icon"
            icon="pencil"
            size="small"
          />
          <Button
            className={styles.actionsButton}
            onClick={onDelete}
            variant="icon"
            icon="trash"
            size="small"
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className={clsx(styles.container, { [styles.active]: active, className })}
    >
      <div className={styles.inner}>
        <ColorDot className={styles.color} color={color} />
        <button
          aria-label="tag-button"
          className={styles.button}
          onClick={onClick}
        />
        <span className={styles.text}>{children}</span>
      </div>
      {renderEditableButton()}
    </div>
  );
};

Tag.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.string.isRequired,
  active: PropTypes.bool,
  color: PropTypes.string.isRequired,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
  isEditable: PropTypes.bool,
};
