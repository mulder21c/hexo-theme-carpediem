const regFootnote =
  /(<section class="footnotes" role="doc-footnote">(.|\n)*?)(<\/section>)/g;
const regHeroOrigin = /<p>(Hero(.|\n)*?(<a.*<\/a>)(.|\n)*?)<\/p>/gi;

function heroOriginFilter(data) {
  let { content } = data;
  let [matched] = content.match(regHeroOrigin) || [];
  if (!matched) return;

  content = content.replace(regHeroOrigin, ``);
  matched = matched.replace(regHeroOrigin, function (_, g, ...args) {
    return `<small>${g}</small>`;
  });

  data.content = content;

  if (regFootnote.test(content)) {
    data.content = content.replace(regFootnote, function (_, g1, g2, g3) {
      return `${g1}${g2}<p>${matched}</p>${g3}`;
    });
  } else {
    const section = `<section class="footnotes" role="doc-footnote"><p>${matched}</p><\/section>`;
    data.content = `${content}${section}`;
  }
}

module.exports = heroOriginFilter;
