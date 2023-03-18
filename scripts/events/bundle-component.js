const fs = require("fs");
const path = require("path");
const rollup = require("./libs/rollup");
const { cleanUpFiles } = require("./libs/cleanup");
const { themeRoot, themeSourcePath, bundleName } = require("../constants");
const sourcePath = [
  path.resolve(themeRoot, `./components/**/*.js`),
  `!${path.resolve(themeRoot, `./components/**/lib.js`)}`,
  `!${path.resolve(themeRoot, `./components/vendor/**/*.js`)}`,
];
const outputPath = path.resolve(themeSourcePath, "./js/");

/**
 * bundle component-specific javascript files using Rollup
 * @this Hexo
 * @returns {Promise<void>}
 */
function bundleComponent() {
  const hexo = this;
  const isDevServer = hexo.env.cmd === "server";

  if (!isDevServer) {
    cleanUpFiles([path.resolve(outputPath, `./${bundleName}.map`)]);
  }
  return rollup({
    rollupOption: {
      input: sourcePath,
      output: bundleName,
    },
    isDevServer,
  }).then((result) => {
    const { code, map } = result;
    // write bundled file
    fs.writeFileSync(
      path.resolve(outputPath, `./${bundleName}`),
      map ? `${code}\n//# sourceMappingURL=/js/${bundleName}.map` : `${code}`,
      {
        encoding: `utf8`,
        flag: `w`,
      }
    );

    // write map file
    map &&
      fs.writeFileSync(
        path.resolve(outputPath, `./${bundleName}.map`),
        map.toString(),
        {
          encoding: `utf8`,
          flag: `w`,
        }
      );

    hexo.log.info(`Successfully Component's JavaScript Bundled`);
    hexo.extend.filter.unregister(`before_generate`, bundleComponent);
  });
}

module.exports = bundleComponent;
