const fs = require("fs");
const path = require("path");
const fetch = require("sync-fetch");
const probe = require("probe-image-size");
const full_url = require("./full-url");
const getAssetInfo = require("../utils/get-asset-info");
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
const { themeConfig } = require("../constants");

// If the URL does not contain a protocol,
// prepend protocol that is taken the protocol from the URL in the hexo config
const prependHttpProtocol = (ctx, url) => {
  const hasHttpProtocol = /https?:\/\//i.test(url);
  const { protocol } = new URL(ctx.config.url);
  return hasHttpProtocol ? url : `${protocol}${url}`;
};

/**
 * @typedef {Object | null} ImageProbe
 * @property {string} path
 * @property {number} width
 * @property {number} height
 * @property {string} type type of image, usually file name extension
 * @property {string} mime
 * @property {string} wUnits
 * @property {string} hUnits
 */

/**
 * @public
 * @function
 * @alias representative_image
 * @desc Get representative image object
 * @param {object} page page object from hexo
 * @return {ImageProbe}
 * @example
 * - const hero = representative_image(theme);
 */
const representativeImageHelper = (ctx) => {
  const { getUrl: getAssetURL, getSource: getAssetSource } = getAssetInfo(ctx);

  return function (page) {
    const hexo = this;
    const isArchive = (page) => Boolean(page.archive);
    const isCategory = (page) => Boolean(page.category);
    const isTag = (page) => Boolean(page.tag);
    const isPage = (page) => Boolean(page.__page);
    const isPost = (page) => Boolean(page.__post);
    const getHeroByLayout = (theme) => {
      if (isArchive(page)) return theme.hero?.archive;
      if (isCategory(page)) return theme.hero?.category;
      if (isCategory(page)) return theme.hero?.category;
      if (isTag(page)) return theme.hero?.tag;
      return theme.hero?.index;
    };

    const slug =
      isPage(page) || isPost(page)
        ? page.hero || page?.photos?.unshift()
        : getHeroByLayout(themeConfig) || undefined;

    if (!slug) return null;
    if (typeof slug !== `string`) throw new Error(`hero must be string.`);

    imageInfo = imageInfo || getImageInfo();
    const hero = getAssetURL(slug, page);
    const heroInfo = imageInfo.get(hero);
    if (heroInfo) return { path: full_url.call(this, hero), ...heroInfo };

    const isExternal = /^((https?):)?\/\//i.test(slug);
    if (isExternal) {
      try {
        const image = fetch(prependHttpProtocol(hexo, slug));
        const dimension = probe.sync(image.buffer());
        return {
          path: slug,
          ...dimension,
        };
      } catch (error) {
        return {
          path: slug,
        };
      }
    } else {
      const filePath = getAssetSource(slug, page);
      const dimension = probe.sync(fs.readFileSync(filePath));
      return {
        path: full_url.call(this, hero),
        ...dimension,
      };
    }
  };
};

module.exports = representativeImageHelper;
