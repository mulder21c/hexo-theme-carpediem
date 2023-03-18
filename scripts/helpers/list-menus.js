const full_url = require("./full-url");
const { url_for } = require("hexo-util");

/**
 * @public
 * @function
 * @alias list_menus
 * @desc Insert a list of menu <br>
 * This is inspired from hexo listCategoriesHelper helper
 * @param {object[]} menus the menu from theme config
 * @param {object} options the configuration object
 * @param {function} options.transform The function that changes the display of menu name
 * @param {string} options.class class name of menu list
 * @returns {string}
 * @example
 * div
 *  | !{list_menus({})}
 */
function listMenusHelper(menus, options) {
  if (!options && (!menus || !Array.isArray(menus))) {
    options = menus;
    menus = this.theme.menu;
  }

  if (!menus || !menus.length) return "";
  options = options || {};

  const { transform } = options;
  const className = options.class || `menu`;
  const isDevelopment = this.site.mode === "development";

  const list = () => {
    return menus.reduce((html, menu) => {
      const [[name, path]] = Object.entries(menu);
      let isCurrent =
        this.page.base &&
        this.page.base.endsWith(`${path.replace(/^\/|\/$/g, "")}/`);

      return `${html}
        <li class="${className}__list__item">
          <a
            href="${
              isDevelopment
                ? url_for.call(this, path)
                : full_url.call(this, path)
            }"
            class="${className}__list__link ${
        isCurrent ? `${className}__list__link--current` : ``
      }"
            ${isCurrent ? `aria-current="page"` : ``}
          >
            ${transform ? transform(name) : name}
          </a>
        </li>
      `;
    }, ``);
  };

  return `<ul class="${className}__list">${list()}</ul>`;
}

module.exports = listMenusHelper;
