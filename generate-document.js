const pugDocGen = require("pug-doc");
const PugDocMD = require("./docs/lib/pug-doc-markdown.js");
const sassDocMD = require("@hidoo/sassdoc-to-markdown").default;
const fs = require("fs");
const path = require("path");
const rootPath = path.resolve(__dirname);
const propTypes = require("vanilla-prop-types");
const jsYml = require("js-yaml");
const uid = require("easy-uid");
const dateFormat = require("date-fns/format");
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
  page: {},
  hexoPost,
  hexoPostCategory,
  config: jsYml.load(
    fs.readFileSync(path.resolve(__dirname, `../../_config.yml`), `utf8`)
  ),
  theme: jsYml.load(
    fs.readFileSync(path.resolve(__dirname, `./_config.yml`), `utf8`)
  ),
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
  representativeImage: () => ({
    path: `imgSrc`,
    width: 100,
    height: 100,
    wUnits: "px",
    hUnits: "px",
  }),
  full_url: (url) => url,
  getIconCategory: function (icon) {
    const [name, category] = icon.split("/");
    const { styles } = iconsMeta?.[name] || { styles: [] };
    const [style] = styles;

    if (category && !styles.includes(category)) {
      console.warn(
        "\x1b[33m%s\x1b[0m",
        `⚠ Cannot find "${icon}" icon from fontawesome.`
      );
    }

    return {
      iconName: name,
      iconCategory: category || style,
    };
  },
  generateUid: () => uid(),
  dateFormat,
  _p: (str) =>
    ({
      "label.category": "category",
    }[str]),
  stripHTML: (str, len) =>
    str
      .replace(/</g, " <")
      .replace(/(<td class="gutter">)[^(td)]*(\/td>)/g, "")
      .replace(/&#(\d+);/g, (_, dec) => `${String.fromCharCode(dec)}`)
      .replace(/(<([^>]+)>)/gi, "")
      .substr(0, len || str.length)
      .replace(/\w+[,.!?]?$/, ""),
};

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
