const fs = require("fs");
const glob = require("fast-glob");
const path = require("path");
const { bundleJS } = require("../utils/bundler");
const rootPath = path.resolve(__dirname, "../../");
const sourcePath = [
  path.resolve(rootPath, `./components/**/*.js`),
  `!${path.resolve(rootPath, `./components/**/lib.js`)}`,
];
const outputPath = path.resolve(rootPath, "./source/js/");
const isDevServer = hexo.env.cmd === "server";
const isGenerateStage = hexo.env.cmd === "generate";
const fileName = `bundled.js`;

/**
 * Check mtime of existing bundled files
 * to determine whether to proceed with bundling
 */
const isChanged = (() => {
  const [currFile] = fs.readdirSync(outputPath);
  if (!currFile) {
    return true;
  } else {
    const { mtime: currFileMtime } = fs.statSync(
      path.resolve(outputPath, currFile)
    );
    return Boolean(
      glob
        .sync(path.resolve(rootPath, `./components/**/*.js`))
        .find(
          (file) => fs.statSync(file)?.mtime.getTime() > currFileMtime.getTime()
        )
    );
  }
})();

if (isChanged || isGenerateStage) {
  bundleJS({
    rollupOption: {
      input: sourcePath,
      output: fileName,
    },
    isDevServer,
  }).then(({ code, map }) => {
    // write bundled file
    fs.writeFileSync(
      path.resolve(outputPath, `./${fileName}`),
      map ? `${code}\n//# sourceMappingURL=/js/${fileName}.map` : `${code}`,
      {
        encoding: `utf8`,
        flag: `w`,
      }
    );

    // write map file
    map &&
      fs.writeFileSync(
        path.resolve(outputPath, `./${fileName}.map`),
        map.toString(),
        {
          encoding: `utf8`,
          flag: `w`,
        }
      );
  });
}

hexo.extend.injector.register(
  `body_end`,
  `
    <script data-component></script>
    <script src="/js/${fileName}"></script>
  `,
  `default`
);
