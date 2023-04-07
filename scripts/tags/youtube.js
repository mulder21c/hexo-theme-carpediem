const { htmlTag } = require("hexo-util");
const parse = require("../utils/safe-eval");

/**
 * @public
 * @desc generate youtube embed code
 * @alias youtube
 * @property {string} id id of youtube video
 * @property {string} [type= video] One of `video` or `playlist`
 * @property {boolean} [cookie= false] whether to use privacy-enhanced mode
 * @property {string|number} [aspectRatio= 16/9] - the aspect ratio of video.
 * The string format must be a fractional representation, such as 16/9.
 * @syntax
 * {% youtube id, type, [cookie], [aspect ratio] %}
 * @example
 * {% youtube XXXXXX %}
 * {% youtube XXXXXX video %}
 * {% youtube XXXXXX true %}
 * {% youtube XXXXXX true 4/3 %}
 * {% youtube XXXXXX 4/3 %}
 * {% youtube XXXXXX video false 1.3333 %}
 */
const youtubeTag = (ctx) => {
  const log = ctx?.log || console;
  return function youtubeTag([
    id,
    type = `video`,
    cookie = false,
    aspectRatio = 16 / 9,
  ]) {
    if (!id || !type) {
      const msg = !id
        ? `The id of youtube is not defined.`
        : `The type of youtube is not defined.`;
      log.error(msg);
      return;
    }
    if (typeof parse(type) === `number`) {
      aspectRatio = type;
      type = `video`;
    } else if (typeof parse(type) === `boolean`) {
      aspectRatio = typeof parse(cookie) === `number` ? cookie : 16 / 9;
      cookie = type;
      type = `video`;
    } else {
      if (typeof parse(cookie) === `number`) {
        aspectRatio = cookie;
        cookie = false;
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
