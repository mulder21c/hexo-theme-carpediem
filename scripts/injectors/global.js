const fs = require("fs");
const path = require("path");
const jsYml = require("js-yaml");
const rootPath = path.resolve(__dirname, "../../");
const { minify } = require("terser");
const { prefix: themePrefix } = (() => {
  try {
    return jsYml.load(
      fs.readFileSync(path.resolve(rootPath, `./_config.yml`), `utf8`)
    );
  } catch (err) {
    console.error(
      `\x1b[33m%s\x1b[0m`,
      `[bundle-js] ⚠ Cannot find _config.yml for theme!`
    );
    return {};
  }
})();

minify(`
  function makeGlobalVar(props= {}) {
    for(const [key, val] of Object.entries(props)) {
      window[key] = val;
    }
  }

  makeGlobalVar({
    themePrefix: "${themePrefix}",
    themeIdentifier: "theme",
    getThemeColor: function() {
      const config = JSON.parse(localStorage.getItem(window.themeIdentifier));
      return (!config || config.colorScheme === "auto")
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark" : "light"
        : config.colorScheme;
    },
  });
`).then(({ code }) => {
  hexo.extend.injector.register(
    `head_end`,
    `<script>${code}</script>`,
    `default`
  );
});
