/**
 * @see https://github.com/cloudfour/transition-hidden-element
 */
function transitionHiddenElement({
  element: e,
  visibleClass: t,
  waitMode: i = "transitionend",
  timeoutDuration: n,
  hideMode: s = "hidden",
  displayValue: o = "block",
}) {
  if ("timeout" === i && "number" != typeof n)
    return void console.error(`
      When calling transitionHiddenElement with waitMode set to timeout,
      you must pass in a number for timeoutDuration.
    `);
  window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    (i = "immediate");
  const d = (t) => {
      t.target === e && (r(), e.removeEventListener("transitionend", d));
    },
    r = () => {
      "display" === s
        ? (e.style.display = "none")
        : e.setAttribute("hidden", !0);
    };
  return {
    show() {
      e.removeEventListener("transitionend", d),
        this.timeout && clearTimeout(this.timeout),
        "display" === s ? (e.style.display = o) : e.removeAttribute("hidden");
      e.offsetHeight;
      e.classList.add(t);
    },
    hide() {
      "transitionend" === i
        ? e.addEventListener("transitionend", d)
        : "timeout" === i
        ? (this.timeout = setTimeout(() => {
            r();
          }, n))
        : r(),
        e.classList.remove(t);
    },
    toggle() {
      this.isHidden() ? this.show() : this.hide();
    },
    isHidden() {
      const i = null !== e.getAttribute("hidden"),
        n = "none" === e.style.display,
        s = [...e.classList].includes(t);
      return i || n || !s;
    },
    timeout: null,
  };
}
window.transitionHiddenElement = transitionHiddenElement;
