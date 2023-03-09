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
      <header className="header">
        <h1 className="todoTitle">todo list</h1>
        <Button
          icon="add"
          variant="icon"
          size="large"
          onClick={() => todosState.setEditId("new")}
        />
      </header>
      <main className="main">
        <div className="mainWrapper">
          <div className="tagsList">
            {tagsState.data.map((tag) => {
              return (
                <Tag
                  className="tag"
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
          <EditableButton
            className="EditableButton"
            icon="add"
            onSave={tagsState.create}
          >
            add new task
          </EditableButton>
          <Checkbox checked={null} onChange={null}>
            Hide Done Task
          </Checkbox>
        </div>
        <div className="todoList">
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
      </main>
    </div>
  );
};
