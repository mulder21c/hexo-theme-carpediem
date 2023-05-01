const { themeConfig } = require("../constants");
/**
 * @desc customized renderer for markdown-it-footnote plugin
 * @param {object} md markdown object from markdown-it
 * @return {void}
 */
function markdownItSemanticRenderer(md) {
  md.renderer.rules.s_open = (tokens, idx, options) => {
    return `<span class="strike">`;
  };
  md.renderer.rules.s_close = (tokens, idx, options) => {
    return `</span>`;
  };
  md.renderer.rules.em_open = (tokens, idx, options) => {
    return `<span class="emphasis">`;
  };
  md.renderer.rules.em_close = (tokens, idx, options) => {
    return `</span>`;
  };
  md.renderer.rules.strong_open = (tokens, idx, options) => {
    return `<b>`;
  };
  md.renderer.rules.strong_close = (tokens, idx, options) => {
    return `</b>`;
  };
}

module.exports = markdownItSemanticRenderer;
