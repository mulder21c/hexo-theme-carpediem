const path = require("path");
const sass = require("sass");
const glob = require("fast-glob");
const postcss = require("postcss");
const cssnano = require("cssnano");
const postcssNested = require("postcss-nested");
const postcssPresetEnv = require("postcss-preset-env");
const rootPath = path.resolve(__dirname, `../`);
const isDevServer = hexo.env.cmd === `server`;

hexo.extend.renderer.register(
  `scss`,
  `css`,
  async (data, options) => {
    // for importing sass from components directory
    const prependData = glob
      .sync([path.resolve(rootPath, `components/**/*.scss`)])
      .reduce((prepend, path) => {
        return `${prepend}@import "${path}";\n`;
      }, ``);

    const sourceText = data.text.replace(
      /(\/\*\*)\s(automated imports).+(?=\*\*\/)(\*\*\/)/,
      prependData
    );

    const { css: $css, sourceMap: $sourceMap } = sass.compileString(
      sourceText || ``,
      {
        loadPaths: [
          path.resolve(rootPath, `./components`),
          path.resolve(rootPath, `./source/css`),
        ],
        sourceMap: isDevServer,
        sourceMapIncludeSources: true,
        style: `compressed`,
      }
    );

    const sourceMapHash = (
      $sourceMap ? Buffer.from(JSON.stringify($sourceMap), "utf8") || "" : ""
    ).toString("base64");
    const sourceMapComment = `/*# sourceMappingURL=data:application/json;charset=utf-8;base64,${sourceMapHash} */`;

    /**
     * Processing POSTCSS
     */
    const postProcessed = await postcss([
      postcssPresetEnv({ stage: 2, autoprefixer: { grid: true } }),
      cssnano({
        preset: `default`,
        plugins: [postcssNested],
      }),
    ]).process($css.toString(), { from: data.path });

    const result = `${postProcessed.css}\n\n${sourceMapComment}`;
    return result;
  },
  true
);
