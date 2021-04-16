/**
 * Triggers button on click / space / enter
 * @param {event} event - event object
 * @param {Function} callback - function which will be triggered on submit
 * @param {any} value - value will be passed to callback function
 * @returns {boolean}  true if value was changed
 */
export const handleChange = (event = {}, callback = () => {}, value = null) => {
  if (!event.type) {
    console.error("Event object does not contain required properites.");
  }

  if (![13, 32].includes(event.keyCode) && event.type !== "click") return false;
  callback(value);
  return true;
};
