const { htmlTag } = require("hexo-util");

/**
 * @public
 * @desc generate figure element
 * @alias figure
 * @property {string} [align] alignment for figure
 * One of `left`, `center` or `right`
 * @property {boolean} [float= false] whether to use float
 * @syntax
 * {% figure [align] [float] %}
 * content
 * {% endfigure %}
 * @example
 * {% figure %}
 *   <img src="xxxx.jpg" alt="" >
 * {% endfigure %}
 *
 * {% figure right %}
 *   <img src="xxxx.jpg" alt="" >
 * {% endfigure %}
 *
 * {% figure left true %}
 *   <img src="xxxx.jpg" alt="" >
 * {% endfigure %}
 */
function figureTag(ctx) {
  const log = ctx?.log || console;
  return function ([align, float = false], content) {
    if ([`true`, `false`].includes(align)) {
      log.error(`The float cannot be used alone.`);
      return;
    }
    const useFloat = float && float === `true`;
    const suffix = align && [align, useFloat ? `--float` : ``].join("");

    const attrs = {
      class: [`figure`, suffix ? `figure--${suffix}` : ``].join(" "),
    };

    return htmlTag(`figure`, attrs, content, false);
  };
}

module.exports = figureTag;
