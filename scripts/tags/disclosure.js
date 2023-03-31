/**
 * @public
 * @desc generate disclosure widget
 * @alias disclosure
 * @property label {string} visible label
 * @property open {boolean} whether to be opened
 * @example
 * {% disclosure [label] [open] %}
 * @example
 * {% disclosure more... false %}
 *   Contents...
 * {% enddisclosure %}
 */
function disclosureTag(ctx) {
  return function (args, content) {
    const [label, open] = args;

    return `<details ${
      open ? `open` : ``
    }><summary>${label}</summary>${content}</details>`;
  };
}

module.exports = disclosureTag;
