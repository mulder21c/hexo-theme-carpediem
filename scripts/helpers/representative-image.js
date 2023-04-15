const fs = require("fs");
const path = require("path");
const fetch = require("sync-fetch");
const probe = require("probe-image-size");
const full_url = require("./full-url");
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
  const PostAsset = ctx.model("PostAsset");

  return function (page) {
    const hexo = this;
    const log = (hexo.log && hexo.log.info) || console.log;
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

    let hero =
      isPage(page) || isPost(page)
        ? page.hero || page?.photos?.unshift()
        : getHeroByLayout(themeConfig) || undefined;

    if (!hero) return null;
    if (typeof hero !== `string`) throw new Error(`hero must be string.`);

    imageInfo = imageInfo || getImageInfo();

    if (!fs.existsSync(path.join(hexoSourcePath, hero))) {
      const asset = PostAsset.findOne({ post: page._id, slug: hero });
      if (asset) hero = asset.path;
    }

    const heroInfo = imageInfo.get(hero);
    if (heroInfo) return { path: full_url.call(this, hero), ...heroInfo };

    const isExternal = /^((https?):)?\/\//i.test(hero);
    log(`Getting hero image size for '${hero}' in memory`);
    if (isExternal) {
      try {
        const image = fetch(prependHttpProtocol(hexo, hero));
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
        path: full_url.call(this, hero),
        ...dimension,
      };
    }
  };
};

module.exports = representativeImageHelper;
