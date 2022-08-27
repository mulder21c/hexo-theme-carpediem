const { url_for } = require("hexo-util");

/**
 * @function fullUrlHelper
 * @desc Return fully url from relative/absolute URL
 * @param {String} url
 * @return {String}
 */
module.exports = (ctx) =>
  function fullUrlHelper(url) {
    if (!url) return;
    const { origin, protocol } = new URL(ctx.config.url);

    if (
      /^(https?|file|ftps?|mailto|javascript|data:image\/[^;]{2,9};):/i.test(
        url
      )
    ) {
      return url;
    }
    if (url.substring(0, 2) == "//") {
      url = url_for.call(ctx, url);
      return protocol + url;
    }

    return origin + url;
  };
