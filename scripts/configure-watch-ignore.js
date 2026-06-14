const { makeRe } = require("micromatch");

const WATCH_IGNORE_PATTERNS = [
  "**/.agents/**",
  "**/.claude/**",
  "**/.codex/**",
  "**/.cursor/**",
  "**/.rulesync/**",
  "**/.serena/**",
  "**/.specify/**",
  "**/.vscode/**",
];

/**
 * Appends ignore patterns to Hexo theme watcher so AI tool directories
 * do not trigger regeneration during `hexo server`.
 * @param {import('hexo')} hexo - Hexo instance
 * @param {string[]} patterns - Micromatch patterns to ignore
 */
function appendWatchIgnore(hexo, patterns) {
  if (!hexo.theme) {
    return;
  }

  const theme = hexo.theme;
  const mergedPatterns = new Set([...(theme.ignore || []), ...patterns]);
  theme.ignore = [...mergedPatterns];

  const existingRegExpKeys = new Set(
    (theme.options.ignored || []).map((pattern) => pattern.toString()),
  );
  const mergedRegExpPatterns = [...(theme.options.ignored || [])];

  for (const pattern of patterns) {
    const regExp = makeRe(pattern);
    if (!regExp) {
      continue;
    }

    const regExpKey = regExp.toString();
    if (!existingRegExpKeys.has(regExpKey)) {
      existingRegExpKeys.add(regExpKey);
      mergedRegExpPatterns.push(regExp);
    }
  }

  theme.options.ignored = mergedRegExpPatterns;
}

if (typeof hexo !== "undefined") {
  appendWatchIgnore(hexo, WATCH_IGNORE_PATTERNS);
}

module.exports = appendWatchIgnore;
