function transitionHiddenElement(_ref) {
  let {
    element,
    transitionClassName,
    visibleClass,
    timeoutDuration,
    transitionEndClassName = ``,
    waitMode = "transitionend",
    hideMode = "hidden",
    displayValue = "block",
    onTransitionBefore = null,
    onTransitionEnd = null
  } = _ref;
  if (waitMode === "timeout" && typeof timeoutDuration !== "number") {
    console.error(`
      When calling transitionHiddenElement with waitMode set to timeout,
      you must pass in a number for timeoutDuration.
    `);
    return;
  }
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    waitMode = "immediate";
  }
  const handlerOnshow = e => {
    if (e.target === element) {
      element.classList.remove(transitionClassName);
      transitionEndClassName && element.classList.add(transitionEndClassName);
      element.removeEventListener("transitionend", handlerOnshow);
    }
  };
  const handlerOnHide = e => {
    if (e.target === element) {
      applyHiddenAttributes();
      element.classList.remove(transitionClassName);
      transitionEndClassName && element.classList.remove(transitionEndClassName);
      element.removeEventListener("transitionend", handlerOnHide);
      onTransitionEnd && onTransitionEnd();
    }
  };
  const applyHiddenAttributes = () => {
    if (hideMode === "display") {
      element.style.display = "none";
    } else {
      element.hidden = true;
    }
  };
  const removeHiddenAttributes = () => {
    if (hideMode === "display") {
      element.style.display = displayValue;
    } else {
      element.hidden = false;
    }
  };
  return {
    show() {
      element.removeEventListener("transitionend", handlerOnHide);
      element.addEventListener("transitionend", handlerOnshow);
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      removeHiddenAttributes();
      element.offsetHeight;
      element.classList.add(transitionClassName);
      element.classList.add(visibleClass);
      onTransitionBefore && onTransitionBefore();
    },
    hide() {
      if (waitMode === "transitionend") {
        element.addEventListener("transitionend", handlerOnHide);
      } else if (waitMode === "timeout") {
        this.timeout = setTimeout(() => {
          applyHiddenAttributes();
          onTransitionEnd && onTransitionEnd();
        }, timeoutDuration);
      } else {
        applyHiddenAttributes();
        onTransitionEnd && onTransitionEnd();
      }
      element.classList.add(transitionClassName);
      element.classList.remove(visibleClass);
    },
    toggle() {
      if (this.isHidden()) {
        this.show();
      } else {
        this.hide();
      }
    },
    isHidden() {
      const hasHiddenAttribute = element.getAttribute("hidden") !== null;
      const isDisplayNone = element.style.display === "none";
      const hasVisibleClass = [...element.classList].includes(visibleClass);
      return hasHiddenAttribute || isDisplayNone || !hasVisibleClass;
    },
    timeout: null
  };
}
function triggerDescendantClick(selector, event) {
  if (!selector) {
    throw new Error(`selector is not defined`);
  }
  const ctx = event.currentTarget;
  const el = ctx.querySelector(selector);
  el && el.dispatchEvent(new MouseEvent(`click`, {
    altKey: event.altKey,
    ctrlKey: event.ctrlKey,
    metaKey: event.metaKey,
    shiftKey: event.shiftKey,
    pressure: event.pressure
  }));
}
function getTabbable(context) {
  const selector = `a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])`;
  return [...context.querySelectorAll(selector)].filter(el => !el.hasAttribute(`hidden`) && !el.hasAttribute(`disabled`) && !JSON.parse(el.getAttribute(`aria-hidden`)));
}
const ThemeSetting = ((window, storage) => {
  const IDENTIFIER = window.themeIdentifier;
  const defaults = {
    colorScheme: `auto`,
    fontSize: `medium`
  };
  const _state = {
    ...defaults,
    ...(JSON.parse(storage.getItem(IDENTIFIER)) || {})
  };
  const state = {};
  function setState(prop, val) {
    _state[prop] = val;
    storage.setItem(IDENTIFIER, JSON.stringify(_state));
  }
  Object.defineProperties(state, {
    colorScheme: {
      get() {
        return _state.colorScheme;
      },
      set(val) {
        if (val === _state.colorScheme) return;
        setState(`colorScheme`, val);
      }
    },
    fontSize: {
      get() {
        return _state.fontSize;
      },
      set(val) {
        if (val === _state.fontSize) return;
        setState(`fontSize`, val);
      }
    }
  });
  return state;
})(window, localStorage);
((window, document) => {
  const applyTheme = _ref2 => {
    let {
      type,
      value
    } = _ref2;
    const setting = {
      scheme: {
        prop: `colorScheme`,
        initial: `auto`
      },
      size: {
        prop: `fontSize`,
        initial: `medium`
      }
    };
    ThemeSetting[setting[type]["prop"]] = value;
    if (value === setting[type]["initial"]) {
      document.documentElement.removeAttribute(`data-${type}`);
    } else {
      document.documentElement.setAttribute(`data-${type}`, value);
    }
  };
  const configureTheme = _ref3 => {
    let {
      options = [],
      type,
      initVal
    } = _ref3;
    [...options].forEach(el => {
      if (el.value === initVal) {
        el.checked = true;
        applyTheme({
          type,
          value: initVal
        });
      }
      el.addEventListener(`change`, _ref4 => {
        let {
          target: {
            value = ``
          }
        } = _ref4;
        return applyTheme({
          type,
          value
        });
      });
    });
  };
  configureTheme({
    options: document.querySelectorAll(`[name="theme"]`),
    type: `scheme`,
    initVal: ThemeSetting.colorScheme
  });
  configureTheme({
    options: document.querySelectorAll(`[name="font-size"]`),
    type: `size`,
    initVal: ThemeSetting.fontSize
  });
  const observer = new MutationObserver(mutations => {
    const accordion = window.uis.get(`sidebar-accordion`);
    mutations.forEach(_ref5 => {
      let {
        target,
        attributeName
      } = _ref5;
      if (attributeName === `hidden` && target.hidden) {
        accordion.closeAllPanels();
      }
    });
  });
  observer.observe(document.querySelector(`#slide-nav`), {
    attributes: true
  });
})(window, document);
function syncCheckbox(event) {
  const {
    target
  } = event;
  if (!target) return;
  const controlEl = target.previousElementSibling;
  if (!controlEl) return;
  controlEl.checked = !controlEl.checked;
  controlEl.focus();
}
((window, document) => {
  if (!window.components.has(`checkboxes`)) return;
  const {
    themePrefix: prefix
  } = window;
  const virtualCheckboxes = document.querySelectorAll(`span.${prefix}-checkbox__label`);
  virtualCheckboxes.forEach(vCheckbox => {
    vCheckbox.addEventListener(`click`, syncCheckbox, false);
  });
})(window, document);
((window, document) => {
  if (!window.components.has(`switch`)) return;
  const {
    themePrefix: prefix
  } = window;
  const virtualCheckboxes = document.querySelectorAll(`.${prefix}-switch__btn`);
  virtualCheckboxes.forEach(vCheckbox => {
    vCheckbox.addEventListener(`click`, syncCheckbox, false);
  });
})(window, document);
function syncRadio(event) {
  const {
    target
  } = event;
  if (!target) return;
  const controlEl = target.previousElementSibling;
  if (!controlEl) return;
  controlEl.checked = !controlEl.checked;
  controlEl.focus();
}
((window, document) => {
  if (!window.components.has(`radio`)) return;
  const {
    themePrefix: prefix
  } = window;
  const virtualRadios = document.querySelectorAll(`span.${prefix}-radio__label`);
  virtualRadios.forEach(vRadio => {
    vRadio.addEventListener(`click`, syncRadio, false);
  });
})(window, document);
((window, document) => {
  if (!window.components.has(`article-card`)) return;
  const {
    themePrefix: prefix
  } = window;
  const linkCards = document.querySelectorAll(`.${prefix}-article-card--link`);
  linkCards.forEach(card => {
    card.addEventListener(`click`, triggerDescendantClick.bind(card, `a:first-of-type`), false);
  });
})(window, document);
class Accordion {
  constructor(_ref6) {
    let {
      el,
      tabSelector,
      transitionClassName
    } = _ref6;
    this.container = el;
    this.tabSelector = tabSelector;
    this.tabs = el.querySelectorAll(tabSelector);
    this.transitionClassName = transitionClassName;
    this.visibleClass = `active`;
    this.init();
  }
  init() {
    this.tabPanels = [...this.tabs].map(tab => {
      const panelId = tab.getAttribute(`aria-controls`);
      return this.container.querySelector(`#${panelId}`);
    });
    this.container.addEventListener(`click`, this.handleClickTab.bind(this), false);
    this.container.addEventListener(`keydown`, this.handleKeyDown.bind(this), false);
  }
  handleClickTab(_ref7) {
    let {
      target
    } = _ref7;
    if (target.matches(this.tabSelector)) this.togglePanel(target);
  }
  handleKeyDown(event) {
    const {
      code,
      target
    } = event;
    const {
      tabs
    } = this;
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
      case `arrowdown`:
        event.preventDefault();
        nextIdx = ++currIdx > lastIdx ? 0 : currIdx;
        tabs[nextIdx].focus();
        break;
    }
  }
  togglePanel(tab) {
    const panelId = tab.getAttribute(`aria-controls`);
    const panelElem = this.container.querySelector(`#${panelId}`);
    const isHidden = panelElem.hidden;
    const panelTransitioner = transitionHiddenElement({
      element: panelElem,
      transitionClassName: this.transitionClassName,
      visibleClass: this.visibleClass,
      onTransitionBefore: () => {
        panelElem.style.setProperty(`max-height`, `${panelElem.scrollHeight + 400}px`);
      }
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
  closeAllPanels() {
    this.tabPanels.forEach(panel => {
      panel.classList.remove(this.visibleClass);
      panel.hidden = true;
    });
  }
}
((window, document) => {
  if (!window.components.has(`accordion`)) return;
  const {
    themePrefix: prefix
  } = window;
  const accordionSelector = `.${prefix}-accordion`;
  const accordionTabSelector = `.${prefix}-accordion__tab`;
  const transitionClassName = `transition`;
  const accordions = document.querySelectorAll(accordionSelector);
  accordions.forEach(accordion => {
    const name = accordion.getAttribute(`data-ui-name`);
    const ui = new Accordion({
      el: accordion,
      tabSelector: accordionTabSelector,
      transitionClassName
    });
    name && window.uis.set(name, ui);
  });
})(window, document);
class SlidePanel {
  constructor(_ref8) {
    let {
      el,
      trigger,
      transitionClassName,
      bodyClassName
    } = _ref8;
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
        this.trigger && this.trigger.focus({
          preventScroll: true
        });
        document.body.classList.remove(this.bodyClassName);
      }
    });
    this.bindEvent();
  }
  toggleState() {
    this.state = !this.state;
  }
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
    const {
      code
    } = event;
    if (code === `Escape`) {
      this.toggleState(event);
    }
  }
  bindEvent() {
    this.trigger.addEventListener(`click`, this.toggleState, false);
    this.closer.addEventListener(`click`, this.toggleState, false);
    this.el.addEventListener(`keydown`, this.handleKeyEvent, false);
  }
}
((window, document, slidePanels) => {
  if (!window.components.has(`slide-panel`)) return;
  if (!slidePanels.length) return;
  slidePanels.forEach(panel => {
    const name = panel.getAttribute(`data-ui-name`);
    const ui = new SlidePanel({
      el: panel,
      trigger: document.querySelector(`[aria-controls="${panel.getAttribute("id")}"]`),
      transitionClassName: `transition`,
      bodyClassName: `opened-panel`
    });
    name && window.uis.set(name, ui);
  });
})(window, document, document.querySelectorAll(`.slide-panel`));
window.addEventListener(`load`, function () {
  const {
    themePrefix
  } = window;
  const search = window.uis.get(`search`);
  if (!search) return;
  search({
    searchBoxId: `#searchbox`,
    inputId: `#keyword`,
    searchBtnId: `#btn-search`,
    hitsId: `#search-result`,
    statusId: `#search-status`,
    noResultTemplate: `<p>No results for <q>{query}</q></p>`,
    itemTemplate: _ref9 => {
      let {
        permalink,
        title,
        content,
        tags = []
      } = _ref9;
      return `<a href="${permalink}" class="${themePrefix}-search__list__link">` + `<b class="${themePrefix}-search__list__title">${title}</b>` + `<p class="${themePrefix}-search__list__content">${content}</p>` + `<p class="${themePrefix}-search__list__tags">${tags.reduce((str, tag) => `${str}${str ? " " : ""}<span>${tag}</span>`, ``)}</p></a>`;
    },
    widgetClasses: {
      root: `${themePrefix}-search__result`,
      emptyRoot: `${themePrefix}-search__result--empty`,
      list: `${themePrefix}-search__list`,
      item: `${themePrefix}-search__list__item`
    }
  });
});
//# sourceMappingURL=multi-entry.js.map

//# sourceMappingURL=/js/bundle.js.map