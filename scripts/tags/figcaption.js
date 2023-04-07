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
 * {% figcaption "This image is ..." %}
 */
function figcaptionTag(ctx) {
  const log = ctx?.log || console;
  return function ([caption]) {
    if (!caption) {
      log.error(`The caption is missed.`);
      return;
    }
    return htmlTag(`figcaption`, { class: "figure__caption" }, caption, false);
  };
}

module.exports = figcaptionTag;
