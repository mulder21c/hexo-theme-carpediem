const fs = require("fs");
const path = require("path");
const jsYml = require("js-yaml");
const glob = require("fast-glob");
const { compileSCSS } = require("../utils/bundler");
const rootPath = path.resolve(__dirname, "../../");
const componentPath = path.resolve(rootPath, `components/**/*.scss`);
const cssSourcePath = path.resolve(rootPath, `./source/css/`);
const { prefix: themePrefix } = (() => {
  try {
    return jsYml.load(
      fs.readFileSync(path.resolve(rootPath, `./_config.yml`), `utf8`)
    );
  } catch (err) {
    console.error(`\x1b[33m%s\x1b[0m`, `⚠ Cannot find _config.yml for theme!`);
    return {};
  }
})();

hexo.extend.renderer.register(`scss`, `css`, (data, option) => {
  return new Promise(async function (resolve, reject) {
    const prepend = glob.sync([componentPath]).reduce((code, path) => {
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

    try {
      const result = await compileSCSS({
        source: data.text,
        prepend,
        sassOption,
        postCssOption,
      });
      if (result.map) {
        fs.writeFileSync(
          path.resolve(cssSourcePath, `./index.css.map`),
          result.map.toString(),
          {
            encoding: `utf8`,
            flag: `w`,
          }
        );
        resolve(`${result.css}\n/*# sourceMappingURL=/css/index.css.map*/`);
      } else {
        resolve(result.css);
      }
    } catch (err) {
      console.log(err);
    }
  });
});
