import { syncCheckbox } from "./lib";

((window, document) => {
  if (!window.components.has(`switch`)) return;
  const { themePrefix: prefix } = window;

  // bind handler to all virtual checkbox with no label
  const virtualCheckboxes = document.querySelectorAll(`.${prefix}-switch__btn`);
  virtualCheckboxes.forEach((vCheckbox) => {
    vCheckbox.addEventListener(`click`, syncCheckbox, false);
  });
})(window, document);
