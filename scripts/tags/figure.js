/**
 * @public
 * @desc generate figure element
 * @alias figure
 * @property align {string} alignment for figure.
 * One of `left`, `center` or `right`
 * @property float {boolean} whether to use float
 * @example
 * {% figure [align] [float] %}
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
