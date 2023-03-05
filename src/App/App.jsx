import PropTypes from "prop-types";
import clsx from "clsx";
import "./App.css";
import { useEffect, useState } from "react";
import { Input } from "../components/Input";
import { Checkbox } from "../components/Checkbox";
import { Button } from "../components/Button";
import { TodoCard } from "../components/TodoCard";
import { PopupDelete } from "../components/PopupDelete";
import { EditableButton } from "../components/EditableButton";

export const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [check, setCheck] = useState(false);
  const [onDelete, setOnDelete] = useState(false);
  const [onDeleted, setOnDeleted] = useState(true);
  const [newValue, setNewValue] = useState("");
  const [done, onDoneChange] = useState(false);

  const onSave = async () => {
    return true;
  };

  useEffect(() => {
    return () => setOnDelete(false);
  }, [onDeleted]);

  return (
    <div className="App">
      <Input
        type="text"
        value={inputValue}
        onChange={setInputValue}
        placeholder="Placeholder"
      />
      <div className="row">
        <Checkbox checked={check} onChange={setCheck}>
          Done
        </Checkbox>
        <Button>Button</Button>
        <Button variant="text">Cancel</Button>
        <Button variant="icon" icon="more" size="small" />
        <Button variant="icon" icon="close" size="medium" />
        <Button variant="icon" icon="add" size="large" />
        <Button variant="danger">Button</Button>
        <Button variant="dashed" icon="add">
          Button
        </Button>
      </div>
      {onDeleted && (
        <TodoCard
          title="Title"
          text="Lorem ipsum dolor sit amet consectetur. Hendrerit metus etiam in sed vulputate tellus diam dui. "
          onDelete={() => setOnDelete(!onDelete)}
          onEdit={() => undefined}
          done={done}
          onDoneChange={onDoneChange}
          tags={[]}
        />
      )}
      {onDelete && (
        <PopupDelete
          onDeleted={() => setOnDeleted(!onDeleted)}
          title="Do you really want to delete this task?"
        />
      )}
      <EditableButton
        icon="add"
        value={newValue}
        onChange={setNewValue}
        onSave={onSave}
      >
        add new task
      </EditableButton>
    </div>
  );
};
