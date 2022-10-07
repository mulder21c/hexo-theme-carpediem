import { SlidePanel } from "./lib";

((window, document, slidePanels) => {
  if (!window.usedComponents.has(`slide-panel`)) return;
  if (!slidePanels.length) return;
  const { themePrefix: prefix } = GLOBAL || window.GLOBAL;

  slidePanels.forEach((panel) => {
    new SlidePanel({
      el: panel,
      trigger: document.querySelector(
        `[aria-controls="${panel.getAttribute("id")}"]`
      ),
      transitionClassName: `transition`,
      bodyClassName: `opened-panel`,
    });
  });
})(window, document, document.querySelectorAll(`.slide-panel`));
