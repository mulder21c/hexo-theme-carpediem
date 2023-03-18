const path = require("path");
const loadYml = require("../utils/load-yaml");
const iconListPath = path.resolve(
  __dirname,
  `../../node_modules/`,
  `./@fortawesome/fontawesome-free/metadata/icons.yml`
);

const iconsMeta = (() => loadYml(iconListPath, `⚠ Cannot find fontawesome!`))();

/**
 * @typedef {object} IconInfo
 * @property {string} iconName
 * @property {string} iconCategory
 */

/**
 * @public
 * @function
 * @alias icon_info
 * @desc Get name and category of icon from fontawesome
 * @param {string} icon - the name of icon,
 *  you can predefine icon styles with slashes and words after slashes
 * @return {IconInfo}
 * @example
 * - const { iconName, iconCategory } = icon_info("bell")
 * - const { iconName, iconCategory } = icon_info("bell/regular")
 */
function getIconInfoHelper(icon) {
  const hexo = this;
  const [name, category] = icon.split("/");
  const { styles } = iconsMeta?.[name] || { styles: [] };
  const [style] = styles;

  if (category && !styles.includes(category)) {
    hexo.error(`⚠ Cannot find "${icon}" icon from fontawesome.`);
  }

  return {
    iconName: name,
    iconCategory: category || style,
  };
}

module.exports = getIconInfoHelper;
