const fs = require("fs");
const path = require("path");
const fetch = require("sync-fetch");
const probe = require("probe-image-size");
const rootPath = path.resolve(__dirname, "../../../");
const imageInfoPath = path.resolve(__dirname, "../images-db.json");
const sourcePath = path.resolve(rootPath, "./source/");
const isCleanStage = hexo.env.cmd === "clean";

/**
 * if file exists, remove file
 * @param {string} path
 */
const truncate = (path) => {
  fs.writeFileSync(path, `[]`, { encoding: `utf8`, flag: `w` });
};

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
 * @desc process for clean image-info when after initialized hexo
 */
hexo.extend.filter.register(`after_init`, () => {
  if (isCleanStage) truncate(imageInfoPath);
});

/**
 * @desc process for generate image-info when after initialized hexo
 */
hexo.extend.filter.register(`before_generate`, function (data) {
  const imageInfo = require(imageInfoPath);
  const {
    theme: { config: themeConfig },
  } = this;
  const [docs] = data;

  docs.forEach((doc) => {
    const hero = doc?.hero || themeConfig.hero || undefined;
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

  fs.writeFileSync(imageInfoPath, JSON.stringify(imageInfo), {
    encoding: `utf8`,
    flag: `w`,
  });
});
