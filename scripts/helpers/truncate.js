/**
 * @public
 * @function
 * @alias truncate
 * @desc Truncate by word to avoid making the sentence difficult
 * to understand due to truncated by letter
 * @param {string} str
 * @param {number} len
 * @return {string}
 */
function truncateHelper(str, len) {
  return str.slice(0, len).replace(/\s([^\s]+)$/, "");
}

module.exports = truncateHelper;
