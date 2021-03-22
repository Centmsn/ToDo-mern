/**
 * Recovers an item from sessionStorage. Undefined is set if not item was found.
 * @param {String} key - an item key
 * @return {string | undefined}
 */
export const getSessionItem = key => {
  const sessionItem = sessionStorage.getItem(key);

  return sessionItem || undefined;
};

/**
 * sets an item in the sesstionStorage - if an item is overwritten, returns removed item
 * @param {String} key - item key
 * @param {String} value - item id
 * @return {undefined || string}
 */
export const setSessionItem = (key, value) => {
  const prev = sessionStorage.getItem(key);
  sessionStorage.setItem(key, value);

  return prev || undefined;
};
