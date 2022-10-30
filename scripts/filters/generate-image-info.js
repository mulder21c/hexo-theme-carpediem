const fs = require("fs");
const path = require("path");
const rootPath = path.resolve(__dirname, "../../");
const sourcePath = path.resolve(rootPath, "../../source/_data/");
const imageDBPath = path.resolve(sourcePath, "./images.db.json");
const { generateImageInfo } = require("../utils/image-processor");

const storeImageDB = (data) => {
  fs.writeFileSync(imageDBPath, JSON.stringify(generateImageInfo(data)), {
    encoding: `utf8`,
    flag: `w`,
  });

  hexo.extend.filter.unregister(`before_generate`, storeImageDB);
};

/**
 * @desc process for generate image-info when after initialized hexo
 */
hexo.extend.filter.register(`before_generate`, storeImageDB);
