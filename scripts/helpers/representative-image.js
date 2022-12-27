const fs = require("fs");
const path = require("path");
const fetch = require("sync-fetch");
const probe = require("probe-image-size");
const { hexoSourcePath } = require("../constants");
let imageInfo;
const getImageInfo = () => {
  try {
    delete require.cache[path.resolve(hexoSourcePath, "./_data/hero.db.json")];
    return new Map(
      require(path.resolve(hexoSourcePath, "./_data/hero.db.json"))
    );
  } catch (err) {
    return new Map();
  }
};

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
  const hexo = this;
  const log = hexo.log || hexo.log.info;
  const hero = page?.hero || page?.photos?.unshift() || undefined;
  if (!hero) return null;

  imageInfo = imageInfo || getImageInfo();
  const info = imageInfo.get(hero);
  if (info) return { path: hero, ...info };

  const isExternal = /^((https?):)?\/\//i.test(hero);
  log(`Getting hero image size for '${hero}' in memory`);
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
    const filePath = path.join(hexoSourcePath, hero);
    const dimension = probe.sync(fs.readFileSync(filePath));
    return {
      path: hero,
      ...dimension,
    };
  }
}

module.exports = representativeImageHelper;
