/**
 * @public
 * @desc generate figure element
 * @alias figure
 * @example
 * {% figure [attributes] [class] %}
 * @example
 * {% figure %}
 *   <img src="xxxx.jpg" alt="" >
 * {% endfigure %}
 */
function figureTag(ctx) {
  return function (args, content) {
    const [attrs, cn] = args;
    return `<figure ${attrs} class="figure ${cn}">${content}</figure>`;
  };
}

module.exports = figureTag;
