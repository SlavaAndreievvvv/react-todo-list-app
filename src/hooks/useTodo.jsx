import { useCallback, useState, useMemo, useEffect } from "react";
import { editItemInArray } from "../utils/editItemInArray";
import { deleteItemFromArray } from "../utils/deleteItemFromArray";

export const useTodo = (activeTagId) => {
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem("todos")) ?? [
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
    ]
  );
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [doneTodo, setDoneTodo] = useState(false);

  const todos = useMemo(() => {
    let result = [...todoList];
    if (doneTodo) {
      result = todoList.filter((todo) => !todo.done);
    }
    if (activeTagId) {
      result = result.filter(({ tags }) => tags.includes(activeTagId));
    }
    return result;
  }, [doneTodo, todoList, activeTagId]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  const onCreateTodo = (newTodo) => {
    setTodoList((prevState) => [
      ...prevState,
      {
        id: Date.now(),
        done: false,
        ...newTodo,
      },
    ]);
    setEditId(null);
  };

  const onSaveTodo = (newTodo) => {
    editItemInArray({
      list: todos,
      item: { id: editId, ...newTodo },
      setState: setTodoList,
      onCleanup: setEditId,
    });
  };

  const onDeleteTodo = () =>
    deleteItemFromArray({
      list: todos,
      id: deleteId,
      setState: setTodoList,
      onCleanup: setDeleteId,
    });

  const todoEditing = useMemo(() => {
    if (editId === "new") {
      return {};
    }
    return todos.find(({ id }) => id === editId);
  }, [editId, todos]);

  return {
    data: todoList,
    setData: setTodoList,
    editId,
    deleteId,
    setDeleteId,
    setEditId,
    todoEditing,
    create: onCreateTodo,
    delete: onDeleteTodo,
    update: onSaveTodo,
    todos,
    doneTodo,
    setDoneTodo,
  };
};
