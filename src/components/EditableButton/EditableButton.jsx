import clsx from "clsx";
import PropTypes from "prop-types";
import { ICON_TYPES } from "../Icon";
import { Button } from "../Button";
import { Input } from "../Input";
import styles from "./EditableButton.module.css";
import { useEditable } from "../../hooks/useEditable";

export const EditableButton = ({ className, icon, children, onSave }) => {
  const { inputRef, isInputActive, onBlur, onChange, value, setIsInputActive } =
    useEditable({
      onSave,
      cleanAfterSuccess: true,
    });

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
          onClick={() => setIsInputActive(true)}
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
  onSave: PropTypes.func.isRequired,
};
