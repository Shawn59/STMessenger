export const isUserNearBottom = (ref) => {
  if (!ref) return false;
  const { scrollHeight, scrollTop, clientHeight } = ref;

  return scrollHeight - scrollTop - clientHeight < 200;
};
