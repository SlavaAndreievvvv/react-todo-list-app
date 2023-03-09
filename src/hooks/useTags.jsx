import { useCallback, useState } from "react";
import uniqolor from "uniqolor";
import { editItemInArray } from "../utils/editItemInArray";
import { deleteItemFromArray } from "../utils/deleteItemFromArray";

export const useTags = () => {
  const [tags, setTags] = useState([
    { id: 1, color: "blue", name: "work" },
    { id: 2, color: "green", name: "study" },
    { id: 3, color: "red", name: "family" },
  ]);

  const [deletingId, setDeletingId] = useState(null);
  const [activeId, setActiveId] = useState(null);

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
      const newTag = {
        id: Date.now(),
        name,
        color: uniqolor.random({
          saturation: [35, 70],
          lightness: 80,
          differencePoint: 100,
        }).color,
      };
      setTags((prevState) => [...prevState, newTag]);
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
  };
};
