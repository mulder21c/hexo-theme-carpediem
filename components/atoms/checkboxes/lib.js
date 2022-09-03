/**
 * @desc give mouse behavior to checkboxes that are not self-labeld
 * @param {MouseEvent} event
 */
export function syncCheckbox(event) {
  const { target } = event;
  const controlEl = target.previousElementSibling;
  controlEl.checked = !controlEl.checked;
  controlEl.focus();
}

export default checkboxUtil = {
  syncCheckbox,
};
