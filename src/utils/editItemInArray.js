export const editItemInArray = async ({
  list,
  item,
  setState,
  extraConditional = true,
  onCleanup,
}) => {
  const shallowCopy = [...list];
  const idx = shallowCopy.findIndex(({ id }) => id === item.id);
  if (idx >= 0 && extraConditional) {
    shallowCopy.splice(idx, 1, item);
    setState(shallowCopy);
    if (onCleanup) onCleanup(null);
    return true;
  }
  return false;
};
