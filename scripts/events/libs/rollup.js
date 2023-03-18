const path = require("path");
const { rollup } = require("rollup");
const multi = require("@rollup/plugin-multi-entry");
const { babel, getBabelOutputPlugin } = require("@rollup/plugin-babel");
const terser = require("@rollup/plugin-terser");
const { themeRoot } = require("../../constants");

/**
 * @typedef {object} BundledJS
 * @property {string} code the result code of bundling javascript files
 * @property {object} map the sourceMap object of bundling javascript files
 * @property {string} fileName the fileName from result output of rollup
 */

/**
 * bundle & transpile with babel through rollup
 * @param {object} param
 * @param {object} param.rollupOption options for rollup, See {@link https://rollupjs.org/guide/en/#inputoptions-object}
 * @param {boolean} param.isDevServer whether it is in dev-server or not
 * @returns {Promise<BundledJS>}
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
        configFile: path.resolve(themeRoot, "babel.config.js"),
        sourceMaps: !!isDevServer,
      }),
    ],
    sourcemap: !!isDevServer,
  };

  return rollup(inputOption).then((bundle) => {
    return bundle.generate(outputOption).then(({ output }) => {
      const [{ code, map, fileName }] = output;
      return {
        code,
        map,
        fileName,
      };
    });
  });
}

module.exports = bundleJS;
