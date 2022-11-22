const fs = require("fs");
const path = require("path");
const jsYml = require("js-yaml");
const glob = require("fast-glob");
const { compileInlineSCSS } = require("../utils/bundler");
const rootPath = path.resolve(__dirname, "../../");
const cssSourcePath = path.resolve(rootPath, `./source/css/`);
const { prefix: themePrefix } = (() => {
  try {
    return jsYml.load(
      fs.readFileSync(path.resolve(rootPath, `./_config.yml`), `utf8`)
    );
  } catch (err) {
    console.error(`\x1b[33m%s\x1b[0m`, `⚠ Cannot find _config.yml for theme!`);
    return {};
  }
})();

const functions = fs.readFileSync(
  path.join(cssSourcePath, "./helpers/_functions.scss")
);
const mixins = fs.readFileSync(
  path.join(cssSourcePath, "./helpers/_mixins.scss")
);
const variables = fs.readFileSync(
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
 * @function compileSCSSHelper
 * @param {string} css sa(c)ss for processing of post
 * @returns {string}
 */
function compileSCSSHelper(css) {
  const result = compileInlineSCSS({
    source: `@use "sass:math"; ${functions} ${mixins} ${variables} ${css}`,
    prepend,
    sassOption,
    postCssOption,
    useCssNano: false,
  });

  return result;
}

module.exports = compileSCSSHelper;
