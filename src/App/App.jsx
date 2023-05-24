import {
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
import styles from "./App.module.css";
import { motion, AnimatePresence } from "framer-motion";

export const App = () => {
  const tagsState = useTags();
  const todosState = useTodo(tagsState.activeId);

  return (
    <div className={styles.App}>
      {tagsState.deletingId && (
        <PopupDelete
          title="Do you really want to delete this tag?"
          onClose={() => tagsState.setDeletingId(null)}
          onDelete={tagsState.delete}
        />
      )}
      {todosState.deleteId && (
        <PopupDelete
          title="Do you really want to delete this task?"
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
      <header className={styles.header}>
        <h1 className={styles.todoTitle}>todo list</h1>
        <Button
          icon="add"
          variant="icon"
          size="large"
          onClick={() => todosState.setEditId("new")}
        />
      </header>
      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <div className={styles.tagsList}>
            <AnimatePresence initial={false}>
              {tagsState.data.map((tag) => {
                return (
                  <motion.div
                    key={tag.id}
                    initial={{
                      opacity: 0,

                      translateX: -160,
                    }}
                    animate={{
                      opacity: 1,
                      translateX: 0,
                    }}
                    exit={{
                      opacity: 0,
                      translateX: -160,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Tag
                      className={styles.tag}
                      color={tag.color}
                      active={tagsState.activeId === tag.id}
                      isEditable
                      isActionsVisible={tagsState.deletingId === tag.id}
                      onClick={() => tagsState.toggleActiveId(tag.id)}
                      onSave={(name) => tagsState.update({ ...tag, name })}
                      onDelete={() => tagsState.setDeletingId(tag.id)}
                    >
                      {tag.name}
                    </Tag>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          <EditableButton
            className={styles.EditableButton}
            icon="add"
            onSave={tagsState.create}
          >
            add new tag
          </EditableButton>
          <Checkbox
            checked={todosState.doneTodo}
            onChange={todosState.setDoneTodo}
          >
            Hide Done Task
          </Checkbox>
        </div>
        <div className={styles.todoList}>
          <AnimatePresence initial={false}>
            {todosState.todos.map((todo) => {
              return (
                <motion.div
                  key={todo.id}
                  initial={{
                    opacity: 0,
                    rotate: 6,
                    translateX: 30,
                    translateY: -40,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    translateX: 0,
                    translateY: 0,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: 6,
                    translateX: 30,
                    translateY: -40,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <TodoCard
                    title={todo.title}
                    text={todo.text}
                    onDelete={() => todosState.setDeleteId(todo.id)}
                    onClose={() => undefined}
                    onEdit={() => todosState.setEditId(todo.id)}
                    onDoneChange={(done) =>
                      todosState.update({ ...todo, done })
                    }
                    done={todo.done}
                    tags={tagsState.getParsedTags(todo.tags)}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};
