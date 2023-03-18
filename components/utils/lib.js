/**
 * @see https://github.com/cloudfour/transition-hidden-element
 * @param {object} opts
 * @param {HTMLElement} opts.element - The element we're showing and hiding
 * @param {string} opts.transitionClassName -
 *  The class defining the transition property
 * @param {string} opts.visibleClass - The class to add when showing the element
 * @param {number} opts.timeoutDuration — If `waitMode` is set to `'timeout'`
 * @param {string} [opts.transitionEndClassName=""]- The class to add after
 *  transition ends
 * @param {string} [opts.waitMode="transitionend"]- Determine how the
 *  library should check that hiding transitions are complete.
 *  The options are `'transitionEnd'`,
 *  `'timeout'`, and `'immediate'` (to hide immediately)
 * @param {string} [opts.hideMode="hidden"] - Determine how the library should
 *  hide elements. The options are `hidden` (use the `hidden` attribute), and
 *  `display` (use the CSS `display` property). Defaults to `hidden`
 * @param {string} [opts.displayValue="block"] - When using the `display`
 *  `hideMode`, this parameter determines what the CSS `display` property
 *  should be set to when the element is shown. e.g. `block`, `inline`,
 *  `inline-block`. Defaults to `block`.
 * @param {Function | null} [opts.onTransitionBefore=null] the callback function
 *  to run after transition starts
 * @param {Function | null} [opts.onTransitionEnd=null] the callback function
 *  to run after transition ends
 */
export function transitionHiddenElement({
  element,
  transitionClassName,
  visibleClass,
  timeoutDuration,
  transitionEndClassName = ``,
  waitMode = "transitionend",
  hideMode = "hidden",
  displayValue = "block",
  onTransitionBefore = null,
  onTransitionEnd = null,
}) {
  if (waitMode === "timeout" && typeof timeoutDuration !== "number") {
    console.error(`
      When calling transitionHiddenElement with waitMode set to timeout,
      you must pass in a number for timeoutDuration.
    `);

    return;
  }

  // Don't wait for exit transitions if a user prefers reduced motion.
  // Ideally transitions will be disabled in CSS, which means we should not wait
  // before adding `hidden`.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    waitMode = "immediate";
  }

  /**
   * An event listener to add `hidden` after our animations complete.
   * This listener will remove itself after completing.
   */

  const handlerOnshow = (e) => {
    if (e.target === element) {
      element.classList.remove(transitionClassName);
      transitionEndClassName && element.classList.add(transitionEndClassName);
      element.removeEventListener("transitionend", handlerOnshow);
    }
  };

  const handlerOnHide = (e) => {
    if (e.target === element) {
      applyHiddenAttributes();

      element.classList.remove(transitionClassName);
      transitionEndClassName &&
        element.classList.remove(transitionEndClassName);
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
    /**
     * Show the element
     */
    show() {
      /**
       * This listener shouldn't be here but if someone spams the toggle
       * over and over really fast it can incorrectly stick around.
       * We remove it just to be safe.
       */
      element.removeEventListener("transitionend", handlerOnHide);
      element.addEventListener("transitionend", handlerOnshow);

      /**
       * Similarly, we'll clear the timeout in case it's still hanging around.
       */
      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      removeHiddenAttributes();

      /**
       * Force a browser re-paint so the browser will realize the
       * element is no longer `hidden` and allow transitions.
       */
      const reflow = element.offsetHeight;

      element.classList.add(transitionClassName);
      element.classList.add(visibleClass);
      onTransitionBefore && onTransitionBefore();
    },

    /**
     * Hide the element
     */
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

      // Add this class to trigger our animation
      element.classList.add(transitionClassName);
      element.classList.remove(visibleClass);
    },

    /**
     * Toggle the element's visibility
     */
    toggle() {
      if (this.isHidden()) {
        this.show();
      } else {
        this.hide();
      }
    },

    /**
     * Tell whether the element is hidden or not.
     */
    isHidden() {
      /**
       * The hidden attribute does not require a value. Since an empty string is
       * falsy, but shows the presence of an attribute we compare to `null`
       */
      const hasHiddenAttribute = element.getAttribute("hidden") !== null;

      const isDisplayNone = element.style.display === "none";

      const hasVisibleClass = [...element.classList].includes(visibleClass);

      return hasHiddenAttribute || isDisplayNone || !hasVisibleClass;
    },

    // A placeholder for our `timeout`
    timeout: null,
  };
}

/**
 * @desc trigger click method on an element corresponding
 *  to a given selector among descendants
 * @param {string} selector the selector to use to find elements in descendants
 * @param {MouseEvent} event
 */
export function triggerDescendantClick(selector, event) {
  if (!selector) {
    throw new Error(`selector is not defined`);
  }
  const ctx = event.currentTarget;
  const el = ctx.querySelector(selector);
  el &&
    el.dispatchEvent(
      new MouseEvent(`click`, {
        altKey: event.altKey,
        ctrlKey: event.ctrlKey,
        metaKey: event.metaKey,
        shiftKey: event.shiftKey,
        pressure: event.pressure,
      })
    );
}

/**
 * @param {HTMLElement} context The context for finding tabbable elements
 */
export function getTabbable(context) {
  const selector = `a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])`;
  return [...context.querySelectorAll(selector)].filter(
    (el) =>
      !el.hasAttribute(`hidden`) &&
      !el.hasAttribute(`disabled`) &&
      !JSON.parse(el.getAttribute(`aria-hidden`))
  );
}

export const ThemeSetting = ((window, storage) => {
  const IDENTIFIER = window.themeIdentifier;
  const defaults = {
    colorScheme: `auto`,
    fontSize: `medium`,
  };
  const _state = {
    ...defaults,
    ...(JSON.parse(storage.getItem(IDENTIFIER)) || {}),
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
      },
    },
    fontSize: {
      get() {
        return _state.fontSize;
      },
      set(val) {
        if (val === _state.fontSize) return;
        setState(`fontSize`, val);
      },
    },
  });

  return state;
})(window, localStorage);

export default {
  transitionHiddenElement,
  triggerDescendantClick,
  getTabbable,
  ThemeSetting,
};
