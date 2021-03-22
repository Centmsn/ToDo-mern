import { useState } from "react";

export const useSessionStorage = () => {
  const [item, setItem] = useState(null);

  /**
   * Recovers an item from sessionStorage. Undefined is set if not item was found.
   * @param {String} key - an item key
   * @return {undefined}
   */
  const getSessionItem = key => {
    const sessionItem = sessionStorage.getItem(key);

    if (sessionItem) {
      setItem(sessionItem);
    } else {
      setItem(undefined);
    }
  };

  /**
   * sets an item in the sesstionStorage
   * @param {String} key - item key
   * @param {String} value - item id
   * @return {undefined}
   */
  const setSessionItem = (key, value) => {
    sessionStorage.setItem(key, value);
  };

  return { item, getSessionItem, setSessionItem };
};
