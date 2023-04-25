const { htmlTag } = require("hexo-util");

/**
 * @public
 * @desc generate figcaption element <br>
 * It must be used in `{% figure %}`
 * @alias figcaption
 * @property {string} caption caption text content
 * @syntax
 * {% figcaption caption %}
 * @example
 * {% figcaption This image is ... %}
 */
function figcaptionTag(ctx) {
  const log = ctx?.log || console;
  return function (args) {
    if (!args.length) {
      log.error(`The caption is missed.`);
      return;
    }
    const caption = args.join(" ");
    return htmlTag(`figcaption`, { class: "figure__caption" }, caption, false);
  };
}

module.exports = figcaptionTag;
