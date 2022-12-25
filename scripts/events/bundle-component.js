const fs = require("fs");
const glob = require("fast-glob");
const path = require("path");
const rollup = require("./libs/rollup");
const cleanupDir = require("./libs/cleanup-dir");
const { themeRoot, themeSourcePath, bundleName } = require("../constants");
const sourcePath = [
  path.resolve(themeRoot, `./components/**/*.js`),
  `!${path.resolve(themeRoot, `./components/**/lib.js`)}`,
];
const outputPath = path.resolve(themeSourcePath, "./js/");

/**
 * bundling component's javascript
 * @returns {Promise}
 */
function bundler() {
  const hexo = this;
  const isDevServer = hexo.env.cmd === "server";
  const isGenerateStage = hexo.env.cmd === "generate";
  /**
   * determine whether to proceed with bundling
   */
  const isChanged = (() => {
    const filePath = path.resolve(outputPath, bundleName);
    const mapPath = path.resolve(outputPath, `${bundleName}.map`);

    const existsJS = fs.existsSync(filePath);
    const existsMap = fs.existsSync(mapPath);

    // consider it changed, when
    // not exists bundle file, run generate command,
    // or not exists map in dev server
    if (!existsJS || isGenerateStage || (!existsMap && isDevServer)) {
      return true;
    }

    // compare the mtime between bundled file and source files
    const { mtime: currMtime } = fs.statSync(filePath);
    return Boolean(
      glob
        .sync(path.resolve(themeRoot, `./components/**/*.js`))
        .find(
          (file) => fs.statSync(file)?.mtime.getTime() > currMtime.getTime()
        )
    );
  })();

  if (isChanged) {
    cleanupDir(outputPath);
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

      hexo.theme.addProcessor(`components`, function (file) {
        if (file.type === `update`) {
          hexo.log.info(
            `Component's JavaScript is Updated. It started re-bundling`
          );
          require(`./bundle-component`).bind(hexo)();
        }
      });

      hexo.extend.filter.unregister(`before_generate`, bundler);
    });
  }
}

module.exports = bundler;
