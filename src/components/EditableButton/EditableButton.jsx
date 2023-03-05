import clsx from "clsx";
import PropTypes from "prop-types";
import { ICON_TYPES } from "../Icon";
import { Button } from "../Button";
import { Input } from "../Input";
import styles from "./EditableButton.module.css";
import { useEffect, useRef, useState } from "react";

export const EditableButton = ({
  className,
  icon,
  children,
  value,
  onChange,
  onSave,
}) => {
  const inputRef = useRef(null);
  const [isInputActive, setIsInputActive] = useState(false);

  const onBlur = async () => {
    const ok = await onSave();
    if (ok) {
      setIsInputActive(false);
      onChange("");
    }
  };

  useEffect(() => {
    if (inputRef && isInputActive) {
      inputRef.current.focus();
    }
  }, [inputRef, isInputActive]);

  return (
    <div className={clsx(className)}>
      {isInputActive ? (
        <Input
          ref={inputRef}
          onBlur={onBlur}
          value={value}
          onChange={onChange}
          size="small"
        />
      ) : (
        <Button
          onClick={() => setIsInputActive(!isInputActive)}
          fluid
          variant="dashed"
          icon={icon}
        >
          {children}
        </Button>
      )}
    </div>
  );
};

EditableButton.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.oneOf(ICON_TYPES),
  children: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
