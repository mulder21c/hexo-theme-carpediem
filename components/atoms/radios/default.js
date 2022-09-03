import { syncRadio } from "./lib";

((window, document) => {
  const { themePrefix: prefix } = GLOBAL || window.GLOBAL;

  // bind handler to all virtual radio with no label
  const virtualRadios = document.querySelectorAll(
    `span.${prefix}-radio__label`
  );
  virtualRadios.forEach((vRadio) => {
    vRadio.addEventListener(`click`, syncRadio, false);
  });
})(window, document);
