const { htmlTag } = require("hexo-util");
const parse = require("../utils/parse-custom-tag-param");

/**
 * @public
 * @desc generate disclosure widget
 * @alias disclosure
 * @property {string} label visible label
 * @property {boolean} [open= false] whether to be opened
 * @syntax
 * {% disclosure label [open] %}
 * content
 * {% enddisclosure %}
 * @example
 * {% disclosure "show more" %}
 *   More Contents...
 * {% enddisclosure %}
 *
 * {% disclosure "description for chat" true %}
 *   This chart is...
 * {% enddisclosure %}
 */
function disclosureTag(ctx) {
  const log = ctx?.log || console;
  return function ([label, open = false], content) {
    if (!label && typeof parse(label) === `boolean`) {
      log.error(`The label is missed.`);
      return;
    }

    const summaryTag = htmlTag(`summary`, ``, label, false);

    return htmlTag(
      `details`,
      open ? "open" : ``,
      `${summaryTag}${content}`,
      false
    );
  };
}

module.exports = disclosureTag;
