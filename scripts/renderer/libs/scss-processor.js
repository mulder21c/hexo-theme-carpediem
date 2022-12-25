const path = require("path");
const sass = require("sass");
const postcss = require("postcss");
const cssnano = require("cssnano");
const autoprefixer = require("autoprefixer");
const postcssNested = require("postcss-nested");
const postcssPresetEnv = require("postcss-preset-env");
const { themeRoot } = require("../../constants");
const { browsers } = require(path.resolve(themeRoot, "./package.json"));

/**
 *
 * @param {object} options
 * @param {string} options.source SCSS String to Process
 * @param {string} options.prepend data to prepend to source data
 * @param {object} options.sassOption the options for sass compiler @see https://sass-lang.com/documentation/js-api/interfaces/Options
 * @param {object} options.postCssOption the options for postcss process @see https://postcss.org/api/#processoptions
 * @param {boolean} options.sync configure for synchronous process. if false, then drop asynchronous plugins
 * @returns {Promise|string}
 */
function scssProcessor({
  source,
  prepend,
  sassOption,
  postCssOption,
  sync = false,
}) {
  const scssText = source.replace(
    /(\/\*\*)\s(automated imports).+(?=\*\*\/)(\*\*\/)/,
    prepend
  );
  const { css, sourceMap } = sass.compileString(scssText || ``, sassOption);

  const postcssPlugins = sync
    ? [autoprefixer({ overrideBrowserslist: browsers })]
    : [
        postcssPresetEnv({
          browsers,
          stage: 2,
          autoprefixer: true,
        }),
        cssnano({
          browsers,
          preset: `default`,
          plugins: [postcssNested],
        }),
      ];

  return postcss(postcssPlugins).process(css, {
    ...postCssOption,
    map: {
      prev: sourceMap,
      inline: false,
    },
  });
}

module.exports = scssProcessor;
