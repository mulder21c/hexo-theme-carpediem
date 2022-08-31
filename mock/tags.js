const uid = require("easy-uid");

const generateTag = (domain, id = uid()) => ({
  name: `tag-${id}`,
  slug: `tag-${id}`,
  path: `tags/tag-${id}`,
  permalink: `${domain}/tags/tag-${id}/`,
});

module.exports = ({ count, domain }) =>
  [...new Array(count)].map((e) => generateTag(domain));
