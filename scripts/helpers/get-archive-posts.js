/**
 * get post list archive list
 * @param {number} year the archive year
 * @returns {array} array of posts
 */
function getArchivePostsHelper(year) {
  const {
    config,
    theme: {
      display: { archives: MAX_YEAR_LEN },
    },
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

module.exports = getArchivePostsHelper;
