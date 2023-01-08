function makeGlobalVar(props = {}) {
  for (const [key, val] of Object.entries(props)) {
    window[key] = val;
  }
}
makeGlobalVar({
  themePrefix: "{themePrefix}",
  themeIdentifier: "theme",
  getThemeColor: function () {
    const config = JSON.parse(localStorage.getItem(window.themeIdentifier));
    return !config || config.colorScheme === "auto"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : config.colorScheme;
  },
});
