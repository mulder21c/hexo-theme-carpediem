const { htmlTag } = require("hexo-util");
const { urlExp, isRatioFormat } = require("../utils/tag-util");

/**
 * @public
 * @desc generate 360 image viewer <br>
 * To use this plug-in, need to enable `viewer360` in config of theme.
 * @alias viewer360
 * @property {string} imageURL the URL of image
 * @property {string} label the alternative text for image
 * @property {string} [aspectRatio= 16/9] - the aspect ratio of container.
 * <br>It must be in W/H format, such as 16/9.
 * @syntax
 * {% viewer360 imageURL label [aspectRatio] %}
 * @example
 * {% viewer360 https://my.ima.ge/picture.jpg This image is... %}
 * {% viewer360 https://my.ima.ge/picture.jpg This image is... 4/3 %}
 */
function viewer360Tag(ctx) {
  const log = ctx?.log || console;
  return function ([imageURL, ...args]) {
    let label = ``;
    let aspectRatio = 16 / 9;

    if (!urlExp.test(imageURL)) {
      log.error(`The image URL is missed.`);
      return;
    }

    // get aspect ratio from arguments
    if (isRatioFormat(args[args.length - 1])) {
      aspectRatio = args.pop();
    }

    // complete label from remain arguments
    label = args.join(` `);

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
