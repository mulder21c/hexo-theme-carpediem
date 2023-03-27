/**
 * @public
 * @desc generate figcaption element <br>
 * It must be used in `{% figure %}`
 * @alias figcaption
 * @example
 * {% figcaption [caption string] %}
 * @example
 * {% figure %}
 *   <img src="xxxx.jpg" alt="" >
 *   {% figcaption "이미지 캡션" %}
 * {% endfigure %}
 */
function figcaptionTag(ctx) {
  return function (args) {
    const [caption] = args;
    if (!caption || typeof caption !== `string`) return ``;
    if (!caption.trim()) return ``;
    return `<figcaption class="figure__caption">${caption}</figure>`;
  };
}

module.exports = figcaptionTag;
