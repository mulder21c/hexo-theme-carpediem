import { ThemeSetting } from "../utils/lib";

((window, document) => {
  const applyTheme = ({ type, value }) => {
    const setting = {
      scheme: {
        prop: `colorScheme`,
        initial: `auto`,
      },
      size: {
        prop: `fontSize`,
        initial: `medium`,
      },
    };

    ThemeSetting[setting[type]["prop"]] = value;
    if (value === setting[type]["initial"]) {
      document.documentElement.removeAttribute(`data-${type}`);
    } else {
      document.documentElement.setAttribute(`data-${type}`, value);
    }
  };

  const configureTheme = ({ options = [], type, initVal }) => {
    [...options].forEach((el) => {
      if (el.value === initVal) {
        el.checked = true;
        applyTheme({ type, value: initVal });
      }
      el.addEventListener(`change`, ({ target: { value = `` } }) =>
        applyTheme({ type, value })
      );
    });
  };

  configureTheme({
    options: document.querySelectorAll(`[name="theme"]`),
    type: `scheme`,
    initVal: ThemeSetting.colorScheme,
  });

  configureTheme({
    options: document.querySelectorAll(`[name="font-size"]`),
    type: `size`,
    initVal: ThemeSetting.fontSize,
  });

  const observer = new MutationObserver((mutations) => {
    const accordion = window.uis.get(`sidebar-accordion`);
    mutations.forEach(({ target, attributeName }) => {
      if (attributeName === `hidden` && target.hidden) {
        accordion.closeAllPanels();
      }
    });
  });

  observer.observe(document.querySelector(`#slide-nav`), { attributes: true });
})(window, document);
