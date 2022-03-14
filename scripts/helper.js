const dateFormat = require("date-fns/format");
const { getJosaPicker } = require("josa");
const probe = require("probe-image-size");
const fs = require("fs");
const path = require("path");

hexo.extend.helper.register(`dateFormat`, function (...arguments) {
  return dateFormat.call(null, ...arguments);
});

hexo.extend.helper.register(`getJosa`, (word, josa) => {
  return getJosaPicker(josa)(word);
});

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

hexo.extend.helper.register(`representativeImage`, function () {
  const { page, theme } = this;
  const hero = page?.hero || theme?.hero;
  if (!hero) return null;
  const filePath = path.join(__dirname, `../../../source`, hero?.url);
  const dimention = probe.sync(fs.readFileSync(filePath));
  return {
    path: hero?.url,
    ...dimention,
  };
});
