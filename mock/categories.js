const uid = require("easy-uid");

const generateCategory = (domain, id = uid()) => ({
  name: `cate-${id}`,
  slug: `cate-${id}`,
  path: `categories/cate-${id}`,
  permalink: `${domain}/categories/cate-${id}/`,
});

module.exports = ({ count, domain }) =>
  [...new Array(count)].map((e) => generateCategory(domain));
