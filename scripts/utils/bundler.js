const path = require("path");
const { rollup } = require("rollup");
const multi = require("@rollup/plugin-multi-entry");
const { babel, getBabelOutputPlugin } = require("@rollup/plugin-babel");
const terser = require("@rollup/plugin-terser");
const sass = require("sass");
const postcss = require("postcss");
const cssnano = require("cssnano");
const autoprefixer = require("autoprefixer");
const postcssNested = require("postcss-nested");
const postcssPresetEnv = require("postcss-preset-env");
const rootPath = path.resolve(__dirname, "../../");
const { browsers } = require(path.resolve(rootPath, "./package.json"));

/**
 * @typedef {Object} BundledJS
 * @property {string} code the result code of bundling javascript files
 * @property {object} map the sourceMap object of bundling javascript files
 * @property {string} fileName the fileName from result output of rollup
 */

/**
 * bundle & transpile with babel through rollup
 * @param {object} param.rollupOption @see https://rollupjs.org/guide/en/#inputoptions-object
 * @param {boolean} param.isDevServer whether it is in dev-server or not
 * @returns {BundledJS}
 */
function bundleJS({ rollupOption, isDevServer }) {
  const inputOption = {
    ...rollupOption,
    plugins: [multi(), babel({ babelHelpers: `bundled` }), terser()],
  };
  const outputOption = {
    format: "es",
    plugins: [
      getBabelOutputPlugin({
        configFile: path.resolve(rootPath, "babel.config.js"),
        sourceMaps: !!isDevServer,
      }),
    ],
    sourcemap: !!isDevServer,
  };

  return rollup(inputOption).then(async (bundle) => {
    const result = await bundle.generate(outputOption);
    const [{ code, map, fileName }] = result.output;

    return {
      code,
      map,
      fileName,
    };
  });
}

/**
 * compile scss & post-precessing with postcss
 * @param {object} param
 * @param {string} param.source the source code to compile
 * @param {string} param.prepend prepend data apply to sass compiler
 * @param {object} param.sassOption @see https://sass-lang.com/documentation/js-api/interfaces/StringOptionsWithoutImporter
 * @param {object} param.postCssOption @see https://postcss.org/api/#processoptions
 * @returns {object} result of postcss @see https://postcss.org/api/#result
 */
function compileSCSS({ source, prepend, sassOption, postCssOption }) {
  const scssText = source.replace(
    /(\/\*\*)\s(automated imports).+(?=\*\*\/)(\*\*\/)/,
    prepend
  );

  const { css, sourceMap } = sass.compileString(scssText || ``, sassOption);

  return postcss([
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
  ]).process(css, {
    ...postCssOption,
    map: {
      prev: sourceMap,
      inline: false,
    },
  });
}

/**
 * compile scss & post-precessing with postcss for post-specific scss
 * @param {object} param
 * @param {string} param.source the source code to compile
 * @param {string} param.prepend prepend data apply to sass compiler
 * @param {object} param.sassOption @see https://sass-lang.com/documentation/js-api/interfaces/StringOptionsWithoutImporter
 * @param {object} param.postCssOption @see https://postcss.org/api/#processoptions
 * @returns {string} result css of postcss
 */
function compileInlineSCSS({ source, prepend, sassOption, postCssOption }) {
  const scssText = source.replace(
    /(\/\*\*)\s(automated imports).+(?=\*\*\/)(\*\*\/)/,
    prepend
  );

  const { css } = sass.compileString(scssText || ``, sassOption);

  const result = postcss([
    autoprefixer({ overrideBrowserslist: browsers }),
  ]).process(css, {
    ...postCssOption,
  });

  return result.css || ``;
}

module.exports = {
  bundleJS,
  compileSCSS,
  compileInlineSCSS,
};
