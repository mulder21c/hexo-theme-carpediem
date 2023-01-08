window.addEventListener(`load`, function () {
  const { themePrefix } = window;
  const search = window.uis.get(`search`);
  // algolia configuration
  search({
    searchBoxId: `#searchbox`,
    inputId: `#keyword`,
    searchBtnId: `#btn-search`,
    hitsId: `#search-result`,
    statusId: `#search-status`,
    noResultTemplate: `<p>No results for <q>{query}</q></p>`,
    itemTemplate: ({ themePrefix, permalink, title, content, tags = [] }) => {
      return (
        `<a href="${permalink}" class="${themePrefix}-search__list__link">` +
        `<b class="${themePrefix}-search__list__title">${title}</b>` +
        `<p class="${themePrefix}-search__list__content">${content}</p>` +
        `<p class="${themePrefix}-search__list__tags">${tags.reduce(
          (str, tag) => `${str}${str ? " " : ""}<span>${tag}</span>`,
          ``
        )}</p></a>`
      );
    },
    widgetClasses: {
      root: `${themePrefix}-search__result`,
      emptyRoot: `${themePrefix}-search__result--empty`,
      list: `${themePrefix}-search__list`,
      item: `${themePrefix}-search__list__item`,
    },
  });
});
