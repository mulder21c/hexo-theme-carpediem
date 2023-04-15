const getAssetInfo = require("../utils/get-asset-info");

/**
 * @param {string} slug the slug of asset
 * @param {object} post the Post data from Hexo
 * @returns {string}
 */
const assetURLHelper = (ctx) => {
  return function (slug, post) {
    return getAssetInfo(ctx)?.getUrl(slug, post);
  };
};

module.exports = assetURLHelper;
