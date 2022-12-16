const fs = require("fs");
const path = require("path");
const jsYml = require("js-yaml");
const rootPath = path.resolve(__dirname, "../../../");
const { minify } = require("terser");
const { utterance } = (() => {
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

if (utterance?.repo) {
  minify(`
    (function(document){
      const theme =
        window.getThemeColor() === "dark" ? "icy-dark" : "github-light";
      const utterance = document.getElementById("utterance");
      utterance.async = true;
      utterance.setAttribute("crossorigin", "anonymous");
      utterance.setAttribute("repo", "${utterance.repo}");
      utterance.setAttribute("issue-term", "${utterance.issue_term || ""}");
      utterance.setAttribute("issue_number", "${utterance.issue_number || ""}");
      utterance.setAttribute("theme", theme);
      utterance.setAttribute("src","https://utteranc.es/client.js");
    })(document);
  `).then(({ code }) => {
    hexo.extend.injector.register(
      `body_end`,
      `<script>${code}</script>`,
      `default`
    );
  });
}
