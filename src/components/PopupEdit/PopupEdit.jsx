import PropTypes, { func } from "prop-types";
import { useEffect, useState } from "react";
import { Button } from "../Button/Button";
import { Input } from "../Input";
import { Popup } from "../Popup";
import { Tag } from "../Tag";

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
    <Popup>
      <header>
        <Button onClick={onClose} variant="text">
          Cancel
        </Button>
        <Button disabled={!state.title} onClick={handleSave}>
          Save
        </Button>
      </header>

      <label htmlFor="title">Title</label>
      <Input value={state.title} onChange={onInputChange("title")} id="title" />

      <label htmlFor="description">Description</label>
      <Input
        value={state.text}
        onChange={onInputChange("text")}
        id="description"
      />

      <p>Tags</p>
      <div>
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
