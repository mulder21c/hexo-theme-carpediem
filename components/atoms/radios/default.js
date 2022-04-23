(() => {
  const { themePrefix: prefix } = GLOBAL;
  const fakeRadioSelector = `span.${prefix}-radio__label`;

  function handleClickCheckbox(event) {
    const { target } = event;
    if (!target.matches(fakeRadioSelector)) return;
    const control = target.previousElementSibling;
    control.checked = !control.checked;
    control.focus();
  }

  document.addEventListener(`click`, handleClickCheckbox, false);
})();
