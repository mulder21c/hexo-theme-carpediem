/**
 * @desc truncate by word to avoid making the sentence difficult
 * to understand due to truncated by letter
 * @param {string} str - the original string
 * @param {number} len - the
 * @return {string}
 */
function truncateHelper(str, len) {
  return str.slice(0, len).replace(/\s([^\s]+)$/, "");
}

module.exports = truncateHelper;
