import { transitionHiddenElement } from "../../utils/lib";

/**
 * accordion class
 * @class Accordion
 */
export class Accordion {
  /**
   * create accordion instance
   * @param {object} options
   * @param {HTMLElement} options.el accordion container element
   * @param {string} options.tabSelector the selector for tab button
   * @param {string} options.transitionClassName the class name for animation
   */
  constructor({ el, tabSelector, transitionClassName }) {
    this.container = el;
    this.tabSelector = tabSelector;
    this.tabs = el.querySelectorAll(tabSelector);
    this.transitionClassName = transitionClassName;
    this.visibleClass = `active`;
    this.init();
  }

  /**
   * initialize accordion
   */
  init() {
    this.tabPanels = [...this.tabs].map((tab) => {
      const panelId = tab.getAttribute(`aria-controls`);
      return this.container.querySelector(`#${panelId}`);
    });
    this.container.addEventListener(
      `click`,
      this.handleClickTab.bind(this),
      false
    );
    this.container.addEventListener(
      `keydown`,
      this.handleKeyDown.bind(this),
      false
    );
  }

  /**
   * handler for click event on tab in accordion header
   * @param {Event} event - click event
   * @param {HTMLElement} event.target - click event
   */
  handleClickTab({ target }) {
    if (target.matches(this.tabSelector)) this.togglePanel(target);
  }

  /**
   * handler for key event on tab in accordion header
   * @param {Event} event - click event
   */
  handleKeyDown(event) {
    const { code, target } = event;
    const { tabs } = this;
    const isTab = target.matches(this.tabSelector);
    if (!isTab) return;
    const lastIdx = tabs.length - 1;
    let currIdx = [...tabs].indexOf(target);
    let nextIdx;
    switch (code.toLowerCase()) {
      case `end`:
        event.preventDefault();
        tabs[lastIdx].focus();
        break;
      case `home`:
        event.preventDefault();
        tabs[0].focus();
        break;
      case `arrowup`:
        event.preventDefault();
        nextIdx = --currIdx < 0 ? lastIdx : currIdx;
        tabs[nextIdx].focus();
        break;
      case `arrowdown`: // arrow down
        event.preventDefault();
        nextIdx = ++currIdx > lastIdx ? 0 : currIdx;
        tabs[nextIdx].focus();
        break;
    }
  }

  /**
   * toggle accordion panel
   * @param {HTMLElement} tab - tab element in accordion header
   */
  togglePanel(tab) {
    const panelId = tab.getAttribute(`aria-controls`);
    const panelElem = this.container.querySelector(`#${panelId}`);
    const isHidden = panelElem.hidden;
    const panelTransitioner = transitionHiddenElement({
      element: panelElem,
      transitionClassName: this.transitionClassName,
      visibleClass: this.visibleClass,
      onTransitionBefore: () => {
        panelElem.style.setProperty(
          `max-height`,
          `${panelElem.scrollHeight + 400}px`
        );
      },
    });

    if (isHidden) {
      tab.setAttribute(`aria-expanded`, `true`);
      panelTransitioner.show();
    } else {
      tab.setAttribute(`aria-expanded`, `false`);
      panelElem.style.removeProperty(`max-height`);
      panelTransitioner.hide();
    }
  }

  /**
   * close all accordion panel
   */
  closeAllPanels() {
    this.tabPanels.forEach((panel) => {
      panel.classList.remove(this.visibleClass);
      panel.hidden = true;
    });
  }
}

export default {
  Accordion,
};
