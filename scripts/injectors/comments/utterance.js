const { minify } = require("terser");
const {
  themeConfig: { utterance },
} = require("../../constants");

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
      `post`
    );
  });
}
