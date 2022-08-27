((window, document) => {
  const { themePrefix: prefix } = GLOBAL || window.GLOBAL;
  const fakeCheckboxSelector = `span.${prefix}-checkbox__label`;

  function handleClickCheckbox(event) {
    const { target } = event;
    if (!target.matches(fakeCheckboxSelector)) return;
    const control = target.previousElementSibling;
    control.checked = !control.checked;
    control.focus();
  }

  document.addEventListener(`click`, handleClickCheckbox, false);
})(window, document);
