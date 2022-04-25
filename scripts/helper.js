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
 * @typedef {Object} IconInfo
 * @property {string} iconName
 * @property {string} iconCategory
 */

const dateFormat = require("date-fns/format");
const { getJosaPicker } = require("josa");
const probe = require("probe-image-size");
const fs = require("fs");
const path = require("path");
const fetch = require("sync-fetch");
const vanillaPropTypes = require("vanilla-prop-types");
const jsYml = require("js-yaml");
const uid = require("easy-uid");
const imageInfo = require("../images-db.json");
const iconsMeta = (() => {
  try {
    return jsYml.load(
      fs.readFileSync(
        path.resolve(
          __dirname,
          `../node_modules/@fortawesome/fontawesome-free/metadata/icons.yml`
        ),
        `utf8`
      )
    );
  } catch (err) {
    console.warn("\x1b[33m%s\x1b[0m", `⚠ Cannot find fontawesome!`);
    return {};
  }
})();

// provide vanillaPropTypes into `site`
hexo.locals.set("propTypes", vanillaPropTypes);

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
 * @desc Return the result of executing dateFormat from date-fns
 * @return {string}
 */
hexo.extend.helper.register(`dateFormat`, function (...arguments) {
  return dateFormat.call(null, ...arguments);
});

/**
 * @desc Return the result of executing getJosaPicker (for Korean)
 * @param {string} the word to which want to add a postposition
 * @param {string} postposition kind of postposition
 * @return {string}
 */
hexo.extend.helper.register(`getJosa`, (word, postposition) => {
  return getJosaPicker(postposition)(word);
});

/**
 * @desc Return fully url from relative/absolute URL
 * @param {String} url
 * @return {String}
 */
hexo.extend.helper.register(`full_url`, (url) => {
  if (!url) return;
  const { origin, protocol } = new URL(hexo.config.url);
  const { url_for } = hexo.extend.helper.store;

  if (
    /^(https?|file|ftps?|mailto|javascript|data:image\/[^;]{2,9};):/i.test(url)
  ) {
    return url;
  }
  if (url.substring(0, 2) == "//") {
    url = url_for.call(hexo, url);
    return protocol + url;
  }

  return origin + url;
});

/**
 * @desc Get representative image object
 * @param {object} page page from hexo
 * @return {ImageProbe}
 */
hexo.extend.helper.register(`representativeImage`, function (page) {
  const { theme } = this;
  const hero = page?.hero || theme.hero || undefined;
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
    const filePath = path.join(__dirname, `../../../source`, hero);
    const dimension = probe.sync(fs.readFileSync(filePath));
    return {
      path: hero,
      ...dimension,
    };
  }
});

/**
 * @desc Get name and category of icon from fontawesome
 * @param {string} icon - the name of icon, you can predefine icon styles with slashes and words after slashes
 * @example getIconCategory("bell")
 * @example getIconCategory("bell/regular")
 * @return {IconInfo}
 */
hexo.extend.helper.register(`getIconCategory`, function (icon) {
  const [name, category] = icon.split("/");
  const { styles } = iconsMeta?.[name] || { styles: [] };
  const [style] = styles;

  if (category && !styles.includes(category)) {
    console.warn(
      "\x1b[33m%s\x1b[0m",
      `⚠ Cannot find "${icon}" icon from fontawesome.`
    );
  }

  return {
    iconName: name,
    iconCategory: category || style,
  };
});

/**
 * @desc Generate unique id
 * @return {string}
 */
hexo.extend.helper.register(`generateUid`, function () {
  return uid();
});
