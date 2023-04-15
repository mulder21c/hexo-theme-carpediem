const getAssetURL = require("../utils/get-asset-url");

const assetURLHelper = (ctx) => {
  return getAssetURL(ctx);
};

module.exports = assetURLHelper;
