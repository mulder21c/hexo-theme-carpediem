const uid = require("easy-uid");

const generateCategory = (domain, id = uid()) => ({
  name: `cate-${id}`,
  slug: `cate-${id}`,
  path: `categories/cate-${id}`,
  permalink: `${domain}/categories/cate-${id}/`,
  _id: `${id}`,
});

module.exports = ({ count, domain }) => {
  const category = [...new Array(count)].map((e) => generateCategory(domain));
  const orgCate = [...category];
  category.find = function (query) {
    const res = this;
    res.sort = function () {
      const res2 = res;
      res2.filter = function () {
        return query.parent["$exists"] == false ? orgCate : [];
      };
      return res2;
    };
    return res;
  };
  return category;
};
