const fs = require("fs");
const path = require("path");
const jsYml = require("js-yaml");
const rootPath = path.resolve(__dirname, "../../../");
const { minify } = require("terser");
const { giscus } = (() => {
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

if (giscus?.repo) {
  minify(`
    (function(document){
      const theme =
        window.getThemeColor() === "dark" ? "dark_dimmed" : "github-light";
      const giscus = document.getElementById("giscus");
      giscus.async = true;
      giscus.setAttribute("crossorigin", "anonymous");
      giscus.setAttribute("data-repo", "${giscus.repo}");
      giscus.setAttribute("data-repo-id", "${giscus["repo-id"]}");
      giscus.setAttribute("data-category", "${giscus.category}");
      giscus.setAttribute("data-category-id", "${giscus["category-id"]}");
      giscus.setAttribute("data-mapping", "${giscus.mapping}");
      giscus.setAttribute("data-strict", "${giscus.strict}");
      giscus.setAttribute(
        "data-reactions-enabled", "${giscus["reactions-enabled"]}"
      );
      giscus.setAttribute("data-emit-metadata", "${giscus["emit-metadata"]}");
      giscus.setAttribute("data-input-position", "${giscus["input-position"]}");
      giscus.setAttribute("data-theme", "${theme}");
      giscus.setAttribute("data-lang", "");
      giscus.setAttribute("src","https://giscus.app/client.js");
    })(document);
  `).then(({ code }) => {
    hexo.extend.injector.register(
      `body_end`,
      `<script>${code}</script>`,
      `post`
    );
  });
}
