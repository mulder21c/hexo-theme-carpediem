const path = require("path");
const loadYml = require("./utils/load-yaml");
const themeRoot = path.resolve(__dirname, "../");
const themeSourcePath = path.resolve(themeRoot, "./source");
const hexoRoot = path.resolve(themeRoot, "./../../");
const hexoSourcePath = path.resolve(hexoRoot, "./source");
const bundleName = `bundle.js`;
const vendorName = `vendor.js`;
const themeConfig = loadYml(
  path.resolve(themeRoot, `./_config.yml`),
  `⚠ Cannot find theme config!`
);
const hexoConfig = loadYml(
  path.resolve(hexoRoot, `./_config.yml`),
  `⚠ Cannot find hexo config!`
);

module.exports = {
  hexoRoot,
  hexoSourcePath,
  hexoConfig,
  themeRoot,
  themeSourcePath,
  themeConfig,
  bundleName,
  vendorName,
  responseImage: themeConfig.img_sizes || {},
};
