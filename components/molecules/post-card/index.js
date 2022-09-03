import { triggerDescendantClick } from "../../utils/lib";

((window, document) => {
  const { themePrefix: prefix } = GLOBAL || window.GLOBAL;

  // bind handler to link-typed card
  const linkCards = document.querySelectorAll(`.${prefix}-post-card--link`);

  linkCards.forEach((card) => {
    card.addEventListener(
      `click`,
      triggerDescendantClick.bind(card, `a:first-of-type`),
      false
    );
  });
})(window, document);
