/**
 * this is inspired from hexo listCategoriesHelper helper
 */

const fullUrl = require("./full-url");
const { url_for } = require("hexo-util");

/**
 * build HTML from categories
 * @param {object} categories the iterable object of categories from Hexo
 * @param {object} options @see https://hexo.io/docs/helpers#list-categories
 * @returns {string}
 */
function listCategoriesHelper(categories, options) {
  if (
    !options &&
    (!categories || !Object.prototype.hasOwnProperty.call(categories, "length"))
  ) {
    options = categories;
    categories = this.site.categories;
  }

  if (!categories || !categories.length) return "";
  options = options || {};

  const isDevelopment = this.site.mode === "development";
  const { style = "list", transform, separator = ", ", suffix = "" } = options;
  const showCount = Object.prototype.hasOwnProperty.call(options, "show_count")
    ? options.show_count
    : true;
  const className = options.class || "category";
  const depth = options.depth ? parseInt(options.depth, 10) : 0;
  const orderby = options.orderby || "name";
  const order = options.order || 1;
  const showCurrent = options.show_current || false;
  const childrenIndicator = Object.prototype.hasOwnProperty.call(
    options,
    "children_indicator"
  )
    ? options.children_indicator
    : false;

  const prepareQuery = (parent) => {
    const query = {};

    if (parent) {
      query.parent = parent;
    } else {
      query.parent = { $exists: false };
    }

    return categories
      .find(query)
      .sort(orderby, order)
      .filter((cat) => cat.length);
  };

  const hierarchicalList = (level, parent) => {
    return prepareQuery(parent).reduce((html, cat, idx) => {
      let child;
      let isCurrent = false;

      if (!depth || level + 1 < depth) {
        child = hierarchicalList(level + 1, cat._id);
      }

      if (showCurrent && this.page) {
        for (let i = 0; i < cat.length; i++) {
          const post = cat.posts.data[i];
          if (post && post._id === this.page._id) {
            isCurrent = true;
            break;
          }
        }

        // special case: category page
        isCurrent =
          isCurrent || (this.page.base && this.page.base.endsWith(cat.path));
      }

      const additionalClassName =
        child && childrenIndicator ? ` ${childrenIndicator}` : "";

      return `${html}
          <li class="${className}__list__item${additionalClassName}">
          <a
            href="${
              isDevelopment
                ? url_for.call(this, cat.path)
                : fullUrl.call(this, cat.path)
            }${suffix}"
            class="${className}__list__link ${
        isCurrent ? `${className}__list__link--current` : ``
      }"
            ${isCurrent ? `aria-current="page"` : ``}
          >
            ${transform ? transform(cat.name) : cat.name}
          </a>
          ${
            showCount
              ? `<span class="${className}__list__count">${cat.length}</span>`
              : ``
          }
          ${
            child &&
            `<ul class="${className}__list ${className}__list--child">${child}</ul>`
          }
        </li>
      `;
    }, ``);
  };

  const flatList = (level, parent) => {
    return prepareQuery(parent).reduce((html, cat, idx) => {
      return `${html}${idx || level ? separator : ``}
        <a class="${className}__link" href="${
        isDevelopment
          ? url_for.call(this, cat.path)
          : fullUrl.call(this, cat.path)
      }${suffix}">
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
    return `<ul class="${className}__list">${hierarchicalList(0)}</ul>`;
  }

  return flatList(0);
}

module.exports = listCategoriesHelper;
