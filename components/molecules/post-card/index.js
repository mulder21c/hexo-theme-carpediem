(() => {
  const { themePrefix: prefix } = GLOBAL;
  const linkCardSelector = `.${prefix}-post-card--link`;

  function followLink(event) {
    const cardContainer = event.target?.closest(linkCardSelector);
    if (!cardContainer) return;
    const linkEl = cardContainer?.querySelector(`a`);
    linkEl.click();
  }

  document.addEventListener(`click`, followLink, false);
})();
