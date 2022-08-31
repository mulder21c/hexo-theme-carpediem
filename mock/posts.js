const uid = require("easy-uid");
const generateTags = require("./tags");
const generateCategories = require("./categories");
const loremIpsum = require("lorem-ipsum").loremIpsum;
const loremOpts = {
  count: 2,
  format: "html",
  paragraphLowerBound: 3,
  paragraphUpperBound: 7,
  random: Math.random,
  sentenceLowerBound: 5,
  sentenceUpperBound: 15,
  suffix: `\n`,
  units: `paragraph`,
};

const generatePost = ({ domain, id = uid(), next, prev }) => ({
  title: `Post ${id}`,
  thumbnail: `https://via.placeholder.com/320x180.png?text=${id}`,
  hero: `https://via.placeholder.com/1600x900.png?text=${id}`,
  date: new Date(),
  slug: `post-${id}`,
  published: true,
  comments: true,
  layout: `post`,
  photos: [],
  content: loremIpsum(loremOpts),
  site: { data: {} },
  excerpt: ``,
  more: loremIpsum(loremOpts),
  path: `post-${id}/`,
  permalink: `${domain}/post-${id}/`,
  full_source: undefined,
  asset_dir: `/source/_posts/post-${id}/`,
  tags: {
    data: generateTags({ domain, count: 2 }),
  },
  categories: {
    data: generateCategories({ domain, count: 2 }),
  },
});

module.exports = ({ count, domain }) => {
  const posts = [...new Array(count)].map((e, i) => {
    return generatePost({ domain, next: i === count - 1 ? true : false });
  });

  posts.forEach((post, idx) => {
    if (idx > 0) post.prev = post[idx - 1];
    if (idx < posts.length - 1) post.next = post[idx + 1];
  });

  return posts;
};
