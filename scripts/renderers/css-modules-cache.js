const path = require("path");
const fs = require("fs");
const log = require("hexo-log").default({ debug: false, silent: false });

const themeRoot = path.resolve(__dirname, "../..");
const sourceDir = path.join(themeRoot, "source");
const CACHE_FILE_PATH = path.join(sourceDir, ".cache", "css-modules.json");

/**
 * In-memory cache for CSS Modules hash maps.
 * This ensures that updates from SCSS renderer are immediately available to TSX renderer.
 * @type {Object<string, Object<string, string>>}
 */
const memoryCache = {};

/**
 * Cache file modification time to detect changes.
 * @type {number}
 */
let cacheFileMtime = 0;

/**
 * Reads CSS Modules hash map from the unified cache file.
 * @returns {Object<string, Object<string, string>>} Complete cache object
 */
function loadCacheFromFile() {
  try {
    if (fs.existsSync(CACHE_FILE_PATH)) {
      const stats = fs.statSync(CACHE_FILE_PATH);
      const currentMtime = stats.mtimeMs;

      // Only reload if file has been modified
      if (currentMtime > cacheFileMtime) {
        const content = fs.readFileSync(CACHE_FILE_PATH, "utf8");
        const fileCache = JSON.parse(content);
        Object.assign(memoryCache, fileCache);
        cacheFileMtime = currentMtime;
      }
    }
  } catch (error) {
    log.error(`Failed to load CSS Modules cache: ${error.message}`);
  }
  return memoryCache;
}

/**
 * Saves CSS Modules hash map to the unified cache file.
 * @param {Object<string, Object<string, string>>} cache - Complete cache object
 */
function saveCacheToFile(cache) {
  try {
    const dir = path.dirname(CACHE_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(CACHE_FILE_PATH, JSON.stringify(cache, null, 2), "utf8");
    // Update modification time
    if (fs.existsSync(CACHE_FILE_PATH)) {
      const stats = fs.statSync(CACHE_FILE_PATH);
      cacheFileMtime = stats.mtimeMs;
    }
  } catch (error) {
    log.error(`Failed to save CSS Modules cache: ${error.message}`);
  }
}

/**
 * Gets tokens from CSS Modules hash map.
 * Checks memory cache first, then falls back to file cache.
 * @param {string} filePath - SCSS file path
 * @returns {Object<string, string>} CSS Modules token map
 */
function getCssModulesTokens(filePath) {
  const normalizedPath = path.normalize(filePath);

  // First check memory cache
  if (memoryCache[normalizedPath]) {
    return memoryCache[normalizedPath];
  }

  // Fall back to file cache and update memory cache
  loadCacheFromFile();
  return memoryCache[normalizedPath] || {};
}

/**
 * Stores CSS Modules hash map.
 * Updates both memory cache and file cache.
 * Removes class names that are not in the new tokens and keeps only class names from the new tokens.
 * @param {string} filePath - SCSS file path
 * @param {Object<string, string>} tokens - CSS Modules token map
 */
function storeCssModulesMap(filePath, tokens) {
  const normalizedPath = path.normalize(filePath);

  // Load current cache (from file if memory is empty)
  if (Object.keys(memoryCache).length === 0) {
    loadCacheFromFile();
  }

  const existingTokens = memoryCache[normalizedPath] || {};

  // Merge based on new tokens: keep if hash is the same, update if different or new class name
  const mergedTokens = {};

  // Keep only class names from new tokens
  for (const [className, hash] of Object.entries(tokens)) {
    // Keep if existing hash is the same, use new hash if missing or different
    mergedTokens[className] =
      existingTokens[className] === hash ? existingTokens[className] : hash;
  }

  // Existing class names not in new tokens are removed (not included in mergedTokens)

  // Update memory cache immediately
  memoryCache[normalizedPath] = mergedTokens;

  // Also update file cache
  const fileCache = loadCacheFromFile();
  fileCache[normalizedPath] = mergedTokens;
  saveCacheToFile(fileCache);
}

/**
 * Clears the memory cache (useful for testing or reset).
 */
function clearMemoryCache() {
  Object.keys(memoryCache).forEach((key) => delete memoryCache[key]);
  cacheFileMtime = 0;
}

module.exports = {
  getCssModulesTokens,
  storeCssModulesMap,
  loadCacheFromFile,
  saveCacheToFile,
  clearMemoryCache,
  CACHE_FILE_PATH,
};
