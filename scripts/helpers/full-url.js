const { url_for } = require("hexo-util");

/**
 * @public
 * @function
 * @alias full_url
 * @desc Get fully url from relative/absolute URL. <br>
 * In development mode, keep the given URL for demonstration
 * @param {string} url
 * @return {string | void}
 * @example
 * a(href= full_url(`/search`)
 */
function fullUrlHelper(url) {
  if (!url) return;
  const { config, site } = this;
  const { origin, protocol } = new URL(config.url);
  const isDevelopment = site.mode === `development`;

  if (
    /^(https?|file|ftps?|mailto|javascript|data:image\/[^;]{2,9};):/i.test(url)
  ) {
    return url;
  }
  if (url.substring(0, 2) == "//") {
    return protocol + url_for.call(this, url);
  }

  if (/^\//.test(url)) {
    return isDevelopment ? url_for.call(this, url) : origin + url;
  }

  return isDevelopment ? url_for.call(this, url) : origin + "/" + url;
}

module.exports = fullUrlHelper;
