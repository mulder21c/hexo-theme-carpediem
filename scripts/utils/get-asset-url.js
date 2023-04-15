const { hexoConfig: post_asset_folder } = require("../constants");

/**
 * @param {string} slug the slug for asset file
 * @param {post} [post] post data from Hexo
 * @returns {string}
 */
const getAssetURL = (ctx) => {
  const PostAsset = ctx.model("PostAsset");
  const log = ctx.log || console;
  const urlRegExp = /^((https?):)?\/\//i;

  return function (slug, post) {
    if (urlRegExp.test(slug)) return slug;
    if (!post_asset_folder) return slug;
    post = post || this;
    const asset = PostAsset.findOne({ post: post._id, slug });
    if (asset) return asset.path;
    else {
      log.warn(
        `You enabled post_asset_folder config.\n`,
        `     Preferably, use post-specific assets rather than global asset.\n`,
        `     File: ${slug}`
      );
      return slug;
    }
  };
};

module.exports = getAssetURL;
