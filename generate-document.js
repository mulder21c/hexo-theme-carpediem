const fs = require("fs");
const pugDocGen = require("pug-doc");
const PugDocMD = require("./docs/lib/pug-doc-markdown.js");
const sassDocMD = require("@hidoo/sassdoc-to-markdown").default;
const path = require("path");
const rootPath = path.resolve(__dirname);
const propTypes = require("vanilla-prop-types");
const jsYml = require("js-yaml");

const dateFormat = require("./scripts/helpers/date-format");
const fullUrl = require("./scripts/helpers/full-url");
const generateUid = require("./scripts/helpers/generate-uid");
const representativeImage = require("./scripts/helpers/representative-image");
const getIconCategory = require("./scripts/helpers/get-icon-category");
const stripHTML = require("./scripts/helpers/strip-html");
const truncate = require("./scripts/helpers/truncate");
const paginator = require("./scripts/helpers/paginator");
const listCategories = require("./scripts/helpers/list-categories");
const page = require("./mock");
const [post] = require("./mock/posts")({
  domain: `http://example.com`,
  count: 1,
});
const categoryGenerator = require("./mock/categories");

const config = jsYml.load(
  fs.readFileSync(path.resolve(__dirname, `../../_config.yml`), `utf8`)
);
const theme = jsYml.load(
  fs.readFileSync(path.resolve(__dirname, `./_config.yml`), `utf8`)
);
const domain = config.url || `http://example.com`;
const categories = categoryGenerator({ count: 3, domain });

const locals = {
  isMock: true,
  page,
  post,
  categories,
  config,
  theme,
  site: {
    propTypes,
    categories,
  },
  url: `URL`,
  is_home: () => true,
  is_post: () => false,
  is_archive: () => false,
  is_category: () => false,
  is_tag: () => false,
  url_for: (url) => url,
  open_graph: (obj) => `
    <meta property="og:title" content="Hexo">
    <meta property="og:url" content="http://example.com/">
    <meta property="og:site_name" content="Hexo">
    <meta property="og:locale" content="ko_KR">
    <meta property="article:author" content="John Doe">
    <meta name="twitter:card" content="summary">
    ...
  `,
  representativeImage,
  fullUrl,
  getIconCategory,
  generateUid,
  dateFormat,
  stripHTML,
  _p: (str) => `i18n(${str})`,
  truncate,
  paginator,
  listCategories,
};
locals.fullUrl = locals.fullUrl.bind(locals);
locals.paginator = locals.paginator.bind(locals);
locals.listCategories = locals.listCategories.bind(locals);

pugDocGen({
  input: path.resolve(rootPath, "./components/atoms/**/*.pug"),
  output: "./data-atoms.json",
  locals,
  complete: function () {
    const stream = new PugDocMD({
      output: path.resolve(rootPath, "./docs/pug/atoms.md"),
      input: path.resolve(rootPath, "./data-atoms.json"),
    });
    stream.on("complete", function () {
      fs.unlink(path.resolve(rootPath, "./data-atoms.json"), () => {});
    });
  },
});
pugDocGen({
  input: path.resolve(rootPath, "./components/molecules/**/*.pug"),
  output: "./data-molecules.json",
  locals,
  complete: function () {
    const stream = new PugDocMD({
      output: path.resolve(rootPath, "./docs/pug/molecules.md"),
      input: path.resolve(rootPath, "./data-molecules.json"),
    });
    stream.on("complete", function () {
      fs.unlink(path.resolve(rootPath, "./data-molecules.json"), () => {});
    });
  },
});
pugDocGen({
  input: path.resolve(rootPath, "./components/organisms/**/*.pug"),
  output: "./data-organisms.json",
  locals,
  complete: function () {
    const stream = new PugDocMD({
      output: path.resolve(rootPath, "./docs/pug/organisms.md"),
      input: path.resolve(rootPath, "./data-organisms.json"),
    });
    stream.on("complete", function () {
      fs.unlink(path.resolve(rootPath, "./data-organisms.json"), () => {});
    });
  },
});
pugDocGen({
  input: path.resolve(rootPath, "./components/templates/**/*.pug"),
  output: "./data-templates.json",
  locals,
  complete: function () {
    const stream = new PugDocMD({
      output: path.resolve(rootPath, "./docs/pug/templates.md"),
      input: path.resolve(rootPath, "./data-templates.json"),
    });
    stream.on("complete", function () {
      fs.unlink(path.resolve(rootPath, "./data-templates.json"), () => {});
    });
  },
});
pugDocGen({
  input: path.resolve(rootPath, "./components/utils/**/*.pug"),
  output: "./data-utils.json",
  locals,
  complete: function () {
    const stream = new PugDocMD({
      output: path.resolve(rootPath, "./docs/pug/utils.md"),
      input: path.resolve(rootPath, "./data-utils.json"),
    });
    stream.on("complete", function () {
      fs.unlink(path.resolve(rootPath, "./data-utils.json"), () => {});
    });
  },
});

sassDocMD(path.resolve(rootPath, `./source/css/**/*.scss`)).then((md) => {
  const dir = path.resolve(rootPath, `./docs/scss`);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  fs.writeFile(
    path.join(dir, `document.md`),
    md,
    {
      encoding: `utf-8`,
    },
    (err) => {
      if (err) throw err;
    }
  );
});
