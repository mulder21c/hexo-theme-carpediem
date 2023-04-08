const { htmlTag } = require("hexo-util");
const parse = require("../utils/parse-custom-tag-param");

/**
 * @public
 * @desc generate youtube embed code
 * @alias youtube
 * @property {string} id id of youtube video
 * @property {string} [type= video] One of `video` or `playlist`
 * @property {boolean} [cookie= false] whether to use privacy-enhanced mode
 * @property {string|number} [aspectRatio= 16/9] - the aspect ratio of video.
 * The string format must be a fractional representation, such as 16/9.
 * @property {string} [title] the title for youtube video. This property is
 * used as accessible name iframe
 * @syntax
 * {% youtube id, type, [cookie], [aspect ratio], [title] %}
 * @example
 * {% youtube XXXXXX %}
 * <!-- Use title -->
 * {% youtube XXXXXX "This video is..." %}
 * <!-- Use playlist type -->
 * {% youtube XXXXXX playlist %}
 * <!-- Allow youtube cookie -->
 * {% youtube XXXXXX true %}
 * <!-- Specify aspect-ratio of video -->
 * {% youtube XXXXXX 4/3 %}
 * <!-- Combine options -->
 * {% youtube XXXXXX playlist 4/3 "2023 Top K-pop" }
 */
const youtubeTag = (ctx) => {
  const log = ctx?.log || console;
  return function ([
    id,
    type = `video`,
    cookie = false,
    aspectRatio = 16 / 9,
    title,
  ]) {
    if (!id) {
      log.error(`The id of youtube is missed.`);
      return;
    }

    if (
      typeof parse(type) === `string` &&
      ![`video`, `playlist`].includes(type)
    ) {
      // case: {% youtube id title %}
      title = type;
      type = `video`;
    } else if (typeof parse(type) === `number`) {
      // case: {% youtube id aspectRatio [title] %}
      title = cookie;
      cookie = false;
      aspectRatio = type;
      type = `video`;
    } else if (typeof parse(type) === `boolean`) {
      // case: {$ youtube id cookie [aspectRatio] [title] %}
      title = typeof parse(cookie) === `string` ? cookie : aspectRatio;
      aspectRatio = typeof parse(cookie) === `number` ? cookie : 16 / 9;
      cookie = type;
      type = `video`;
    } else {
      // case: {% youtube id type [cookie] [aspectRatio] [title] %}
      if (typeof parse(cookie) === `string`) {
        // case: {% youtube id type title %}
        title = cookie;
        cookie = false;
        aspectRatio = 16 / 9;
      } else if (typeof parse(cookie) === `number`) {
        // case: {% youtube id type aspectRatio [title] %}
        title = aspectRatio;
        aspectRatio = cookie;
        cookie = false;
      } else if (typeof parse(cookie) === `boolean`) {
        title = typeof parse(aspectRatio) === `number` ? title : aspectRatio;
        aspectRatio =
          typeof parse(aspectRatio) === `string` ? 16 / 9 : aspectRatio;
      }
    }

    const ytLink = cookie
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
