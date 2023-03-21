/**
 * @public
 * @function
 * @alias archive_array
 * @desc Get archive post list
 * @param {number} year the archive year.<br>
 * If year is specify, return all posts for year.
 * Otherwise, return posts up to last `MAX_YEAR_LEN` (_config.yml) years.
 * @returns {array} array of posts
 * @example
 * - const archiveItems = getArchivePostsArray();
 * - const archiveItems = getArchivePostsArray(2023);
 *
 */
function getArchivePostsArrayHelper(year) {
  const {
    config,
    theme: { latest_years_count: MAX_YEAR_LEN },
  } = this;
  const { timezone } = config;
  const posts = this.site.posts.sort("date", -1);
  if (!posts.length) return [];

  year = Number(year);
  let result = [],
    count = 0,
    prevYear;

  if (year) {
    for (let i = -1, walking = false, post; (post = posts.eq(++i)); ) {
      let date = post.date.clone();
      if (timezone) date = date.tz(timezone);
      const postYear = date.year();
      if (postYear === year) walking = true;
      if (!walking) continue;
      if (walking && postYear !== year) break;
      result.push(post);
    }
  } else {
    for (let i = -1, post; (post = posts.eq(++i)); ) {
      let date = post.date.clone();
      if (timezone) date = date.tz(timezone);
      const postYear = date.year();
      if (prevYear !== postYear) {
        prevYear = postYear;
        count++;
      }
      if (count > MAX_YEAR_LEN) break;
      result.push(post);
    }
  }
  return result;
}

module.exports = getArchivePostsArrayHelper;
