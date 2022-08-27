const pugDocGen = require("pug-doc");
const PugDocMD = require("./docs/lib/pug-doc-markdown.js");
const sassDocMD = require("@hidoo/sassdoc-to-markdown").default;
const fs = require("fs");
const path = require("path");
const rootPath = path.resolve(__dirname);
const propTypes = require("vanilla-prop-types");
const jsYml = require("js-yaml");
const iconsMeta = (() => {
  try {
    return jsYml.load(
      fs.readFileSync(
        path.resolve(
          __dirname,
          `./node_modules/@fortawesome/fontawesome-free/metadata/icons.yml`
        ),
        `utf8`
      )
    );
  } catch (err) {
    console.warn("\x1b[33m%s\x1b[0m", `⚠ Cannot find fontawesome!`);
    return {};
  }
})();

const { url_for } = require("hexo-util");
const dateFormat = require("./scripts/helpers/date-format");
const fullUrl = require("./scripts/helpers/full-url");
const generateUid = require("./scripts/helpers/generate-uid");
const representativeImage = require("./scripts/helpers/representative-image");
const getIconCategory = require("./scripts/helpers/get-icon-category");
const stripHTML = require("./scripts/helpers/strip-html");
const truncate = require("./scripts/helpers/truncate");
const paginator = require("./scripts/helpers/paginator");

const config = jsYml.load(
  fs.readFileSync(path.resolve(__dirname, `../../_config.yml`), `utf8`)
);
const theme = jsYml.load(
  fs.readFileSync(path.resolve(__dirname, `./_config.yml`), `utf8`)
);

const hexoPostCategory = [
  {
    name: `dev-note`,
    slug: `dev-note`,
    path: `categories/dev-note/`,
    permalink: `https://example.com/categories/dev-note/`,
  },
  {
    name: `Front-End`,
    slug: `dev-note/Front-End`,
    path: `categories/dev-note/Front-End/`,
    permalink: `https://example.com/categories/dev-note/Front-End/`,
  },
];
const hexoPost = {
  title: "post title",
  thumbnail: "/upload/2022/thumbs/hero.jpg",
  date: new Date(),
  updated: new Date(),
  slug: "post-title",
  published: true,
  layout: "post",
  content: `
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Illo tempora in, aliquam ut unde harum doloribus magnam!
      Iste nulla illum explicabo tempora est dolorum,
      itaque corporis eos consequuntur exercitationem minus.
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Illo tempora in, aliquam ut unde harum doloribus magnam!
      Iste nulla illum explicabo tempora est dolorum,
      itaque corporis eos consequuntur exercitationem minus.
    </p>
  `,
  excerpt: "",
  more: `
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Illo tempora in, aliquam ut unde harum doloribus magnam!
      Iste nulla illum explicabo tempora est dolorum,
      itaque corporis eos consequuntur exercitationem minus.
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Illo tempora in, aliquam ut unde harum doloribus magnam!
      Iste nulla illum explicabo tempora est dolorum,
      itaque corporis eos consequuntur exercitationem minus.
    </p>
  `,
  path: "/post-title/",
  permalink: "http://example.com//post-title/",
  tags: {
    data: [
      {
        name: "tag",
        slug: "tag",
        path: "tags/tag/",
        permalink: "http://example.com/tags/tag/",
      },
    ],
  },
  categories: {
    data: hexoPostCategory,
  },
};
const locals = {
  page: {
    base: `/`,
  },
  hexoPost,
  hexoPostCategory,
  config,
  theme,
  site: {
    propTypes,
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
};

locals.paginator = locals.paginator.bind(locals);

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
