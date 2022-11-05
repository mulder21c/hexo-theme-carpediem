import { Accordion } from "./lib";

((window, document) => {
  if (!window.components.has(`accordion`)) return;
  const { themePrefix: prefix } = GLOBAL || window.GLOBAL;
  const accordionSelector = `.${prefix}-accordion`;
  const accordionTabSelector = `.${prefix}-accordion__tab`;
  const transitionClassName = `transition`;

  const accordions = document.querySelectorAll(accordionSelector);
  accordions.forEach((accordion) => {
    const name = accordion.getAttribute(`data-ui-name`);
    const ui = new Accordion({
      el: accordion,
      tabSelector: accordionTabSelector,
      transitionClassName,
    });

    name && window.uis.set(name, ui);
  });
})(window, document);
