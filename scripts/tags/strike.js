const { htmlTag } = require("hexo-util");

/**
 * @public
 * @desc generate span element with strike line
 * @alias strike
 * @property {string} [wrapper] the wrapper tag name
 * @syntax
 * {% strike [wrapper] %}
 * content
 * {% endstrike %}
 * @example
 * {% strike %}
 *   줄긋기
 * {% endstrike %}
 */
function strikeTag(ctx) {
  const log = ctx?.log || console;
  return function (args, content) {
    const [wrapper] = args;
    const attrs = {
      style: `text-decoration:line-through`,
    };

    const tag = htmlTag(`span`, attrs, content, false);

    if (wrapper) {
      return htmlTag(wrapper, {}, tag, false);
    } else {
      return tag;
    }
  };
}

module.exports = strikeTag;
