const { htmlTag } = require("hexo-util");
const { urlExp } = require("../utils/tag-util");

/**
 * Link tag
 *
 * Syntax:
 *   {% anchor text url [relations] %}
 */

function anchorTag(args, content) {
  let url = "";
  const text = [args.shift()];

  // Find link URL and text
  for (let item; (item = args.shift()); ) {
    if (urlExp.test(item)) {
      url = item;
      break;
    } else {
      text.push(item);
    }
  }

  const attrs = {
    href: url,
    rel: args.join(" "),
  };

  return htmlTag("a", attrs, text.join(" "), false);
}

module.exports = anchorTag;
