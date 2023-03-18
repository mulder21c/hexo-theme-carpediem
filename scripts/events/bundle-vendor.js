const fs = require("fs");
const path = require("path");
const rollup = require("./libs/rollup");
const { cleanUpFiles } = require("./libs/cleanup");
const {
  hexoConfig,
  themeRoot,
  themeConfig,
  themeSourcePath,
  vendorName,
} = require("../constants");
const outputPath = path.resolve(themeSourcePath, "./js/");
const sourcePath = [path.resolve(themeRoot, `./vendor/*.js`)];
if (themeConfig.search) {
  sourcePath.push(
    path.resolve(themeRoot, `./vendor/search/${themeConfig.search}.js`)
  );
}
// the singleton to interpolate using regular expressions
const FIX_PATTERN_MAP = {
  pattern: ``,
  matches: {},
  addPattern(key, val) {
    this.pattern += `${this.pattern ? `|` : ``}${key}`;
    this.matches[`${key}`] = val;
  },
};

FIX_PATTERN_MAP.addPattern(`themePrefix`, themeConfig.prefix);
switch (themeConfig.search) {
  case "algolia":
    FIX_PATTERN_MAP.addPattern(`{algoliaAppId}`, hexoConfig.algolia.appId);
    FIX_PATTERN_MAP.addPattern(`{algoliaApiKey}`, hexoConfig.algolia.apiKey);
    FIX_PATTERN_MAP.addPattern(
      `{algoliaIndexName}`,
      hexoConfig.algolia.indexName
    );
    break;
}

/**
 * bundling vendor javascript
 * @this Hexo
 * @returns {Promise<void>}
 */
function bundleVendor() {
  const hexo = this;
  const isDevServer = hexo.env.cmd === "server";

  if (!isDevServer) {
    cleanUpFiles([path.resolve(themeRoot, `./${vendorName}.map`)]);
  }
  return rollup({
    rollupOption: {
      input: sourcePath,
      output: vendorName,
    },
    isDevServer,
  }).then((result) => {
    const { code, map } = result;
    const fixedCode = code.replace(
      new RegExp(FIX_PATTERN_MAP.pattern, `g`),
      (matched) => FIX_PATTERN_MAP.matches[matched]
    );
    fs.writeFileSync(
      path.resolve(outputPath, `./${vendorName}`),
      map
        ? `${fixedCode}\n//# sourceMappingURL=/js/${vendorName}.map`
        : `${fixedCode}`,
      {
        encoding: `utf8`,
        flag: `w`,
      }
    );

    // write map file
    map &&
      fs.writeFileSync(
        path.resolve(outputPath, `./${vendorName}.map`),
        map.toString(),
        {
          encoding: `utf8`,
          flag: `w`,
        }
      );

    hexo.log.info(`Successfully Vendor's JavaScript Bundled`);
    hexo.extend.filter.unregister(`before_generate`, bundleVendor);
  });
}

module.exports = bundleVendor;
