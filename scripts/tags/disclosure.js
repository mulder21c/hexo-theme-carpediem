const { htmlTag } = require("hexo-util");

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
 * {% disclosure show more %}
 *   More Contents...
 * {% enddisclosure %}
 *
 * {% disclosure description for chat true %}
 *   This chart is...
 * {% enddisclosure %}
 */
function disclosureTag(ctx) {
  const log = ctx?.log || console;
  return function (args, content) {
    let openStatus = false;
    let label = ``;
    if ([`true`, `false`].includes(args[args.length - 1])) {
      openStatus = args.pop() === `true`;
    }
    label = args.join(` `);

    if (!label && typeof parse(label) === `boolean`) {
      log.error(`The label is missed.`);
      return;
    }

    const summaryTag = htmlTag(`summary`, {}, label, false);

    const attrs = {
      open: openStatus || null,
    };

    return htmlTag(`details`, attrs, `${summaryTag}${content}`, false);
  };
}

module.exports = disclosureTag;
