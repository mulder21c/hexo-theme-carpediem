const fs = require("fs");
const path = require("path");
const jsYml = require("js-yaml");
const rootPath = path.resolve(__dirname, "../../../");
const { commento } = (() => {
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

if (commento?.host) {
  const { host } = commento;
  hexo.extend.injector.register(
    `body_end`,
    `<script defer src=${host.replace(/\/$/, "")}/js/commento.js></script>`,
    `post`
  );
}
