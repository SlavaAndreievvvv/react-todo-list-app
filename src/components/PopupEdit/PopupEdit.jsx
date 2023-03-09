import PropTypes, { func } from "prop-types";
import { useEffect, useState } from "react";
import { Button } from "../Button/Button";
import { Input } from "../Input";
import { Popup } from "../Popup";
import { Tag } from "../Tag";
import styles from "./PopupEdit.module.css";

export const PopupEdit = ({
  onClose,
  onSave,
  tags,
  title,
  text,
  selectedTags,
}) => {
  const [state, setState] = useState({
    title: "",
    text: "",
    selectedTags: [],
  });

  useEffect(() => {
    setState({
      title,
      text,
      selectedTags,
    });
  }, []);

  const onInputChange = (key) => (value) => {
    setState((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleSave = () => {
    onSave({ title: state.title, text: state.text, tags: state.selectedTags });
  };

  const onSelectedTagsChange = (tagId) => {
    const shallowCopy = [...state.selectedTags];
    const idx = shallowCopy.findIndex((id) => id === tagId);
    if (idx >= 0) {
      shallowCopy.splice(idx, 1);
    } else {
      shallowCopy.push(tagId);
    }
    setState((prevState) => ({
      ...prevState,
      selectedTags: shallowCopy,
    }));
  };

  return (
    <Popup className={styles.container}>
      <header className={styles.header}>
        <Button onClick={onClose} variant="text">
          Cancel
        </Button>
        <Button disabled={!state.title} onClick={handleSave}>
          Save
        </Button>
      </header>

      <label className={styles.text} htmlFor="title">
        Title
      </label>
      <Input
        placeholder="Add a title..."
        className={styles.input}
        value={state.title}
        onChange={onInputChange("title")}
        id="title"
      />

      <label className={styles.text} htmlFor="description">
        Description
      </label>
      <Input
        placeholder="Add a description..."
        className={styles.input}
        value={state.text}
        onChange={onInputChange("text")}
        id="description"
      />

      <p className={styles.text}>Tags</p>
      <div className={styles.tagsList}>
        {tags.map((tag) => {
          return (
            <Tag
              onClick={() => onSelectedTagsChange(tag.id)}
              key={tag.id}
              active={state.selectedTags.includes(tag.id)}
              color={tag.color}
            >
              {tag.name}
            </Tag>
          );
        })}
      </div>
    </Popup>
  );
};

PopupEdit.propTypes = {
  className: PropTypes.string,
  title: PropTypes.node,
  onSave: PropTypes.func,
  onClose: PropTypes.func,
  text: PropTypes.string,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      color: PropTypes.string,
    })
  ),
  selectedTags: PropTypes.arrayOf(PropTypes.number),
};

PopupEdit.defaultProps = {
  tags: [],
  selectedTags: [],
  text: "",
  title: "",
};
