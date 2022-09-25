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
    this.init();
  }

  /**
   * initialize accordion
   */
  init() {
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
    const { keyCode, target } = event;
    const { tabs } = this;
    const isTab = target.matches(this.tabSelector);
    if (!isTab) return;
    const lastIdx = tabs.length - 1;
    let currIdx = [...tabs].indexOf(target);
    let nextIdx;
    switch (keyCode) {
      case 35: // end
        event.preventDefault();
        tabs[lastIdx].focus();
        break;
      case 36: // home
        event.preventDefault();
        tabs[0].focus();
        break;
      case 38: // arrow up
        event.preventDefault();
        nextIdx = --currIdx < 0 ? lastIdx : currIdx;
        tabs[nextIdx].focus();
        break;
      case 40: // arrow down
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
    panelElem.classList.add(this.transitionClassName);
    const panelTransitioner = transitionHiddenElement({
      element: panelElem,
      visibleClass: `active`,
    });

    if (isHidden) {
      tab.setAttribute(`aria-expanded`, `true`);
      panelTransitioner.show();
    } else {
      tab.setAttribute(`aria-expanded`, `false`);
      panelTransitioner.hide();
    }
  }
}

export default {
  Accordion,
};
