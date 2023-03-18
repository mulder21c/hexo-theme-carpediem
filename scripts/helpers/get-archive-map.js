const { url_for } = require("hexo-util");
/**
 * @typedef {object} archivePost post data object for archive
 * @property {string} title
 * @property {string} subtitle
 * @property {string} permalink
 * @property {Moment} date
 * @property {SchemaTypeArray} categories
 */

/**
 * @typedef {Map<number, archivePost[]>} monthlyPosts
 */

/**
 * @typedef {Map<number, monthlyPosts>} yearlyPosts
 */

/**
 * @public
 * @function
 * @alias archive_map
 * @desc Get archives data mapped by year and month
 * @returns {yearlyPosts}
 * @example
 * +archiveTimeline({
 *   archives: archive_map(),
 *   headingLevel: 2,
 * })
 */
function mapArchivesHelper() {
  const { config } = this;
  const { timezone } = config;
  const posts = this.site.posts.sort("date", -1);
  if (!posts.length) return new Map();

  const archives = new Map();
  const isDevelopment = this.site.mode === "development";

  posts.forEach((post) => {
    // Clone the date object to avoid pollution
    let date = post.date.clone();
    if (timezone) date = date.tz(timezone);

    const year = date.year();
    const month = date.month() + 1;

    if (!archives.get(year)) archives.set(year, new Map());
    if (!archives.get(year).get(month)) archives.get(year).set(month, []);

    archives
      .get(year)
      .get(month)
      .push({
        title: post.title,
        subtitle: post.subtitle || "",
        permalink: isDevelopment
          ? url_for.call(this, post.path)
          : post.permalink,
        date,
        categories: post.categories,
        tags: post.tags,
      });
  });

  return archives;
}

module.exports = mapArchivesHelper;
