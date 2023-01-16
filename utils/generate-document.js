const fs = require("fs");
const path = require("path");
const Hexo = require("hexo");
const pugDocGen = require("pug-doc");
const PugDocMD = require("./pug-doc-markdown.js");
const sassDocMD = require("@hidoo/sassdoc-to-markdown").default;
const rootPath = path.resolve(__dirname, `../`);
const jsYml = require("js-yaml");
const page = require("../mock");

const hexo = new Hexo(path.resolve(process.cwd(), "../../"), {
  config: path.resolve(process.cwd(), "../../_config.yml"),
});

const theme = jsYml.load(
  fs.readFileSync(path.resolve(rootPath, `./_config.yml`), `utf8`)
);

hexo.init().then(function () {
  hexo.database.load().then(function () {
    const locals = {
      isMock: true,
      page,
      post: hexo.locals.toObject().posts.eq(0),
      ...hexo.locals.toObject(),
      site: {
        ...hexo.locals.toObject(),
        mode: "production",
      },
      config: hexo.config,
      theme,
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
        }
      },
      mode: `production`,
    };

    locals.representativeImage =
      require("../scripts/helpers/representative-image").bind(locals);
    locals.getIconCategory =
      require("../scripts/helpers/get-icon-category").bind(locals);
    locals.stripHTML = require("../scripts/helpers/strip-html").bind(locals);
    locals.truncate = require("../scripts/helpers/truncate").bind(locals);
    locals.paginator = require("../scripts/helpers/paginator").bind(locals);
    locals.listCategories = require("../scripts/helpers/list-categories").bind(
      locals
    );
    locals.listMenus = require("../scripts/helpers/list-menus").bind(locals);
    locals.listLinks = require("../scripts/helpers/list-links").bind(locals);
    locals.mapArchives = require(`../scripts/helpers/map-archives`).bind(
      locals
    );
    locals.moment = require("moment").bind(locals);
    locals.generateUid = require("../scripts/helpers/generate-uid").bind(
      locals
    );
    locals.fullUrl = require("../scripts/helpers/full-url").bind(locals);
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
    // pugDocGen({
    //   input: path.resolve(rootPath, "./components/molecules/**/*.pug"),
    //   output: "./data-molecules.json",
    //   locals,
    //   complete: function () {
    //     const stream = new PugDocMD({
    //       output: path.resolve(rootPath, "./docs/en/pug/molecules.md"),
    //       input: path.resolve(rootPath, "./data-molecules.json"),
    //     });
    //     stream.on("complete", function () {
    //       fs.unlink(path.resolve(rootPath, "./data-molecules.json"), () => {});
    //     });
    //   },
    // });
    // pugDocGen({
    //   input: path.resolve(rootPath, "./components/organisms/**/*.pug"),
    //   output: "./data-organisms.json",
    //   locals,
    //   complete: function () {
    //     const stream = new PugDocMD({
    //       output: path.resolve(rootPath, "./docs/en/pug/organisms.md"),
    //       input: path.resolve(rootPath, "./data-organisms.json"),
    //     });
    //     stream.on("complete", function () {
    //       fs.unlink(path.resolve(rootPath, "./data-organisms.json"), () => {});
    //     });
    //   },
    // });
    // pugDocGen({
    //   input: path.resolve(rootPath, "./components/templates/**/*.pug"),
    //   output: "./data-templates.json",
    //   locals,
    //   complete: function () {
    //     const stream = new PugDocMD({
    //       output: path.resolve(rootPath, "./docs/en/pug/templates.md"),
    //       input: path.resolve(rootPath, "./data-templates.json"),
    //     });
    //     stream.on("complete", function () {
    //       fs.unlink(path.resolve(rootPath, "./data-templates.json"), () => {});
    //     });
    //   },
    // });
    // pugDocGen({
    //   input: path.resolve(rootPath, "./components/utils/**/*.pug"),
    //   output: "./data-utils.json",
    //   locals,
    //   complete: function () {
    //     const stream = new PugDocMD({
    //       output: path.resolve(rootPath, "./docs/en/pug/utils.md"),
    //       input: path.resolve(rootPath, "./data-utils.json"),
    //     });
    //     stream.on("complete", function () {
    //       fs.unlink(path.resolve(rootPath, "./data-utils.json"), () => {});
    //     });
    //   },
    // });

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
  });
});
