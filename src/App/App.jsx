import PropTypes from "prop-types";
import clsx from "clsx";
import "./App.css";
import { useEffect, useMemo, useState } from "react";
import {
  Input,
  Checkbox,
  Button,
  TodoCard,
  PopupDelete,
  EditableButton,
  Tag,
  PopupEdit,
} from "../components";
import { deleteItemFromArray } from "../utils/deleteItemFromArray";
import { editItemInArray } from "../utils";
import { useTags } from "../hooks/useTags";

export const App = () => {
  const tagsState = useTags();

  const [editTodoId, setEditTodoId] = useState(null);
  const [deleteTodoId, setDeleteTodoId] = useState(null);
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

  const onSave = async (value) => {
    return true;
  };

  const todoEditing = useMemo(() => {
    if (editTodoId === "new") {
      return {};
    }
    return todos.find(({ id }) => id === editTodoId);
  }, [editTodoId, todos]);

  const onCreateTodo = (newTodo) => {
    setTodos((prevState) => [
      ...prevState,
      {
        id: Date.now(),
        done: false,
        ...newTodo,
      },
    ]);
    setEditTodoId(null);
  };

  const onSaveTodo = (newTodo) => {
    editItemInArray({
      list: todos,
      item: { id: editTodoId, ...newTodo },
      setState: setTodos,
      onCleanup: setEditTodoId,
    });
  };

  const onDeleteTodo = () =>
    deleteItemFromArray({
      list: todos,
      id: deleteTodoId,
      setState: setTodos,
      onCleanup: setDeleteTodoId,
    });

  return (
    <div className="App">
      {tagsState.deletingId && (
        <PopupDelete
          title="Do you really want to delete this tag?"
          onClose={() => tagsState.setDeletingId(null)}
          onDelete={tagsState.delete}
        />
      )}
      {deleteTodoId && (
        <PopupDelete
          title="Do you really want to delete this tag?"
          onClose={() => setDeleteTodoId(null)}
          onDelete={onDeleteTodo}
        />
      )}
      {!!todoEditing && (
        <PopupEdit
          title={todoEditing?.title}
          text={todoEditing?.text}
          tags={tagsState.data}
          onClose={() => setEditTodoId(null)}
          onSave={editTodoId === "new" ? onCreateTodo : onSaveTodo}
          selectedTags={todoEditing?.tags}
        />
      )}
      <header>
        <h1>todo app</h1>
        <Button
          icon="add"
          variant="icon"
          size="large"
          onClick={() => setEditTodoId("new")}
        />
      </header>
      <div>
        <div>
          {tagsState.data.map((tag) => {
            return (
              <Tag
                key={tag.id}
                color={tag.color}
                active={tagsState.activeId === tag.id}
                isEditable
                onClick={() => tagsState.setActiveId(tag.id)}
                onSave={(name) => tagsState.update({ ...tag, name })}
                onDelete={() => tagsState.setDeletingId(tag.id)}
              >
                {tag.name}
              </Tag>
            );
          })}
        </div>
      </div>
      <EditableButton icon="add" onSave={tagsState.create}>
        add new task
      </EditableButton>
      <div>
        {todos.map((todo) => {
          return (
            <TodoCard
              key={todo.id}
              title={todo.title}
              text={todo.text}
              onDelete={() => setDeleteTodoId(todo.id)}
              onClose={() => undefined}
              onEdit={() => setEditTodoId(todo.id)}
              onDoneChange={(done) => onSaveTodo({ ...todo, done })}
              done={todo.done}
              tags={tagsState.getParsedTags(todo.tags)}
            />
          );
        })}
      </div>
    </div>
  );
};
