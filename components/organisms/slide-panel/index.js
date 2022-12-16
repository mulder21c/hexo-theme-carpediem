import { SlidePanel } from "./lib";

((window, document, slidePanels) => {
  if (!window.components.has(`slide-panel`)) return;
  if (!slidePanels.length) return;

  slidePanels.forEach((panel) => {
    const name = panel.getAttribute(`data-ui-name`);
    const ui = new SlidePanel({
      el: panel,
      trigger: document.querySelector(
        `[aria-controls="${panel.getAttribute("id")}"]`
      ),
      transitionClassName: `transition`,
      bodyClassName: `opened-panel`,
    });

    name && window.uis.set(name, ui);
  });
})(window, document, document.querySelectorAll(`.slide-panel`));
