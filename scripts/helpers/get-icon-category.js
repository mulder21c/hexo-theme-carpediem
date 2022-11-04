const fs = require("fs");
const path = require("path");
const jsYml = require("js-yaml");
const nodeModulePath = path.resolve(__dirname, `../../node_modules/`);
const iconsMeta = (() => {
  try {
    return jsYml.load(
      fs.readFileSync(
        path.resolve(
          nodeModulePath,
          `./@fortawesome/fontawesome-free/metadata/icons.yml`
        ),
        `utf8`
      )
    );
  } catch (err) {
    console.warn("\x1b[33m%s\x1b[0m", `⚠ Cannot find fontawesome!`);
    return {};
  }
})();

/**
 * @typedef {Object} IconInfo
 * @property {string} iconName
 * @property {string} iconCategory
 */

/**
 * @desc Get name and category of icon from fontawesome
 * @param {string} icon - the name of icon,
 *  you can predefine icon styles with slashes and words after slashes
 * @example getIconCategory("bell")
 * @example getIconCategory("bell/regular")
 * @return {IconInfo}
 */
function getIconCategoryHelper(icon) {
  const [name, category] = icon.split("/");
  const { styles } = iconsMeta?.[name] || { styles: [] };
  const [style] = styles;

  if (category && !styles.includes(category)) {
    console.warn(
      "\x1b[33m%s\x1b[0m",
      `⚠ Cannot find "${icon}" icon from fontawesome.`
    );
    return null;
  }

  return {
    iconName: name,
    iconCategory: category || style,
  };
}

module.exports = getIconCategoryHelper;
