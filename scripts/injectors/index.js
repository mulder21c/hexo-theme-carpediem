const injector = hexo.extend.injector;
const fsPromises = require("fs/promises");
const path = require("path");
const { minify } = require("terser");
const {
  themeConfig: { prefix: themePrefix, viewer360 },
  themeRoot,
  bundleName,
  vendorName,
} = require("../constants");

const globalVars = fsPromises
  .readFile(path.resolve(themeRoot, `components/vendor/global-vars.js`), {
    encoding: `utf-8`,
  })
  .then((data) => minify(data.replace(/{themePrefix}/g, themePrefix)));

Promise.all([globalVars]).then(([globalVars]) => {
  // globalVars
  injector.register(
    `head_end`,
    `<script>${globalVars.code}</script>`,
    `default`
  );

  if (viewer360) {
    injector.register(
      `head_end`,
      `<link rel="stylesheet" href="/css/vendor/pannellum.css" />`,
      `post`
    );
  }

  // bundle
  injector.register(
    `body_end`,
    `<script data-component></script><script src="/js/${bundleName}"></script>`,
    `default`
  );

  if (hexo.config.algolia?.appId) {
    injector.register(
      `body_end`,
      `<script src="/js/algoliasearch-lite.umd.js"></script>
       <script src="/js/instantsearch.production.min.js"></script>`,
      `search`
    );
  }

  if (viewer360) {
    injector.register(
      `body_end`,
      `<script src="/js/pannellum.js"></script>`,
      `post`
    );
  }

  //vendor
  injector.register(
    `body_end`,
    `<script src="/js/${vendorName}"></script>`,
    `default`
  );
});
