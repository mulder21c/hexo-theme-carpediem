const path = require("path");
const {
  hexoConfig: post_asset_folder,
  hexoSourcePath,
} = require("../constants");
const getAssetInfo = (ctx) => {
  const log = ctx.log || console;
  const PostAsset = ctx.model("PostAsset");
  const urlRegExp = /^((https?):)?\/\//i;

  function getInfo(slug, post, prop) {
    if (!slug) return slug;
    if (urlRegExp.test(slug)) return slug;
    if (!post_asset_folder) return slug;
    const asset = PostAsset.findOne({ post: post._id, slug });
    if (!asset) {
      log.warn(
        `You enabled post_asset_folder config.\n`,
        `     Preferably, use post-specific assets rather than global asset.\n`,
        `     File: ${slug}`
      );
      return null;
    }
    return asset[prop];
  }

  return {
    getUrl: (slug, post) => getInfo(slug, post, `path`) || slug,
    getSource: (slug, post) => {
      const source = getInfo(slug, post, `source`);
      return source || path.join(hexoSourcePath, slug);
    },
  };
};

module.exports = getAssetInfo;
