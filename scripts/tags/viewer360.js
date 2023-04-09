const { htmlTag } = require("hexo-util");
const parse = require("../utils/parse-custom-tag-param");

/**
 * @public
 * @desc generate 360 image viewer
 * @alias viewer360
 * @property {string} imageURL the URL of image
 * @property {string} label the alternative text for image
 * @property {string|number} [aspectRatio= 16/9] - the aspect ratio of container.
 * @syntax
 * {% viewer360 imageURL label [aspectRatio] %}
 * @example
 * {% viewer360 https://my.ima.ge/picture.jpg "This image is..." %}
 * {% viewer360 https://my.ima.ge/picture.jpg "This image is..." 4/3 %}
 */
function viewer360Tag(ctx) {
  const log = ctx?.log || console;
  return function ([imageURL, label, aspectRatio = 16 / 9]) {
    if (!imageURL) {
      log.error(`The image URL is missed.`);
      return;
    }
    if (!label || typeof parse(label) === "number") {
      log.error(`The label is missed.`);
      return;
    }

    const viewer = htmlTag(
      `div`,
      {
        class: "viewer-360",
        "data-image": imageURL,
      },
      ``,
      false
    );

    return htmlTag(
      `div`,
      {
        class: "viewer-360__container",
        role: "region",
        "aria-roledescription": "360 photo viewer",
        "aria-label": label,
        style: `aspect-ratio: ${aspectRatio}`,
      },
      viewer,
      false
    );
  };
}

module.exports = viewer360Tag;
