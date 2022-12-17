const fs = require("fs");
const glob = require("fast-glob");
const path = require("path");
const cleanDirectory = require("../utils/remove-file");
const uid = require("../helpers/generate-uid");
const { bundleJS } = require("../utils/bundler");
const rootPath = path.resolve(__dirname, "../../");
const sourcePath = [
  path.resolve(rootPath, `./components/**/*.js`),
  `!${path.resolve(rootPath, `./components/**/lib.js`)}`,
];
const outputPath = path.resolve(rootPath, "./source/js/");
const isDevServer = hexo.env.cmd === "server";
const isCleanStage = hexo.env.cmd === "clean";

/**
 * Check mtime of existing bundled files
 * to determine whether to proceed with bundling
 */
const { isChanged, fileName } = (() => {
  const [currFile] = fs.readdirSync(outputPath);
  if (!currFile) {
    return {
      fileName: `${uid()}.js`,
      isChanged: true,
    };
  } else {
    const { mtime: currFileMtime } = fs.statSync(
      path.resolve(outputPath, currFile)
    );
    const isChanged = Boolean(
      glob
        .sync(path.resolve(rootPath, `./components/**/*.js`))
        .find(
          (file) => fs.statSync(file)?.mtime.getTime() > currFileMtime.getTime()
        )
    );
    return {
      fileName: isChanged ? `${uid()}.js` : currFile,
      isChanged,
    };
  }
})();

// if on clean stage, forcefully clean up
isCleanStage && cleanDirectory(outputPath);

if (isChanged) {
  cleanDirectory(outputPath);
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
      `${code}\n//# sourceMappingURL=/js/${fileName}.map`,
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
