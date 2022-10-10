/**
 * this is inspired from hexo listCategoriesHelper helper
 */

const fullUrl = require("./full-url");

function listMenuHelper(menus, options) {
  if (!options && (!menus || !Array.isArray(menus))) {
    options = menus;
    menus = this.theme.menu;
  }

  if (!menus || !menus.length) return "";
  options = options || {};

  const { style = "list", transform, separator = ", ", suffix = "" } = options;
  const className = options.class || `menu`;

  const list = () => {
    return menus.reduce((html, menu) => {
      const [[name, path]] = Object.entries(menu);
      let isCurrent =
        this.page.base &&
        this.page.base.endsWith(`${path.replace(/^\/|\/$/g, "")}/`);

      return `${html}
        <li class="${className}__list__item">
          <a
            href="${fullUrl.call(this, path)}"
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

  const flatList = (level, parent) => {
    return prepareQuery(parent).reduce((html, cat, idx) => {
      return `${html}${idx || level ? separator : ``}
        <a class="${className}__link" href="${fullUrl.call(
        this,
        cat.path
      )}${suffix}">
          ${transform ? transform(cat.name) : cat.name}
          ${
            showCount
              ? `<span class="${className}__count">${cat.length}</span>`
              : ``
          }
        </a>
        ${!depth || level + 1 < depth ? flatList(level + 1, cat._id) : ``}
      `;
    }, ``);
  };

  if (style === "list") {
    return `<ul class="${className}__list">${list()}</ul>`;
  }

  return flatList(0);
}

module.exports = listMenuHelper;
