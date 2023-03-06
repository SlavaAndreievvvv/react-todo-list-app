import PropTypes from "prop-types";
import clsx from "clsx";
import "./App.css";
import { useEffect, useState } from "react";
import {
  Input,
  Checkbox,
  Button,
  TodoCard,
  PopupDelete,
  EditableButton,
  Tag,
} from "../components";

export const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [check, setCheck] = useState(false);
  const [onDelete, setOnDelete] = useState(false);
  const [onDeleted, setOnDeleted] = useState(true);
  const [done, onDoneChange] = useState(false);
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "todo 1",
      text: "text 1",
      done: false,
      tags: [1, 2],
    },
    {
      id: 2,
      title: "todo 2",
      text: "text 2",
      done: false,
      tags: [1],
    },
    {
      id: 3,
      title: "todo 3",
      text: "text 3",
      done: true,
      tags: [2, 3],
    },
  ]);
  const [tags, setTags] = useState([
    { id: 1, color: "blue", name: "work" },
    { id: 2, color: "green", name: "study" },
    { id: 3, color: "red", name: "family" },
  ]);
  const [editTodoId, setEditTodoId] = useState(null);
  const [deleteTodoId, setDeleteTodoId] = useState(null);
  const [activeTagId, setActiveTagId] = useState(null);

  const onSave = async (value) => {
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
      </div>
      {onDeleted && (
        <TodoCard
          title="Title"
          text="Lorem ipsum dolor sit amet consectetur. Hendrerit metus etiam in sed vulputate tellus diam dui. "
          onDelete={() => setOnDelete(!onDelete)}
          onEdit={() => undefined}
          done={done}
          onDoneChange={onDoneChange}
          tags={[
            { color: "orange", id: 1, name: "d" },
            { color: "blue", id: 2, name: "d" },
            { color: "green", id: 3, name: "d" },
            { color: "red", id: 4, name: "d" },
          ]}
        />
      )}
      {onDelete && (
        <PopupDelete
          onDeleted={() => setOnDeleted(!onDeleted)}
          title="Do you really want to delete this task?"
        />
      )}
      <EditableButton icon="add" onSave={onSave}>
        add new task
      </EditableButton>
      <div>
        <div>
          {tags.map((tag) => {
            return (
              <Tag
                key={tag.id}
                color={tag.color}
                active={activeTagId === tag.id}
                isEditable
                onClick={() => setActiveTagId(tag.id)}
                onSave={async (value) => {
                  const copy = [...tags];
                  const idx = copy.findIndex(({ id }) => id === tag.id);
                  const hasMatch = tags.some(({ name }) => name === value);
                  if (idx >= 0 && !hasMatch) {
                    copy.splice(idx, 1, { ...tag, name: value });
                    setTags(copy);
                    return true;
                  }
                  return false;
                }}
                onDelete={() => {
                  const copy = [...tags];
                  const idx = copy.findIndex(({ id }) => id === tag.id);
                  if (idx >= 0) {
                    copy.splice(idx, 1);
                    setTags(copy);
                  }
                }}
              >
                {tag.name}
              </Tag>
            );
          })}
        </div>
      </div>
    </div>
  );
};
