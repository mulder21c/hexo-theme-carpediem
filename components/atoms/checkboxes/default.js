import { syncCheckbox } from "./lib";

((window, document) => {
  if (!window.components.has(`checkboxes`)) return;
  const { themePrefix: prefix } = GLOBAL || window.GLOBAL;

  // bind handler to all virtual checkbox with no label
  const virtualCheckboxes = document.querySelectorAll(
    `span.${prefix}-checkbox__label`
  );
  virtualCheckboxes.forEach((vCheckbox) => {
    vCheckbox.addEventListener(`click`, syncCheckbox, false);
  });
})(window, document);
