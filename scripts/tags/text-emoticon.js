const { htmlTag } = require("hexo-util");

/**
 * @public
 * @desc generate accessible text emoticon
 * @alias txt_emo
 * @property {string} label visible text
 * @property {string} accName the accessible name
 * @syntax
 * {% txt_emo content accName %}
 * @example
 * {% txt_emo "= _=a" "긁적긁적" %}
 */
function textEmoticonTag(ctx) {
  const log = ctx?.log || console;

  return function ([label, accName]) {
    if (!accName) {
      log.error(`The accName is missed.`);
      return;
    }

    const accessibleHiddenContent = htmlTag(
      `span`,
      {
        "aria-hidden": "true",
        class: "txt-emoticon",
      },
      label,
      false
    );

    return htmlTag(
      `span`,
      {
        role: "image",
        "aria-label": accName,
      },
      accessibleHiddenContent,
      false
    );
  };
}

module.exports = textEmoticonTag;
