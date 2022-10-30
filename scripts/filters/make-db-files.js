const fs = require("fs");
const path = require("path");
const rootPath = path.resolve(__dirname, "../../");
const sourcePath = path.resolve(rootPath, "../../source/_data/");
const imageDBPath = path.resolve(sourcePath, "./images.db.json");

function makeDB() {
  if (!fs.existsSync(sourcePath)) {
    fs.mkdirSync(sourcePath);
  }

  if (!fs.existsSync(imageDBPath)) {
    fs.writeFileSync(imageDBPath, `[]`, {
      encoding: `utf8`,
      flag: `w`,
    });
  }
}

/**
 * @desc process for generate image-info when after initialized hexo
 */
hexo.extend.filter.register(`after_init`, makeDB);
