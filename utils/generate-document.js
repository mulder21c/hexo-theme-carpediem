const fs = require("fs");
const path = require("path");
const Hexo = require("hexo");
const pugDocGen = require("pug-doc");
const PugDocMD = require("./pug-doc-markdown.js");
const sassDocMD = require("@hidoo/sassdoc-to-markdown").default;
const jsdoc2md = require("jsdoc-to-markdown");
const rootPath = path.resolve(__dirname, `../`);
const jsYml = require("js-yaml");
const { truncate } = require("lodash");

const hexo = new Hexo(path.resolve(process.cwd(), "../../"), {
  config: path.resolve(process.cwd(), "../../_config.yml"),
});

const theme = jsYml.load(
  fs.readFileSync(path.resolve(rootPath, `./_config.yml`), `utf8`)
);

hexo.init().then(function () {
  hexo.database.load().then(function () {
    // the data needed to generate documents
    const locals = {
      ...hexo.locals.toObject(),
      isMock: true,
      post: hexo.locals.toObject().posts.eq(0),
      site: {
        ...hexo.locals.toObject(),
        mode: "production",
      },
      config: hexo.config,
      theme: {
        ...theme,
        links: [
          {
            name: `portfolio`,
            url: `https://my-portfolio.com`,
          },
          {
            name: `works`,
            url: `https://my-works.com`,
          },
        ],
      },
      url: hexo.config.url,
      is_home: () => true,
      is_post: () => false,
      is_archive: () => false,
      is_category: () => false,
      is_tag: () => false,
      url_for: (url) => url,
      _p: (str) => {
        switch (str) {
          case "label.category":
            return `category`;
          case "label.date.published":
            return `published`;
          case "label.search":
            return `search`;
          case "label.posts.default":
            return `posts`;
          case "label.pagination.prev":
            return `prev page`;
          case "label.pagination.next":
            return `next page`;
          case "label.posts.yearly":
            return `timeline of posts`;
        }
      },
      mode: `production`,
    };

    locals.post.permalink = locals.post.toObject().permalink;
    locals.page = {
      base: "",
      total: 2,
      current: 1,
      current_url: "",
      posts: hexo.locals.toObject().posts,
      prev: 0,
      prev_link: "",
      next: 2,
      next_link: "page/2/",
      __index: true,
      path: "index.html",
      lang: "ko",
      canonical_path: "index.html",
    };
    locals.representative_image =
      require("../scripts/helpers/representative-image").bind(locals);
    locals.icon_info = require("../scripts/helpers/get-icon-info").bind(locals);
    locals.strip_html = require("../scripts/helpers/strip-html").bind(locals);
    locals.truncate = require("../scripts/helpers/truncate").bind(locals);
    locals.paginator = require("../scripts/helpers/paginator").bind(locals);
    locals.list_categories = require("../scripts/helpers/list-categories").bind(
      locals
    );
    locals.list_menus = require("../scripts/helpers/list-menus").bind(locals);
    locals.list_links = require("../scripts/helpers/list-links").bind(locals);
    locals.archive_map = require(`../scripts/helpers/get-archive-map`).bind(
      locals
    );
    locals.moment = require("moment").bind(locals);
    locals.generate_uid = require("../scripts/helpers/generate-uid").bind(
      locals
    );
    locals.full_url = require("../scripts/helpers/full-url").bind(locals);
    locals.open_graph = require("../scripts/helpers/open-graph").bind(locals);

    pugDocGen({
      input: path.resolve(rootPath, "./components/atoms/**/*.pug"),
      output: "./data-atoms.json",
      locals,
      complete: function () {
        const stream = new PugDocMD({
          output: path.resolve(rootPath, "./docs/en/pug/atoms.md"),
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
          output: path.resolve(rootPath, "./docs/en/pug/molecules.md"),
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
          output: path.resolve(rootPath, "./docs/en/pug/organisms.md"),
          input: path.resolve(rootPath, "./data-organisms.json"),
        });
        stream.on("complete", function () {
          fs.unlink(path.resolve(rootPath, "./data-organisms.json"), () => {});
        });
      },
    });
    pugDocGen({
      input: path.resolve(rootPath, "./components/utils/**/*.pug"),
      output: "./data-utils.json",
      locals,
      complete: function () {
        const stream = new PugDocMD({
          output: path.resolve(rootPath, "./docs/en/pug/utils.md"),
          input: path.resolve(rootPath, "./data-utils.json"),
        });
        stream.on("complete", function () {
          fs.unlink(path.resolve(rootPath, "./data-utils.json"), () => {});
        });
      },
    });

    sassDocMD(path.resolve(rootPath, `./source/css/**/*.scss`)).then((md) => {
      const dir = path.resolve(rootPath, `./docs/en/scss`);

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
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

    jsdoc2md
      .render({
        files: "./scripts/helpers/*.js",
        "example-lang": "jade",
        separators: true,
      })
      .then((output) => {
        const dir = path.resolve(rootPath, `./docs/en/script/`);

        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(path.resolve(dir, `helpers.md`), output);
      });
  });
});
