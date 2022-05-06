const fs = require("fs");
const path = require("path");
const glob = require("fast-glob");
const Concat = require("concat-with-sourcemaps");
const babel = require("@babel/core");
const { minify } = require("terser");
const rootPath = path.resolve(__dirname, "../");
const { browsers } = require(path.resolve(rootPath, "package.json"));
const jsYml = require("js-yaml");
const sourcePath = path.resolve(__dirname, "../source/js");
const js = hexo.extend.helper.get("js").bind(hexo);
const isDevServer = hexo.env.cmd === "server";
const isGenerate = hexo.env.cmd === "generate" || hexo.env.args.generate;

const babelOpt = {
  root: rootPath,
  babelrcRoots: rootPath,
  targets: browsers,
  inputSourceMap: isDevServer ? true : false,
  minified: isDevServer ? false : true,
  sourceMaps: isDevServer ? "inline" : false,
};
/**
 * if file exists, remove file
 * @param {string} file
 */
const removeFile = (file) => {
  fs.existsSync(file) && fs.unlinkSync(file);
};

/**
 * inject script into body
 * @param {string} code
 */
const injectScript = (code) => {
  if (!code) return;
  hexo.extend.injector.register(
    `body_end`,
    `<script>${code}</script>`,
    `default`
  );
};

// get theme prefix from _config.yml
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

/**
 * inject javascript for components into rendered html
 * @param {Object} option
 * @param {string} option.prepend - script to append at the first
 */
const injectScriptForComponent = ({ prepend }) => {
  hexo.extend.injector.register(
    `body_end`,
    `<script src="js/utils.js"></script>`,
    `default`
  );
  injectScript(prepend);
  glob
    .sync([path.resolve(rootPath, `./components/**/*.js`)])
    .forEach((file) => {
      const transformed = babel.transformSync(fs.readFileSync(file, `utf-8`), {
        ...babelOpt,
        sourceFileName: file,
      });
      injectScript(transformed.code);
    });
};

/**
 * bundling javascript files for components & inject bundled script into rendered html
 * @param {Object} option
 * @param {string} option.prepend - script to bundle at the first
 * @param {string} option.fileName - the file name to be bundled and generated
 */
const bundleComponentScript = async ({ prepend, fileName }) => {
  removeFile(path.resolve(sourcePath, fileName));

  const concat = new Concat(true, fileName, `\n`);
  concat.add(null, prepend);

  glob
    .sync([path.resolve(rootPath, `./components/**/*.js`)])
    .forEach((file) => {
      const transformed = babel.transformSync(fs.readFileSync(file, `utf-8`), {
        ...babelOpt,
        sourceFileName: file,
      });
      concat.add(file, transformed.code);
    });

  const minified = await minify(concat.content.toString());

  fs.writeFileSync(path.resolve(sourcePath, fileName), minified.code, {
    encoding: `utf8`,
    flag: `w`,
  });

  hexo.extend.injector.register(
    `body_end`,
    `<script src="js/utils.js"></script>`,
    `default`
  );
  hexo.extend.injector.register(
    `body_end`,
    () => {
      return js("/js/bundle.js");
    },
    `default`
  );
};

/**
 * @desc process for after initialized hexo
 */
hexo.extend.filter.register(`after_init`, () => {
  const global = {
    themePrefix,
  };
  isDevServer &&
    injectScriptForComponent({
      prepend: `var GLOBAL = ${JSON.stringify(global)};`,
    });
  isGenerate &&
    bundleComponentScript({
      prepend: `const GLOBAL = ${JSON.stringify(global)};`,
      fileName: `bundle.js`,
    });
});
