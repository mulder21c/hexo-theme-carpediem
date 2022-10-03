const fs = require("fs");
const path = require("path");
const fetch = require("sync-fetch");
const probe = require("probe-image-size");
const rootPath = path.resolve(__dirname, `../../`);
const imageInfo = require(path.resolve(rootPath, "./images-db.json"));
const sourcePath = path.resolve(rootPath, "../../source/");

/**
 * @typedef {Object} ImageProbe
 * @property {string} path
 * @property {number} width
 * @property {number} height
 * @property {string} type
 * @property {string} mime
 * @property {string} wUnits
 * @property {string} hUnits
 */

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
 * @desc Get representative image object
 * @param {object} page page from hexo
 * @return {ImageProbe}
 */
function representativeImageHelper(page) {
  const hero = page?.hero || page?.photos?.unshift() || undefined;
  if (!hero) return null;

  const info = imageInfo.find((image) => image.path === hero);
  if (info) return info;

  const isExternal = /^((https?):)?\/\//i.test(hero);
  console.log(`[helper] getting image size: ${hero}`);
  if (isExternal) {
    try {
      const image = fetch(prependHttpProtocol(hero));
      const dimension = probe.sync(image.buffer());
      return {
        path: hero,
        ...dimension,
      };
    } catch (error) {
      return {
        path: hero,
      };
    }
  } else {
    const filePath = path.join(sourcePath, hero);
    const dimension = probe.sync(fs.readFileSync(filePath));
    return {
      path: hero,
      ...dimension,
    };
  }
}

module.exports = representativeImageHelper;