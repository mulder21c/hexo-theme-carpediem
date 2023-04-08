const { htmlTag } = require("hexo-util");
const parse = require("../utils/parse-custom-tag-param");

/**
 * @public
 * @desc generate vimeo embed code
 * @alias vimeo
 * @property {string} id id of vimeo video
 * @property {string|number} [aspectRatio= 16/9] - the aspect ratio of video.
 * The string format must be a fractional representation, such as 16/9.
 * @property {string} [title] the title for vimeo video. This property is
 * used as accessible name iframe
 * @syntax
 * {% vimeo id, [aspect ratio], [title] %}
 * @example
 * {% vimeo XXXXXX %}
 * <!-- Use title -->
 * {% vimeo XXXXXX "This video is..." %}
 * <!-- Specify aspect-ratio of video -->
 * {% vimeo XXXXXX 4/3 %}
 * <!-- Combine options -->
 * {% vimeo XXXXXX "2023 Top K-pop" }
 */
const vimeoTag = (ctx) => {
  const log = ctx?.log || console;
  return function ([id, aspectRatio = 16 / 9, title]) {
    if (!id) {
      log.error(`The id of vimeo is missed.`);
      return;
    }

    if (typeof parse(aspectRatio) === `string`) {
      title = aspectRatio;
      aspectRatio = 16 / 9;
    }

    const src = "https://player.vimeo.com/video/" + id;

    const iframeTag = htmlTag(
      "iframe",
      {
        src,
        frameborder: "0",
        loading: "lazy",
        allowfullscreen: true,
        "aria-label": title || undefined,
      },
      ""
    );

    return htmlTag(
      "div",
      { class: "video-container", style: `aspect-ratio: ${aspectRatio}` },
      iframeTag,
      false
    );
  };
};

module.exports = vimeoTag;
