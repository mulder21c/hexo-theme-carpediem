/**
 * @see https://github.com/cloudfour/transition-hidden-element
 * @param {Function} opts.onTranstionBefore the callback function
 *  to run before transition starts
 * @param {Function} opts.onTransitionEnd the callback function
 *  to run after transition ends
 */
export function transitionHiddenElement({
  element,
  transitionClassName,
  transitionEndClassName,
  visibleClass,
  waitMode = "transitionend",
  timeoutDuration,
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
      element.setAttribute("hidden", true);
    }
  };

  const removeHiddenAttributes = () => {
    if (hideMode === "display") {
      element.style.display = displayValue;
    } else {
      element.removeAttribute("hidden");
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

      onTransitionBefore && onTransitionBefore();
      element.classList.add(transitionClassName);
      element.classList.add(visibleClass);
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
  el && el.click();
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

export default {
  transitionHiddenElement,
  triggerDescendantClick,
  getTabbable,
};
