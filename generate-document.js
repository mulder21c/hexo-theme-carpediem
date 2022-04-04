const pugDocGen = require("pug-doc");
const PugDocMD = require("./docs/lib/pug-doc-markdown.js");
const sassDocMD = require("@hidoo/sassdoc-to-markdown").default;
const fs = require("fs");
const path = require("path");
const rootPath = path.resolve(__dirname);
const propTypes = require("vanilla-prop-types");

pugDocGen({
  input: path.resolve(rootPath, "./components/**/*.pug"),
  output: "./data.json",
  locals: {
    page: {},
    config: {
      title: `포스트 제목`,
    },
    theme: {
      analytics: {
        google: null,
      },
    },
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
  },
  complete: function () {
    const stream = new PugDocMD({
      output: path.resolve(rootPath, "./docs/pug/document.md"),
      input: path.resolve(rootPath, "./data.json"),
    });
    stream.on("complete", function () {
      fs.unlink(path.resolve(rootPath, "./data.json"), () => {});
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
