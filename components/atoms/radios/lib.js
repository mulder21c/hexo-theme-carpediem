/**
 * @desc give mouse behavior to radio button that are not self-labeled
 * @param {MouseEvent} event
 */
export function syncRadio(event) {
  const { target } = event;
  const controlEl = target.previousElementSibling;
  controlEl.checked = !controlEl.checked;
  controlEl.focus();
}

export default radioUtil = {
  syncRadio,
};
