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
import { useTags } from "../hooks/useTags";
import { useTodo } from "../hooks/useTodo";

export const App = () => {
  const tagsState = useTags();
  const todosState = useTodo();
  // const [deleteTodoId, setDeleteTodoId] = useState(null);
  // const [todos, setTodos] = useState([
  //   {
  //     id: 1,
  //     title: "todo 1",
  //     text: "text 1",
  //     done: false,
  //     tags: [1, 2],
  //   },
  //   {
  //     id: 2,
  //     title: "todo 2",
  //     text: "text 2",
  //     done: false,
  //     tags: [1],
  //   },
  //   {
  //     id: 3,
  //     title: "todo 3",
  //     text: "text 3",
  //     done: true,
  //     tags: [2, 3],
  //   },
  // ]);

  // const todoEditing = useMemo(() => {
  //   if (editTodoId === "new") {
  //     return {};
  //   }
  //   return todos.find(({ id }) => id === editTodoId);
  // }, [editTodoId, todos]);

  // const onCreateTodo = (newTodo) => {
  //   setTodos((prevState) => [
  //     ...prevState,
  //     {
  //       id: Date.now(),
  //       done: false,
  //       ...newTodo,
  //     },
  //   ]);
  //   setEditTodoId(null);
  // };

  // const onSaveTodo = (newTodo) => {
  //   editItemInArray({
  //     list: todos,
  //     item: { id: editTodoId, ...newTodo },
  //     setState: setTodos,
  //     onCleanup: setEditTodoId,
  //   });
  // };

  // const onDeleteTodo = () =>
  //   deleteItemFromArray({
  //     list: todos,
  //     id: deleteTodoId,
  //     setState: setTodos,
  //     onCleanup: setDeleteTodoId,
  //   });

  const onSave = async (value) => {
    return true;
  };

  return (
    <div className="App">
      {tagsState.deletingId && (
        <PopupDelete
          title="Do you really want to delete this tag?"
          onClose={() => tagsState.setDeletingId(null)}
          onDelete={tagsState.delete}
        />
      )}
      {todosState.deleteId && (
        <PopupDelete
          title="Do you really want to delete this tag?"
          onClose={() => todosState.setDeleteId(null)}
          onDelete={todosState.delete}
        />
      )}
      {!!todosState.todoEditing && (
        <PopupEdit
          title={todosState.todoEditing?.title}
          text={todosState.todoEditing?.text}
          tags={tagsState.data}
          onClose={() => todosState.setEditId(null)}
          onSave={
            todosState.editId === "new" ? todosState.create : todosState.update
          }
          selectedTags={todosState.todoEditing?.tags}
        />
      )}
      <header>
        <h1>todo app</h1>
        <Button
          icon="add"
          variant="icon"
          size="large"
          onClick={() => todosState.setEditId("new")}
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
        {todosState.data.map((todo) => {
          return (
            <TodoCard
              key={todo.id}
              title={todo.title}
              text={todo.text}
              onDelete={() => todosState.setDeleteId(todo.id)}
              onClose={() => undefined}
              onEdit={() => todosState.setEditId(todo.id)}
              onDoneChange={(done) => todosState.update({ ...todo, done })}
              done={todo.done}
              tags={tagsState.getParsedTags(todo.tags)}
            />
          );
        })}
      </div>
    </div>
  );
};
