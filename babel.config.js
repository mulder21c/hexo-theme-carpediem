const { browsers } = require("./package.json");

module.exports = function (api) {
  api.cache(true);

  const presets = ["@babel/preset-env"];
  const plugins = [];

  return {
    presets,
    plugins,
    targets: browsers,
    sourceType: "script",
    comments: false,
  };
};
