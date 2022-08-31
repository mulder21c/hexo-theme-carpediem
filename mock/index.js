const fs = require("fs");
const path = require("path");
const postsGenerator = require("./posts");
const jsYml = require("js-yaml");
const rootPath = path.resolve(__dirname, "../");
const hexoPath = path.resolve(rootPath, "../../");
const config = jsYml.load(
  fs.readFileSync(path.resolve(hexoPath, `./_config.yml`), `utf8`)
);
const domain = config.url || `http://example.com`;
const count = 3;

module.exports = {
  base: "/",
  total: count,
  current: 1,
  current_url: "",
  posts: postsGenerator({ domain, count }),
  prev: 1,
  prev_link: "/",
  next: 2,
  next_link: "page/2/",
  __index: true,
  path: "index.html",
  lang: "ko",
  canonical_path: "index.html",
};
