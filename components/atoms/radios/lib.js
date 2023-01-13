/**
 * @desc give mouse behavior to radio button that are not self-labeled
 * @param {MouseEvent} event
 */
export function syncRadio(event) {
  const { target } = event;
  if (!target) return;
  const controlEl = target.previousElementSibling;
  if (!controlEl) return;
  controlEl.checked = !controlEl.checked;
  controlEl.focus();
}

export default {
  syncRadio,
};
