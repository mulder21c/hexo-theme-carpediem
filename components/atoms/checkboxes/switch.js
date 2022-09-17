import { syncCheckbox } from "./lib";

((window, document) => {
  if (!window.usedComponents.has(`switch`)) return;
  const { themePrefix: prefix } = GLOBAL || window.GLOBAL;

  // bind handler to all virtual checkbox with no label
  const virtualCheckboxes = document.querySelectorAll(`.${prefix}-switch__btn`);
  virtualCheckboxes.forEach((vCheckbox) => {
    vCheckbox.addEventListener(`click`, syncCheckbox, false);
  });
})(window, document);
