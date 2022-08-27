const fs = require("fs");
const path = require("path");
const fetch = require("sync-fetch");
const probe = require("probe-image-size");
const truncateFile = require("./truncate-file");
const rootPath = path.resolve(__dirname, "../../");
const imageInfoPath = path.resolve(rootPath, "./images-db.json");
const sourcePath = path.resolve(rootPath, "../../source/");

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
 * truncate image information
 * @param {boolean} isCleanStage Whether it is in clean stage or not
 */
const truncateImageInfo = (isCleanStage) => {
  isCleanStage && truncateFile(imageInfoPath, `[]`);
};

const generateImageInfo = (data) => {
  let imageInfo;
  const [posts] = data;
  try {
    imageInfo = require(imageInfoPath);
  } catch (err) {
    truncateFile(imageInfoPath);
    imageInfo = require(imageInfoPath);
  }

  posts.forEach((post) => {
    const hero = post?.hero || undefined;
    if (!hero || imageInfo.find((image) => image.path === hero)) return;
    console.log(`[storing image-info] getting image size: ${hero}`);
    if (hasProtocol(hero)) {
      try {
        const image = fetch(prependHttpProtocol(hero));
        const dimension = probe.sync(image.buffer());
        imageInfo.push({
          path: hero,
          ...dimension,
        });
      } catch (error) {
        imageInfo.push({
          path: hero,
        });
      }
    } else {
      const filePath = path.join(sourcePath, hero);
      const dimension = probe.sync(fs.readFileSync(filePath));
      imageInfo.push({
        path: hero,
        ...dimension,
      });
    }
  });

  return imageInfo;
};

module.exports = {
  truncateImageInfo,
  generateImageInfo,
};
