const { htmlTag } = require("hexo-util");
const { isRatioFormat } = require("../utils/tag-util");

/**
 * @public
 * @desc generate youtube embed code
 * @alias youtube
 * @property {string} id id of youtube video
 * @property {string} [type= video] One of `video` or `playlist`
 * @property {boolean} [privacy= false] whether to use privacy-enhanced mode
 * @property {string} [aspectRatio= 16/9] - the aspect ratio of video.<b>
 * It must be in W/H format, such as 16/9.
 * @property {string} [title] the title for youtube video. This property is
 * used as accessible name iframe
 * @syntax
 * {% youtube id, [type], [privacy], [aspect ratio], [title] %}
 * @example
 * {% youtube XXXXXX %}
 * <!-- Use title -->
 * {% youtube XXXXXX "This video is..." %}
 * <!-- Use playlist type -->
 * {% youtube XXXXXX playlist %}
 * <!-- Use youtube privacy-enhanced mode -->
 * {% youtube XXXXXX true %}
 * <!-- Specify aspect-ratio of video -->
 * {% youtube XXXXXX 4/3 %}
 * <!-- Combine options -->
 * {% youtube XXXXXX playlist 4/3 "2023 Top K-pop" }
 */
const youtubeTag = (ctx) => {
  const log = ctx?.log || console;

  return function ([id, ...args]) {
    let type = `video`;
    let privacy = false;
    let aspectRatio = 16 / 9;
    let title = ``;

    if ([`video`, `list`].includes(args[0])) {
      type = args.shift();
    }

    if ([`true`, `false`].includes(args[0])) {
      privacy = args.shift() === `true`;
    }

    if (isRatioFormat(args[0])) {
      aspectRatio = args.shift();
    }

    title = args.join(" ");

    const ytLink = privacy
      ? "https://www.youtube.com"
      : "https://www.youtube-nocookie.com";
    const embed = type === "video" ? "/embed/" : "/embed/videoseries?list=";

    const iframeTag = htmlTag(
      "iframe",
      {
        src: ytLink + embed + id,
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

module.exports = youtubeTag;
