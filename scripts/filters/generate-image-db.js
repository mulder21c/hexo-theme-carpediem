const fs = require("fs");
const path = require("path");
const rootPath = path.resolve(__dirname, "../../");
const sourcePath = path.resolve(rootPath, "../../source/_data/");
const imageDBPath = path.resolve(sourcePath, "./images.db.json");
const { generateImageInfo } = require("../utils/image-processor");

/**
 * @function storeImageDBFilter
 * @desc storing image DB
 * @param {array} data
 */
function storeImageDBFilter(data) {
  const filter = this.extend.filter;
  fs.writeFileSync(imageDBPath, JSON.stringify(generateImageInfo(data)), {
    encoding: `utf8`,
    flag: `w`,
  });

  filter.unregister(`before_generate`, storeImageDBFilter);
}

module.exports = storeImageDBFilter;
