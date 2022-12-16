const fs = require("fs");
const path = require("path");
const jsYml = require("js-yaml");
const cleanDirectory = require("../utils/remove-file");
const { bundleJS } = require("../utils/bundler");
const rootPath = path.resolve(__dirname, "../../");
const sourcePath = [
  path.resolve(rootPath, `./components/**/*.js`),
  `!${path.resolve(rootPath, `./components/**/lib.js`)}`,
];
const outputPath = path.resolve(rootPath, "./source/js/");
const isDevServer = hexo.env.cmd === "server";
const isCleanStage = hexo.env.cmd === "clean";
let bundleFileName = `bundle.js`;

cleanDirectory(outputPath).then(() => {
  bundleJS({
    rollupOption: {
      input: sourcePath,
      output: bundleFileName,
    },
    isDevServer,
  }).then(({ code, map, fileName }) => {
    if (isCleanStage) return;

    bundleFileName = isDevServer ? fileName : bundleFileName;

    // write bundled file
    fs.writeFileSync(
      path.resolve(outputPath, `./${bundleFileName}`),
      `${code}\n//# sourceMappingURL=/js/${bundleFileName}.map`,
      {
        encoding: `utf8`,
        flag: `w`,
      }
    );

    // write map file
    map &&
      fs.writeFileSync(
        path.resolve(outputPath, `./${bundleFileName}.map`),
        map.toString(),
        {
          encoding: `utf8`,
          flag: `w`,
        }
      );

    hexo.extend.injector.register(
      `body_end`,
      `
        <script data-component></script>
        <script src="/js/${bundleFileName}"></script>
      `,
      `default`
    );
  });
});
