// @ts-check
const { isExternalLink } = require("hexo-util");
const rATag =
  /<a(?:\s+?|\s+?[^<>]+?\s+?)href=["']((?:https?:|\/\/)[^<>"']+)["'][^<>]*>/gi;
const rRelAttr = /rel=/i;
const rRelStrAttr = /rel=["']([^<>"']*)["']/i;

function externalLinkFilter(data) {
  const { allow_referrer, allow_follow } = data;

  data.content = data.content.replace(rATag, (str, href) => {
    const { url } = this.config;
    let rel = [];
    if (!isExternalLink(href, url)) return str;

    if (rRelAttr.test(str)) {
      str = str.replace(rRelStrAttr, (relStr, rel) => {
        let newRel = [];
        if (
          !(allow_referrer || []).some((pattern) => href.includes(pattern)) &&
          !rel.includes("noreferrer")
        ) {
          newRel.push(`noreferrer`);
        }

        if (
          !(allow_follow || []).some((pattern) => href.includes(pattern)) &&
          !rel.includes("nofollow")
        ) {
          newRel.push(`nofollow`);
        }

        return `rel="${[rel, ...newRel].join(" ")}"`;
      });
      return str;
    }

    if (!(allow_referrer || []).some((pattern) => href.includes(pattern))) {
      rel.push(`noreferrer`);
    }
    if (!(allow_follow || []).some((pattern) => href.includes(pattern))) {
      rel.push(`nofollow`);
    }

    if (rel.length) return str.replace(`href=`, `rel="${rel.join(" ")}" href=`);
    else return str;
  });
}

module.exports = externalLinkFilter;
