((window, document) => {
  const { themePrefix } = window;
  const algoliaSearch = ({
    searchBoxId,
    inputId,
    searchBtnId,
    hitsId,
    statusId,
    widgetClasses = {},
    noResultTemplate,
    itemTemplate,
    stateMsg = {
      loading: `Loading...`,
      error: `Search failed, please try again later.`,
      idle: `%d results found.`,
    },
    truncateLen = 200,
  }) => {
    // customize Search Box
    const { connectSearchBox } = instantsearch.connectors;
    const renderSearchBox = (renderOptions, isFirstRender) => {
      const { query, refine, searchAsYouType, widgetParams } = renderOptions;
      if (isFirstRender) {
        const input = document.querySelector(`${inputId}`);
        const searchBtn = document.querySelector(`${searchBtnId}`);
        input.addEventListener(`input`, (event) => {
          searchAsYouType && refine(event.target.value);
        });
        input.addEventListener(`keyup`, (event) => {
          const { key } = event;
          if (key.toLowerCase() === `enter`) refine(event.target.value);
        });
        searchBtn.addEventListener(`click`, () => {
          refine(input.value);
        });
      }
      widgetParams.container.querySelector(`${inputId}`).value = query;
    };
    const customSearchBox = connectSearchBox(renderSearchBox);
    const getLenWithoutTag = (str) => {
      return (
        str.length -
        (str.match(/(<mark\s*.*?>|<\/mark>)/g) || []).join(``).length -
        (str.match(/\&[^;]+;/g) || []).length
      );
    };
    const truncateContent = (content) => {
      const paragraphs = content.split(`\n`);
      const firstMatchIdx = paragraphs.findIndex((html) =>
        html.includes(`<mark`)
      );

      let str = paragraphs[firstMatchIdx] || ``,
        len = getLenWithoutTag(str),
        step = 1,
        direction = -1;

      while (len < truncateLen) {
        if (direction < 0) {
          str = [paragraphs[firstMatchIdx + step * direction] || ``, str].join(
            `\n`
          );
        } else {
          str = [
            str,
            paragraphs[firstMatchIdx + step++ * direction] || ``,
          ].join(`\n`);
        }
        str = str.replace(/\n(\s|\t|\n)+/g, `\n`);
        len = getLenWithoutTag(str);
        direction = direction * -1;
      }
      return str.replace(/\n/g, `<br>`).replace(/&amp;/g, `&`);
    };

    const searchClient = algoliasearch(`{algoliaAppId}`, `{algoliaApiKey}`);
    const search = instantsearch({
      indexName: `{algoliaIndexName}`,
      searchClient,
      searchFunction(helper) {
        if (helper.state.query && helper.state.query.length > 1) {
          helper.setQueryParameter("typoTolerance", false).search();
        }
      },
    });

    search.on(`render`, () => {
      const container = document.querySelector(`${statusId}`);
      if (!container) return;
      const resultCount = search.helper.lastResults?.hits?.length;
      switch (search.status) {
        case `loading`:
        case `error`:
          container.textContent = stateMsg.loading;
          break;
        case `idle`:
          container.textContent = stateMsg.idle.replace(
            /%d/,
            Number.isInteger(resultCount) ? resultCount : ``
          );
          break;
      }
    });

    search.addWidgets([
      customSearchBox({
        container: document.querySelector(`${searchBoxId}`),
        searchAsYouType: false,
      }),
      instantsearch.widgets.hits({
        container: hitsId,
        cssClasses: { ...widgetClasses },
        transformItems(items) {
          return items.map((item) => {
            return {
              ...item,
              _highlightResult: Object.fromEntries(
                Object.entries(item._highlightResult).map(([key, value]) => {
                  if (key.startsWith(`content`)) {
                    key = `content`;
                  }
                  return [[key], value];
                })
              ),
            };
          });
        },
        templates: {
          empty(results) {
            return `${noResultTemplate.replace(/{query}/g, results.query)}`;
          },
          item(hit) {
            return itemTemplate({
              themePrefix,
              permalink: hit.permalink,
              title: instantsearch.highlight({ hit, attribute: `title` }),
              content: truncateContent(
                instantsearch.highlight({ hit, attribute: `content` })
              ),
              tags: hit.tags
                .slice(0, 3)
                .map((tag, idx) => {
                  return `#${instantsearch.highlight({
                    hit,
                    attribute: `tags.${idx}`,
                  })}`;
                })
                .sort((a, b) => {
                  if (a.includes(`<mark`) && b.includes(`<mark`)) {
                    return a.length - b.length;
                  }
                  if (b.includes(`<mark`)) return 1;
                  return a.length - b.length;
                }),
            });
          },
        },
      }),
    ]);
    search.start();
  };
  window.uis.set(`search`, algoliaSearch);
})(window, document);
