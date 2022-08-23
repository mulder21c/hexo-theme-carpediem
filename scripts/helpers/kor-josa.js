const { getJosaPicker } = require("josa");

/**
 * @desc Return the result of executing getJosaPicker (for Korean)
 * @param {string} the word to which want to add a postposition
 * @param {string} postposition kind of postposition
 * @return {string}
 */
function getJosa(word, postposition) {
  return getJosaPicker(postposition)(word);
}

module.exports = getJosa;
