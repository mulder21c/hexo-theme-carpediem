const { themeConfig } = require("../constants");
/**
 * @desc customized renderer for markdown-it-footnote plugin
 * @param {object} md markdown object from markdown-it
 * @return {void}
 */
function markdownItFootNoteRenderer(md) {
  md.renderer.rules.footnote_caption = function (tokens, idx) {
    let n = Number(tokens[idx].meta.id + 1).toString();

    if (tokens[idx].meta.subId > 0) {
      n += `:${tokens[idx].meta.subId}`;
    }
    return `[${n}]`;
  };

  md.renderer.rules.footnote_ref = function (tokens, idx, options, env, slf) {
    const id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf);
    const caption = slf.rules.footnote_caption(tokens, idx, options, env, slf);
    let refid = id;

    if (tokens[idx].meta.subId > 0) {
      refid += `:${tokens[idx].meta.subId}`;
    }

    return `
      <span class="footnote-ref">
        <a
          href="#fn${id}"
          id="fnref${refid}"
          role="doc-noteref"
          aria-label="Go to footnote ${id}"
        >
          ${caption}
        </a>
      </span>
    `;
  };

  md.renderer.rules.footnote_block_open = function (
    tokens,
    idx,
    options,
    env,
    slf
  ) {
    return `
      <section class="footnotes" role="doc-footnote">
        <h2 class="sr-only">각주</h2>
        <ol class="footnotes-list">
    `;
  };

  md.renderer.rules.footnote_anchor = function (
    tokens,
    idx,
    options,
    env,
    slf
  ) {
    let id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf);

    if (tokens[idx].meta.subId > 0) {
      id += `:${tokens[idx].meta.subId}`;
    }

    return `
      <a
        href="#fnref${id}"
        class="footnote-backref"
        aria-label="Back to content for footnote ${id}"
        role="doc-backlink"
      >
        <svg
          class="${themeConfig.prefix}-svg-icon"
          focusable="false"
          aria-hidden="true"
        >
          <use xlink:href="/images/solid.svg#arrow-turn-up"></use>
        </svg>
      </a>`;
  };
}

module.exports = markdownItFootNoteRenderer;
