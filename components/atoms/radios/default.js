import { syncRadio } from "./lib";

((window, document) => {
  if (!window.components.has(`radio`)) return;
  const { themePrefix: prefix } = window;

  // bind handler to all virtual radio with no label
  const virtualRadios = document.querySelectorAll(
    `span.${prefix}-radio__label`
  );
  virtualRadios.forEach((vRadio) => {
    vRadio.addEventListener(`click`, syncRadio, false);
  });
})(window, document);
