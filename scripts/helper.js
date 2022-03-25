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

const dateFormat = require("date-fns/format");
const { getJosaPicker } = require("josa");
const probe = require("probe-image-size");
const fs = require("fs");
const path = require("path");
const fetch = require("sync-fetch");
const vanillaPropTypes = require("vanilla-prop-types");

// provide vanillaPropTypes into `site`
hexo.locals.set("propTypes", vanillaPropTypes);

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
 * @return {string}
 */
hexo.extend.helper.register(`getJosa`, (word, josa) => {
  return getJosaPicker(josa)(word);
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
 * @return {ImageProbe}
 */
hexo.extend.helper.register(`representativeImage`, function (page) {
  const { theme } = this;
  const hero = page?.hero || theme.hero || undefined;
  if (!hero) return null;
  const isExternal = /^((https?):)?\/\//i.test(hero);
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
