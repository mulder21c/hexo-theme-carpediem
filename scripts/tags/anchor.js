const { htmlTag } = require("hexo-util");

const rUrl =
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\w]*))?)/;

/**
 * Link tag
 *
 * Syntax:
 *   {% anchor text url [external] [relations] %}
 */

function anchorTag(args, content) {
  let url = "";
  const text = [];
  let external = false;

  // Find link URL and text
  for (let item = args.shift(); (item = args.shift()); ) {
    if (rUrl.test(item)) {
      url = item;
      break;
    } else {
      text.push(item);
    }
  }

  if ([`true`, `false`].includes(args[0])) {
    external = args.unshift();
  }

  const rel = args.join(" ");

  const attrs = {
    href: url,
    target: external ? "_blank" : null,
    rel,
  };

  return htmlTag("a", attrs, text.join(" "));
}

module.exports = anchorTag;
