/**
 * @public
 * @desc generate figcaption element <br>
 * It must be used in `{% figure %}`
 * @alias figcaption
 * @property caption {string} caption text content
 * @example
 * {% figcaption [caption] %}
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
