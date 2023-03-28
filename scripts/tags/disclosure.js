/**
 * @public
 * @desc generate disclosure  widget
 * @alias disclosure
 * @example
 * {% disclosure [label] [open:boolean] %}
 * @example
 * {% disclosure more... open:false %}
 *   Contents...
 * {% enddisclosure %}
 */
function disclosureTag(ctx) {
  return function (args, content) {
    const [label, open] = args;
    const [_, state] = (open || "").split(":");

    return `<details ${
      state ? `open` : ``
    }><summary>${label}</summary>${content}</details>`;
  };
}

module.exports = disclosureTag;
