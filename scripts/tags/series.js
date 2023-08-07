const { encodeURL, htmlTag } = require("hexo-util");
const { postFindOneFactory } = require("hexo/lib/plugins/tag");

/**
 *
 * @public
 * @desc generate table of links for series posts
 * @alias series
 * @property {string} title title of series
 * @property {number} [level= 2] The level of heading for series section
 * @property {Array.<string>} [filenames] The file name of post without
 * extension. The subject of a post to represent instead of link, if not posted
 * yet a post.
 * @syntax
 * {% series title [level] [filenames [, subjects]] %}
 * @expamle
 * {%
 *  series
 *  series of a11y
 *  a11y-introduction
 *  "four principles for a11y"
 * %}
 */
function seriesTag(ctx) {
  const log = ctx?.log || console;
  const className = `series`;

  const postLink = (slug, isCurrent, listClassName) => {
    const listItemClassName = listClassName + `-item`;
    const factory = postFindOneFactory(ctx);
    const post = factory({ slug }) || factory({ title: slug });
    if (!post) {
      return `<li class="${listItemClassName} ${listItemClassName}--not-published"><a>${slug}</a></li>`;
    }

    let title = post.title;
    const link = encodeURL(new URL(post.path, ctx.config.url).pathname);
    const curr = isCurrent ? ` aria-current="page"` : ``;
    return `<li class="${listItemClassName}"><a href="${link}"${curr}>${title}</a></li>`;
  };

  return function (args) {
    const currentSlug = this.slug;
    const title = args.shift();
    const level = /^\d$/.test(args[0]) ? args.shift() : 2;

    const listItemsTag = args.reduce(
      (acc, slug) =>
        `${acc}${postLink(slug, currentSlug == slug, `${className}__list`)}`,
      ``
    );

    const headingTag = htmlTag(
      `h${level}`,
      {
        class: `${className}__heading`,
      },
      title,
      false
    );

    const listTag = htmlTag(
      `ol`,
      {
        class: `${className}__list`,
      },
      listItemsTag,
      false
    );

    return htmlTag(
      `section`,
      {
        class: className,
      },
      `${headingTag}${listTag}`,
      false
    );
  };
}

module.exports = seriesTag;
