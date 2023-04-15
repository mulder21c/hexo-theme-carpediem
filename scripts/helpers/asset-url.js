const fs = require("fs");
const path = require("path");
const { hexoConfig: post_asset_folder } = require("../constants");

const assetURLHelper = (ctx) => {
  const PostAsset = ctx.model("PostAsset");
  const log = ctx.log || console;

  return function (slug, post) {
    if (!post_asset_folder) return slug;
    post = post || this;
    const asset = PostAsset.findOne({ post: post._id, slug });
    if (asset) return asset.path;
    else {
      log.warn(
        `You enabled post_asset config.\n`,
        `     Preferably, use post-specific assets rather than global asset.\n`,
        `     File: ${slug}`
      );
      return slug;
    }
  };
};

module.exports = assetURLHelper;
