const { getJosaPicker } = require("josa");
const {
  hexoConfig: { language },
} = require("../constants");

/**
 * @public
 * @function
 * @alias kor_josa
 * @desc Generate appropriate postposition to the word for Korean
 * @param {string} word the word to which want to add a postposition
 * @param {string} postposition kind of postposition (은/는, 이/가, 을/를)
 * @return {string}
 * @example
 * p= title + kor_josa(title, "은")
 * p= title + kor_josa(title, "는")
 * p= title + kor_josa(title, "이")
 * p= title + kor_josa(title, "가")
 * p= title + kor_josa(title, "을")
 * p= title + kor_josa(title, "를")
 */
function getJosaHelper(word, postposition) {
  if (language !== `ko`) return ``;
  return getJosaPicker(postposition)(word);
}

module.exports = getJosaHelper;
