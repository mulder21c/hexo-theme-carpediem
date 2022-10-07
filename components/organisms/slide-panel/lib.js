import { transitionHiddenElement, getTabbable } from "../../utils/lib";

/**
 * slide panel class
 * @class SlidePanel
 */
export class SlidePanel {
  /**
   * create slide instance
   * @param {object} options
   * @param {HTMLElement} options.el slide panel element
   * @param {HTMLElement} options.trigger the element that triggers a panel's visibility
   * @param {string} options.transitionClassName the class name for animation
   * @param {string} options.bodyClassName the class name to insert/remove when toggle panel
   */
  constructor({ el, trigger, transitionClassName, bodyClassName }) {
    this.el = el;
    this.trigger = trigger;
    this.transitionClassName = transitionClassName;
    this.bodyClassName = bodyClassName;
    this.init();
  }

  get state() {
    return this._state || false;
  }

  set state(newVal) {
    this._state = newVal;
    this.setTriggerState(newVal);
    this.togglePanel(newVal);
  }

  init() {
    this.toggleState = this.toggleState.bind(this);
    this.handleKeyEvent = this.handleKeyEvent.bind(this);
    this.closer = this.el.querySelector(`.closer`);
    this.firstTabbable = getTabbable(this.el)[0];
    this.panelTransitioner = transitionHiddenElement({
      element: this.el,
      transitionClassName: this.transitionClassName,
      visibleClass: `open`,
      onTransitionBefore: () => {
        document.body.classList.add(this.bodyClassName);
        this.firstTabbable && this.firstTabbable.focus();
      },
      onTransitionEnd: () => {
        this.trigger && this.trigger.focus({ preventScroll: true });
        document.body.classList.remove(this.bodyClassName);
      },
    });
    this.bindEvent();
  }

  /**
   * toggle visibility state for panel
   */
  toggleState() {
    this.state = !this.state;
  }

  /**
   * toggle aria-expanded attributes value on trigger button
   * @param {bool} state
   */
  setTriggerState(state) {
    this.trigger.setAttribute(`aria-expanded`, JSON.stringify(state));
  }

  togglePanel(state) {
    if (state) {
      this.panelTransitioner.show();
    } else {
      this.panelTransitioner.hide();
    }
  }

  handleKeyEvent(event) {
    const { code } = event;
    if (code === `Escape`) {
      this.toggleState(event);
    }
  }

  /**
   * bind event handler to trigger button for handling panel's visibility
   */
  bindEvent() {
    this.trigger.addEventListener(`click`, this.toggleState, false);
    this.closer.addEventListener(`click`, this.toggleState, false);
    this.el.addEventListener(`keydown`, this.handleKeyEvent, false);
  }
}

export default {
  SlidePanel,
};
