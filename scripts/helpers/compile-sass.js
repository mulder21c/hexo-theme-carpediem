const fs = require("fs");
const path = require("path");
const scssProcessor = require("../renderer/libs/scss-processor");
const {
  themeConfig: { prefix: themePrefix },
  themeSourcePath,
} = require("../constants");
const cssSourcePath = path.resolve(themeSourcePath, `./css/`);

const scssFunctions = fs.readFileSync(
  path.join(cssSourcePath, "./helpers/_functions.scss")
);
const sassMixins = fs.readFileSync(
  path.join(cssSourcePath, "./helpers/_mixins.scss")
);
const sassVariables = fs.readFileSync(
  path.join(cssSourcePath, "./modules/_variables.scss")
);

const prepend = `$prefix: ${themePrefix};\n`;

const sassOption = {
  loadPaths: [cssSourcePath],
  sourceMap: false,
  sourceMapIncludeSources: false,
  style: `compressed`,
};

const postCssOption = {
  from: undefined,
};

/**
 * @public
 * @function
 * @alias compile_sass
 * @desc Compile post(page)-specific SA(C)SS
 * @param {string} css SA(C)SS for processing
 * @returns {string}
 * @example
 * if page.style
 *   style
 *     != compile_sass(page.style)
 */
function compileSCSSHelper(css) {
  return scssProcessor({
    source: `@use "sass:math"; /** automated imports; **/
      ${scssFunctions} ${sassMixins} ${sassVariables} @layer custom {${css}}`,
    prepend,
    sassOption,
    postCssOption,
    useCssNano: false,
    sync: true,
  }).css;
}

module.exports = compileSCSSHelper;
