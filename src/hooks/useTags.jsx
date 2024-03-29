import { useCallback, useState, useEffect } from "react";
import uniqolor from "uniqolor";
import { editItemInArray } from "../utils/editItemInArray";
import { deleteItemFromArray } from "../utils/deleteItemFromArray";

export const useTags = () => {
  const [tags, setTags] = useState(
    JSON.parse(localStorage.getItem("tags")) ?? [
      { id: 1, color: "#BCB9FF", name: "work" },
      { id: 2, color: "#76B6FF", name: "study" },
      { id: 3, color: "#FF9960", name: "family" },
      { id: 4, color: "#A0EC83", name: "sport" },
    ]
  );

  useEffect(() => {
    localStorage.setItem("tags", JSON.stringify(tags));
  }, [tags]);

  const [deletingId, setDeletingId] = useState(null);
  const [activeId, setActiveId] = useState(null);

  const toggleActiveId = (id) => {
    if (activeId !== id) {
      setActiveId(id);
    } else {
      setActiveId(null);
    }
  };

  const getParsedTags = useCallback(
    (tagIds = []) => {
      return tags.filter(({ id }) => tagIds.includes(id));
    },
    [tags]
  );

  const onSaveTag = useCallback(
    async (tag) =>
      editItemInArray({
        item: tag,
        list: tags,
        setState: setTags,
        extraConditional: !tags.some(
          ({ name }) => name.toLowerCase() === tag.name.toLowerCase()
        ),
      }),

    [tags, setTags]
  );

  const onDeleteTag = useCallback(
    () =>
      deleteItemFromArray({
        list: tags,
        id: deletingId,
        setState: setTags,
        onCleanup: setDeletingId,
      }),
    [tags, deletingId, setTags, setDeletingId]
  );

  const onCreateNewTag = useCallback(
    async (name) => {
      if (name.length <= 0) {
        return null;
      }
      if (name.length > 12) {
        alert(`max 12 letter`);
        return null;
      }
      if (tags.some((tag) => tag.name === name)) {
        alert(`Tag "${name}" already exists!`);
        return null;
      }
      const newTag = {
        id: Date.now(),
        name,
        color: uniqolor.random({
          saturation: [35, 70],
          lightness: 80,
          differencePoint: 100,
        }).color,
      };
      setTags((prevState) => [newTag, ...prevState]);
      return true;
    },
    [setTags]
  );

  return {
    data: tags,
    setData: setTags,
    activeId,
    deletingId,
    setDeletingId,
    setActiveId,
    getParsedTags,
    create: onCreateNewTag,
    delete: onDeleteTag,
    update: onSaveTag,
    toggleActiveId,
  };
};
