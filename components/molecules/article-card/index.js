import { triggerDescendantClick } from "../../utils/lib";

((window, document) => {
  if (!window.components.has(`article-card`)) return;
  const { themePrefix: prefix } = window;

  // bind handler to link-typed card
  const linkCards = document.querySelectorAll(`.${prefix}-article-card--link`);

  linkCards.forEach((card) => {
    card.addEventListener(
      `click`,
      triggerDescendantClick.bind(card, `a:first-of-type`),
      false
    );
  });
})(window, document);
