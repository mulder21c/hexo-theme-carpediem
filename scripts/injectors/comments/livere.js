const fs = require("fs");
const path = require("path");
const jsYml = require("js-yaml");
const rootPath = path.resolve(__dirname, "../../../");
const { livere } = (() => {
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

if (livere?.uid) {
  hexo.extend.injector.register(
    `body_end`,
    `
      <script>
      (function(d,s){var j,e = d.getElementsByTagName(s)[0];if(
      typeof LivereTower === 'function'){return}j=d.createElement(s);
      j.src='https://cdn-city.livere.com/js/embed.dist.js';j.async=true;
      e.parentNode.insertBefore(j,e);})(document, 'script');
      </script>
    `,
    `post`
  );
}
