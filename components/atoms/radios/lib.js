/**
 * @desc give mouse behavior to radio buttonc that are not self-labeld
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
