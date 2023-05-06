/**
 * @module heroInfoGenerator
 */

const fs = require("fs");
const path = require("path");
const fetch = require("sync-fetch");
const probe = require("probe-image-size");
const truncateFile = require("./libs/truncate-file");
const { hexoSourcePath, themeConfig } = require("../constants");
const heroDBPath = path.resolve(hexoSourcePath, "./_data/hero.db.json");

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
 * @ignore
 * @param {string} url
 * @returns {string}
 */
const prependHttpProtocol = function (url) {
  const config = this.config;
  const hasHttpProtocol = /https?:\/\//i.test(url);
  const { protocol } = new URL(config.url);
  return hasHttpProtocol ? url : `${protocol}${url}`;
};

/**
 * return json string for hero image's database
 * @ignore
 * @returns {string}
 */
const getHeroInfo = () => {
  try {
    return JSON.stringify(require(heroDBPath));
  } catch (err) {
    truncateFile(heroDBPath, `[]`);
    return `[]`;
  }
};

/**
 * generate database file that has dimensions for hero images
 * @param {array} data the data from hexo @see https://hexo.io/api/filter
 */
function heroInfoGenerator(data) {
  const hexo = this;
  const [posts] = data;
  const PostAsset = hexo.model("PostAsset");
  const imageInfo = new Map(JSON.parse(getHeroInfo()));
  hexo.log.info(`Start generating hero image database.`);
  const themeHeros = Object.values(themeConfig.hero || {}).map((val) => ({
    hero: val,
  }));

  [...themeHeros, ...posts].forEach((post) => {
    let hero = post?.hero || undefined;
    if (!hero) return;
    if (typeof hero !== `string`) throw new Error(`hero must be string.`);
    if (hasProtocol(hero)) {
      if (imageInfo.get(hero)) return;
      try {
        console.log(`start processing: `, hero);
        const imgObj = fetch(prependHttpProtocol.bind(hexo)(hero));
        const dimension = probe.sync(imgObj.buffer());
        imageInfo.set(hero, dimension);
        console.log(`end processing: `, hero);
      } catch (error) {
        imageInfo.set(hero, {});
      }
    } else {
      let filePath = path.join(hexoSourcePath, hero);
      if (!fs.existsSync(filePath)) {
        const asset = PostAsset.findOne({ post: post._id, slug: hero });
        if (!asset) {
          hexo.log.error(`${filePath} is not exists.`);
          return;
        }
        filePath = asset.source;
        hero = asset.path;
      }
      const { mtime } = fs.statSync(filePath);
      const info = imageInfo.get(hero);
      if (imageInfo.get(hero) && info.mtime >= mtime.getTime()) return;
      const dimension = probe.sync(fs.readFileSync(filePath));
      imageInfo.set(hero, { ...dimension, mtime: mtime.getTime() });
    }
  });

  fs.writeFileSync(
    heroDBPath,
    JSON.stringify(Array.from(imageInfo.entries())),
    {
      encoding: `utf8`,
      flag: `w`,
    }
  );
  hexo.log.info(`Generated hero image database.`);
  hexo.extend.filter.unregister(`before_generate`, heroInfoGenerator);
}

module.exports = heroInfoGenerator;
