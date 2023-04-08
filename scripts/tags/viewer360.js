const { htmlTag } = require("hexo-util");
const parse = require("../utils/parse-custom-tag-param");

/**
 * @public
 * @desc generate 360 image viewer
 * @alias viewer360
 * @property {string} imageURL the URL of image
 * @property {string|number} [aspectRatio= 16/9] - the aspect ratio of container.
 * @syntax
 * {% viewer360 imageURL [aspectRatio] %}
 * @example
 * {% viewer360 https://my.ima.ge/picture.jpg %}
 * {% viewer360 https://my.ima.ge/picture.jpg 4/3 %}
 */
function viewer360Tag(ctx) {
  const log = ctx?.log || console;
  return function ([image, aspectRatio = 16 / 9]) {
    if (!image || typeof parse(image) === `number`) {
      log.error(`The image URL is missed.`);
      return;
    }
    return htmlTag(
      `div`,
      {
        class: "viewer-360",
        "data-image": image,
        style: `aspect-ratio: ${aspectRatio}`,
      },
      ``,
      false
    );
  };
}

module.exports = viewer360Tag;
