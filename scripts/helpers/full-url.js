/**
 *
 * @param {object} hexo hexo context
 * @returns {function}
 */
function fullUrl(hexo) {
  /**
   * @desc Return fully url from relative/absolute URL
   * @param {String} url
   * @return {String}
   */
  return function (url) {
    if (!url) return;
    const { origin, protocol } = new URL(hexo.config.url);
    const url_for = hexo.extend.helper.store;

    if (
      /^(https?|file|ftps?|mailto|javascript|data:image\/[^;]{2,9};):/i.test(
        url
      )
    ) {
      return url;
    }
    if (url.substring(0, 2) == "//") {
      url = url_for.call(hexo, url);
      return protocol + url;
    }

    return origin + url;
  };
}

module.exports = fullUrl;
