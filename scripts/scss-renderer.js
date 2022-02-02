const path = require("path");
const sass = require("sass");
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
    /**
     * Compiling SCSS
     */
    const compiledSCSS = sass.compileString(data?.text || ``, {
      loadPaths: [path.resolve(rootPath, `./source/css`)],
      sourceMap: isDevServer,
      sourceMapIncludeSources: true,
      style: `compressed`,
    });
    const compiledCSS = compiledSCSS.css.toString();
    const sourceMapHash = (
      Buffer.from(JSON.stringify(compiledSCSS.sourceMap), "utf8") || ""
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
    ]).process(compiledCSS, { from: data.path });

    const result = `${postProcessed.css}\n\n${sourceMapComment}`;
    return result;
  },
  true
);
