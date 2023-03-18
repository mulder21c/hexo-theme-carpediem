/**
 * @public
 * @function
 * @alias list_links
 * @desc Insert a list of external links <br>
 *  This is inspired from hexo listCategoriesHelper helper
 * @param {array} links the array that is consists of name and url
 * @param {object} options the configuration object
 * @param {function} options.transform The function that changes the display of tag name
 * @param {string} options.class class name of tag list
 * @returns {string}
 * @example
 * div
 *  | !{list_links({})}
 */
function listLinksHelper(links, options) {
  if (!options && (!links || !Array.isArray(links))) {
    options = links;
    links = this.theme.links;
  }

  if (!links || !links.length) return "";
  options = options || {};

  const { transform } = options;
  const className = options.class || `links`;

  const list = () => {
    return links.reduce((html, link) => {
      const { name, url } = link;
      return `${html}
        <li class="${className}__list__item">
          <a
            href="${url}"
            class="${className}__list__link"
            target="_blank"
            rel="noopener"
          >
            ${transform ? transform(name) : name}
          </a>
        </li>
      `;
    }, ``);
  };

  return `<ul class="${className}__list">${list()}</ul>`;
}

module.exports = listLinksHelper;
