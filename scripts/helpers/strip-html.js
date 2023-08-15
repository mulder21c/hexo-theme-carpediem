const { stripHTML } = require(`hexo-util`);

const proceedStrip = (str, processors) => {
  return processors.reduce((str, processor) => {
    return processor(str);
  }, str);
};

/**
 * @public
 * @function
 * @alias strip_html
 * @desc Strip HTML tags from string <br>
 * The addition of highlightJS generated line indicator and special character
 * conversion is different from hexo one.
 * @param {string} str - the original string
 * @return {string}
 * @example
 * p= strip_html(post.content)
 */
function stripHTMLHelper(str) {
  return proceedStrip(str, [
    // remove table of content for series
    (str) => {
      const [_, tag] = str.match(/<([a-zA-Z]+)\s*class="series">/) || [];
      if (!tag) return str;

      const regExp = new RegExp(`(<${tag} class="series">.*?<\/${tag}>)`, "g");
      return str.replace(regExp, "");
    },
    // remove line indicators from syntaxhighlight
    (str) => str.replace(/(<td class="gutter">.*?<\/td>)/g, ""),
    // converting special characters
    (str) =>
      str.replace(/&#(\d+);/g, (_, dec) => `${String.fromCharCode(dec)}`),
    // strip HTML Tags
    (str) => stripHTML(str),
  ]);
}

module.exports = stripHTMLHelper;
