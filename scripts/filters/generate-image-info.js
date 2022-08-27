const fs = require("fs");
const path = require("path");
const rootPath = path.resolve(__dirname, "../../");
const imageInfoPath = path.resolve(rootPath, "./images-db.json");
const { generateImageInfo } = require("../utils/image-processor");

/**
 * check has protocol
 * @param {string} path
 * @returns {boolean}
 */
const hasProtocol = (path) => {
  return /^((https?):)?\/\//i.test(path);
};

/**
 * If the URL does not contain a protocol,
 * prepend protocol that is taken the protocol from the URL in the hexo config
 * @param {string} url
 * @returns {string}
 */
const prependHttpProtocol = (url) => {
  const hasHttpProtocol = /https?:\/\//i.test(url);
  const { protocol } = new URL(hexo.config.url);
  return hasHttpProtocol ? url : `${protocol}${url}`;
};

/**
 * @desc process for generate image-info when after initialized hexo
 */
hexo.extend.filter.register(`before_generate`, function (data) {
  const imageInfo = generateImageInfo(data);

  fs.writeFileSync(imageInfoPath, JSON.stringify(imageInfo), {
    encoding: `utf8`,
    flag: `w`,
  });
});
