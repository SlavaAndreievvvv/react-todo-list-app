import { useEffect, useRef, useState } from "react";

export const useEditable = ({ cleanAfterSuccess, onSave }) => {
  const inputRef = useRef(null);
  const [isInputActive, setIsInputActive] = useState(false);
  const [value, setValue] = useState("");

  const handleSave = async () => {
    if (onSave) {
      const ok = await onSave(value);
      if (ok) {
        setIsInputActive(false);
      }
      if (ok && cleanAfterSuccess) {
        setValue("");
      }
    }
  };

  useEffect(() => {
    if (inputRef?.current && isInputActive) {
      inputRef.current.focus();
    }
  }, [inputRef, isInputActive]);

  return {
    handleSave,
    isInputActive,
    inputRef,
    onChange: setValue,
    value,
    setIsInputActive,
  };
};
