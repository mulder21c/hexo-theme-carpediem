const { htmlTag } = require("hexo-util");
const parse = require("../utils/parse-custom-tag-param");

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
    if (typeof parse(align) === `boolean`) {
      log.error(`The float cannot be used alone.`);
      return;
    }
    const useFloat = float && JSON.parse(float);
    const suffix = align && [align, useFloat ? `--float` : ``].join("");

    return htmlTag(
      `figure`,
      {
        class: [`figure`, suffix ? `figure--${suffix}` : ``].join(" "),
      },
      content,
      false
    );
  };
}

module.exports = figureTag;
