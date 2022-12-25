const {
  themeConfig: { commento },
} = require("../../constants");

if (commento?.host) {
  const { host } = commento;
  hexo.extend.injector.register(
    `body_end`,
    `<script defer src=${host.replace(/\/$/, "")}/js/commento.js></script>`,
    `post`
  );
}
