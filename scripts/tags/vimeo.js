const { htmlTag } = require("hexo-util");
const { isRatioFormat } = require("../utils/tag-util");

/**
 * @public
 * @desc generate vimeo embed code
 * @alias vimeo
 * @property {string} id id of vimeo video
 * @property {string} [aspectRatio= 16/9] - the aspect ratio of video. <br>
 * It must be in W/H format, such as 16/9.
 * @property {string} [title] the title for vimeo video. This property is
 * used as accessible name for iframe
 * @syntax
 * {% vimeo id, [aspect ratio], [title] %}
 * @example
 * {% vimeo XXXXXX %}
 * <!-- Use title -->
 * {% vimeo XXXXXX This video is... %}
 * <!-- Specify aspect-ratio of video -->
 * {% vimeo XXXXXX 4/3 %}
 */
const vimeoTag = (ctx) => {
  const log = ctx?.log || console;
  // return function ([id, aspectRatio = 16 / 9, title]) {
  return function ([id, ...args]) {
    let aspectRatio = 16 / 9;
    let title = ``;

    if (isRatioFormat(args[0])) {
      aspectRatio = args.shift();
    }

    const src = "https://player.vimeo.com/video/" + id;
    title = args.join(" ");

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
