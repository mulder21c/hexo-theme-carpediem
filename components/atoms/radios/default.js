(() => {
  const { themePrefix: prefix } = GLOBAL;
  const fakeRadioSelector = `span.${prefix}-radio__label`;

  function handleClickRadio(event) {
    const { target } = event;
    if (!target.matches(fakeRadioSelector)) return;
    const control = target.previousElementSibling;
    control.checked = true;
    control.focus();
  }

  document.addEventListener(`click`, handleClickRadio, false);
})();
