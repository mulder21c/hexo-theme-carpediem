const { url_for } = require("hexo-util");

function fullUrlHelper(url) {
  if (!url) return;
  const { config } = this;
  const { origin, protocol } = new URL(config.url);

  if (
    /^(https?|file|ftps?|mailto|javascript|data:image\/[^;]{2,9};):/i.test(url)
  ) {
    return url;
  }
  if (url.substring(0, 2) == "//") {
    return protocol + url_for.call(this, url);
  }

  if (/^\//.test(url)) {
    return origin + url;
  }

  return origin + "/" + url;
}

/**
 * @function fullUrlHelper
 * @desc Return fully url from relative/absolute URL
 * @param {String} url
 * @return {String}
 */
module.exports = fullUrlHelper;