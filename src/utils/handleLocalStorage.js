export const handleLocalStorage = (key = "", value = null) => {
  if (typeof key !== "string") {
    throw new Error(
      `Incorrect arguments passed. Expected string, instead got ${typeof key}`
    );
  }

  if (value) {
    localStorage.setItem(key, value);
    return;
  }

  return localStorage.getItem(key);
};
