const fs = require("fs");
const path = require("path");
const glob = require("fast-glob");
const scssProcessor = require("./libs/scss-processor");
const {
  themeConfig: { prefix: themePrefix },
  themeRoot,
} = require("../constants");
const componentsPath = path.resolve(themeRoot, `components/**/*.scss`);
const cssSourcePath = path.resolve(themeRoot, `./source/css/`);

/**
 * handler for renderer of hexo
 * @param {object} data @see https://hexo.io/api/renderer.html
 * @param {object} option @see https://hexo.io/api/renderer.html
 * @returns
 */
function scssRenderer(data, option) {
  const hexo = this;
  const isGenerateStage = hexo.env.cmd === "generate";

  if (isGenerateStage) {
    glob.sync(path.join(cssSourcePath, "./*.map")).forEach((file) => {
      fs.unlinkSync(file);
    });
  }

  return new Promise(function (resolve, reject) {
    const prepend = glob.sync([componentsPath]).reduce((code, path) => {
      // generate global variable & import statement
      return `${code}@import "${path}";\n`;
    }, `$prefix: ${themePrefix};\n`);

    const sassOption = {
      loadPaths: [cssSourcePath],
      sourceMap: true,
      sourceMapIncludeSources: true,
      style: `compressed`,
    };

    const postCssOption = {
      from: data.path,
      to: `index.css`,
    };

    scssProcessor({
      source: data.text,
      prepend,
      sassOption,
      postCssOption,
    }).then(({ css, map }) => {
      css = `@layer theme {${css}}`;
      if (!isGenerateStage && map) {
        fs.writeFileSync(
          path.resolve(cssSourcePath, `./index.css.map`),
          map.toString(),
          {
            encoding: `utf8`,
            flag: `w`,
          }
        );
        css = `${css}\n/*# sourceMappingURL=/css/index.css.map*/`;
      }

      resolve(css);
    });
  });
}

module.exports = scssRenderer;
