const getAssetInfo = require("../utils/get-asset-info");

/**
 * @public
 * @function
 * @alias asset_url
 * @desc Get URL of asset. <br>
 * If asset is in `_posts`, then return URL from post-asset.
 * Otherwise return URL from source.
 * @param {string} slug the slug of asset
 * @param {object} [post] the Post data from Hexo
 * @returns {string}
 * @example
 * asset_url(post.thumbnail, post)
 */
const assetURLHelper = (ctx) => {
  return function (slug, post) {
    return getAssetInfo(ctx)?.getUrl(slug, post);
  };
};

module.exports = assetURLHelper;
