((window, document) => {
  const { themePrefix: prefix } = GLOBAL || window.GLOBAL;
  const fakeButtonSelector = `.${prefix}-switch__btn`;

  function handleToggleSwitch(event) {
    const { target } = event;
    if (!target.matches(fakeButtonSelector)) return;
    const control = target.previousElementSibling;
    control.checked = !control.checked;
    control.focus();
  }

  document.addEventListener(`click`, handleToggleSwitch, false);
})(window, document);
