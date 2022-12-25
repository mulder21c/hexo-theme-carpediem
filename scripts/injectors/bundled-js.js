const { bundleName } = require("../constants");
hexo.extend.injector.register(
  `body_end`,
  `
    <script data-component></script>
    <script src="/js/${bundleName}"></script>
  `,
  `default`
);
