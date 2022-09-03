import { Accordion } from "./lib";

((window, document) => {
  const { themePrefix: prefix } = GLOBAL || window.GLOBAL;
  const accordionSelector = `.${prefix}-accordion`;
  const accordionTabSelector = `.${prefix}-accordion__tab`;
  const transitionClassName = `transition`;

  const accordions = document.querySelectorAll(accordionSelector);
  accordions.forEach(
    (accordion) =>
      new Accordion({
        el: accordion,
        tabSelector: accordionTabSelector,
        transitionClassName,
      })
  );
})(window, document);
