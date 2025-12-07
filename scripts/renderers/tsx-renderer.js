const { renderToStaticMarkup } = require("react-dom/server");
const React = require("react");
const path = require("path");
const { register, create } = require("ts-node");
const Module = require("module");
const fs = require("fs");
const log = require("hexo-log").default({ debug: false, silent: false });

const themeRoot = path.resolve(__dirname, "../..");
const tsconfigPath = path.join(themeRoot, "tsconfig.json");
const {
  getCssModulesTokens,
  loadCacheFromFile,
  CACHE_FILE_PATH,
} = require("./css-modules-cache");

if (fs.existsSync(tsconfigPath)) {
  const tsConfig = require(tsconfigPath);
  const baseUrl = path.resolve(themeRoot, tsConfig.compilerOptions.baseUrl || ".");
  const paths = tsConfig.compilerOptions.paths || {};

  const tsConfigPaths = require("tsconfig-paths");
  tsConfigPaths.register({
    baseUrl: baseUrl,
    paths: paths,
  });
}

// Create ts-node service for in-memory compilation
const tsNodeService = create({
  compilerOptions: {
    module: "commonjs",
    jsx: "react-jsx",
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
    skipLibCheck: true,
    baseUrl: path.resolve(__dirname, "../.."),
    paths: {
      "@components/*": ["components/*"],
      "@layout/*": ["layout/*"],
      "@styles/*": ["src/styles/*"],
    },
  },
  transpileOnly: true,
});

// Register ts-node for regular require
register({
  compilerOptions: {
    module: "commonjs",
    jsx: "react-jsx",
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
    skipLibCheck: true,
    baseUrl: path.resolve(__dirname, "../.."),
    paths: {
      "@components/*": ["components/*"],
      "@layout/*": ["layout/*"],
      "@styles/*": ["src/styles/*"],
    },
  },
  transpileOnly: true,
});

// Map to store source code in memory
const inMemorySourceMap = new Map();

// Map to track file modification times for cache invalidation
const fileMtimeMap = new Map();

// Track CSS Modules cache file modification time
let cssModulesCacheMtime = 0;

/**
 * Resolves path alias to actual path.
 * @param {string} moduleId - Module ID (e.g., '@components/atoms/Heading')
 * @returns {string|null} Resolved path or null
 */
function resolvePathAlias(moduleId) {
  // Return null if not a path alias
  if (!moduleId.startsWith("@")) {
    return null;
  }

  if (!fs.existsSync(tsconfigPath)) {
    return null;
  }

  const tsConfig = require(tsconfigPath);
  const baseUrl = path.resolve(themeRoot, tsConfig.compilerOptions.baseUrl || ".");
  const paths = tsConfig.compilerOptions.paths || {};

  // Match path alias
  for (const [pattern, replacements] of Object.entries(paths)) {
    // Extract prefix by removing * from pattern
    const prefix = pattern.replace(/\*$/, "");
    if (moduleId.startsWith(prefix)) {
      // Extract suffix part
      const suffix = moduleId.substring(prefix.length);
      // Try each replacement pattern
      for (const replacement of replacements) {
        // Remove * from replacement pattern
        const replacementBase = replacement.replace(/\*$/, "");
        // Generate actual path
        const resolvedBase = path.resolve(baseUrl, replacementBase + suffix);

        // Check possible file paths
        const possiblePaths = [
          resolvedBase + ".tsx",
          resolvedBase + ".ts",
          path.join(resolvedBase, "index.tsx"),
          path.join(resolvedBase, "index.ts"),
        ];

        for (const possiblePath of possiblePaths) {
          if (fs.existsSync(possiblePath)) {
            return possiblePath;
          }
        }
      }
    }
  }

  return null;
}

/**
 * Extends Module._resolveFilename to resolve path aliases.
 */
const originalResolveFilename = Module._resolveFilename;

Module._resolveFilename = function (request, parent, isMain, options) {
  // Try to resolve if it's a path alias
  if (request.startsWith("@")) {
    // Extract file path from parent
    let parentPath = themeRoot;
    if (parent) {
      if (typeof parent === "string") {
        parentPath = parent;
      } else if (parent.filename) {
        parentPath = parent.filename;
      } else if (parent.id) {
        parentPath = parent.id;
      } else if (parent.path) {
        parentPath = parent.path;
      }
    }

    const resolvedPath = resolvePathAlias(request, parentPath);
    if (resolvedPath) {
      // Convert to absolute path
      const absolutePath = path.isAbsolute(resolvedPath)
        ? resolvedPath
        : path.resolve(themeRoot, resolvedPath);
      // Resolve by passing absolute path to original function
      return originalResolveFilename.call(this, absolutePath, parent, isMain, options);
    }
  }

  // Perform original behavior
  try {
    return originalResolveFilename.call(this, request, parent, isMain, options);
  } catch (error) {
    // Retry with path alias if original resolution failed
    if (request.startsWith("@")) {
      const resolvedPath = resolvePathAlias(request, themeRoot);
      if (resolvedPath) {
        const absolutePath = path.isAbsolute(resolvedPath)
          ? resolvedPath
          : path.resolve(themeRoot, resolvedPath);
        return originalResolveFilename.call(this, absolutePath, parent, isMain, options);
      }
    }
    throw error;
  }
};

/**
 * @typedef {Object} HexoRendererData
 * @property {string} text - File content
 * @property {string} path - File path
 */

/**
 * Recursively finds TSX/TS files in a directory.
 * @param {string} dirPath - Directory path to search
 * @param {string[]} fileList - Found file list (accumulated)
 * @returns {string[]} Array of found TSX/TS file paths
 */
function findTsxFiles(dirPath, fileList = []) {
  if (!fs.existsSync(dirPath)) {
    return fileList;
  }

  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findTsxFiles(filePath, fileList);
    } else if (file.endsWith(".tsx") || file.endsWith(".ts")) {
      fileList.push(filePath);
    }
  }

  return fileList;
}

/**
 * Recursively finds SCSS files in a directory.
 * @param {string} dirPath - Directory path to search
 * @param {string[]} fileList - Found file list (accumulated)
 * @returns {string[]} Array of found SCSS file paths
 */
function findScssFiles(dirPath, fileList = []) {
  if (!fs.existsSync(dirPath)) {
    return fileList;
  }

  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findScssFiles(filePath, fileList);
    } else if (file.endsWith(".scss")) {
      fileList.push(filePath);
    }
  }

  return fileList;
}

/**
 * Clears require cache for all TSX files and SCSS modules in components and layout directories.
 * This ensures that file changes are reflected without restarting Hexo.
 */
function clearComponentCache() {
  const componentsDir = path.join(themeRoot, "components");
  const layoutDir = path.join(themeRoot, "layout");

  // Clear cache for all modules in require.cache
  for (const moduleId in require.cache) {
    const module = require.cache[moduleId];
    if (module && module.filename) {
      const normalizedPath = path.normalize(module.filename);
      const normalizedComponentsDir = path.normalize(componentsDir);
      const normalizedLayoutDir = path.normalize(layoutDir);

      // Check if the module is a TSX/TS file or .module.scss file in components or layout directory
      if (
        (normalizedPath.startsWith(normalizedComponentsDir) ||
          normalizedPath.startsWith(normalizedLayoutDir)) &&
        (normalizedPath.endsWith(".tsx") ||
          normalizedPath.endsWith(".ts") ||
          normalizedPath.includes(".module.scss"))
      ) {
        delete require.cache[moduleId];
      }
    }
  }

  // Reload CSS Modules cache from file to get latest tokens
  if (fs.existsSync(CACHE_FILE_PATH)) {
    try {
      const stats = fs.statSync(CACHE_FILE_PATH);
      const currentMtime = stats.mtimeMs;
      if (currentMtime > cssModulesCacheMtime) {
        loadCacheFromFile();
        cssModulesCacheMtime = currentMtime;
      }
    } catch (error) {
      log.warn(`Failed to reload CSS Modules cache: ${error.message}`);
    }
  }
}

/**
 * Checks all TSX and SCSS files in components and layout directories for changes.
 * Also checks CSS Modules cache file for changes.
 * Clears cache if any file has been modified.
 * @returns {boolean} True if any file was modified, false otherwise
 */
function checkAllComponentFilesForChanges() {
  const componentsDir = path.join(themeRoot, "components");
  const layoutDir = path.join(themeRoot, "layout");
  let hasChanges = false;

  // Check all TSX files in components directory
  if (fs.existsSync(componentsDir)) {
    const componentFiles = findTsxFiles(componentsDir);
    for (const filePath of componentFiles) {
      try {
        if (!fs.existsSync(filePath)) {
          continue;
        }

        const stats = fs.statSync(filePath);
        const currentMtime = stats.mtimeMs;
        const previousMtime = fileMtimeMap.get(filePath);

        if (previousMtime === undefined || currentMtime > previousMtime) {
          hasChanges = true;
          fileMtimeMap.set(filePath, currentMtime);
        }
      } catch (error) {
        log.warn(
          `Failed to check file modification time for ${filePath}: ${error.message}`,
        );
      }
    }

    // Check all SCSS files in components directory
    const componentScssFiles = findScssFiles(componentsDir);
    for (const filePath of componentScssFiles) {
      try {
        if (!fs.existsSync(filePath)) {
          continue;
        }

        const stats = fs.statSync(filePath);
        const currentMtime = stats.mtimeMs;
        const previousMtime = fileMtimeMap.get(filePath);

        if (previousMtime === undefined || currentMtime > previousMtime) {
          hasChanges = true;
          fileMtimeMap.set(filePath, currentMtime);
        }
      } catch (error) {
        log.warn(
          `Failed to check file modification time for ${filePath}: ${error.message}`,
        );
      }
    }
  }

  // Check all TSX files in layout directory
  if (fs.existsSync(layoutDir)) {
    const layoutFiles = findTsxFiles(layoutDir);
    for (const filePath of layoutFiles) {
      try {
        if (!fs.existsSync(filePath)) {
          continue;
        }

        const stats = fs.statSync(filePath);
        const currentMtime = stats.mtimeMs;
        const previousMtime = fileMtimeMap.get(filePath);

        if (previousMtime === undefined || currentMtime > previousMtime) {
          hasChanges = true;
          fileMtimeMap.set(filePath, currentMtime);
        }
      } catch (error) {
        log.warn(
          `Failed to check file modification time for ${filePath}: ${error.message}`,
        );
      }
    }

    // Check all SCSS files in layout directory
    const layoutScssFiles = findScssFiles(layoutDir);
    for (const filePath of layoutScssFiles) {
      try {
        if (!fs.existsSync(filePath)) {
          continue;
        }

        const stats = fs.statSync(filePath);
        const currentMtime = stats.mtimeMs;
        const previousMtime = fileMtimeMap.get(filePath);

        if (previousMtime === undefined || currentMtime > previousMtime) {
          hasChanges = true;
          fileMtimeMap.set(filePath, currentMtime);
        }
      } catch (error) {
        log.warn(
          `Failed to check file modification time for ${filePath}: ${error.message}`,
        );
      }
    }
  }

  // Check CSS Modules cache file for changes
  if (fs.existsSync(CACHE_FILE_PATH)) {
    try {
      const stats = fs.statSync(CACHE_FILE_PATH);
      const currentMtime = stats.mtimeMs;
      if (currentMtime > cssModulesCacheMtime) {
        hasChanges = true;
        cssModulesCacheMtime = currentMtime;
      }
    } catch (error) {
      log.warn(
        `Failed to check CSS Modules cache file modification time: ${error.message}`,
      );
    }
  }

  if (hasChanges) {
    clearComponentCache();
    log.info("Component files changed, cache cleared");
  }

  return hasChanges;
}

/**
 * Checks if a file has been modified and clears cache if needed.
 * Also checks all component files for changes.
 * @param {string} filePath - File path to check (may be virtual path)
 * @returns {boolean} True if file was modified, false otherwise
 */
function checkAndClearCacheIfModified(filePath) {
  // First, check if the provided path is a real file
  if (fs.existsSync(filePath)) {
    try {
      const stats = fs.statSync(filePath);
      const currentMtime = stats.mtimeMs;
      const previousMtime = fileMtimeMap.get(filePath);

      if (previousMtime === undefined || currentMtime > previousMtime) {
        fileMtimeMap.set(filePath, currentMtime);
        // Check all component files and clear cache if needed
        checkAllComponentFilesForChanges();
        return true;
      }
    } catch (error) {
      log.warn(
        `Failed to check file modification time for ${filePath}: ${error.message}`,
      );
    }
  }

  // Always check all component files for changes (in case virtualPath is not the real path)
  return checkAllComponentFilesForChanges();
}

/**
 * Sets up require hook for .module.scss files.
 * Uses Module._extensions for safer handling.
 */
const originalScssExtension = Module._extensions[".scss"];

Module._extensions[".scss"] = function (module, filePath) {
  // If it's a .module.scss file
  if (filePath.includes(".module.scss")) {
    // Always reload CSS Modules cache from file to get latest tokens
    // This ensures that SCSS file changes are reflected even when only TSX files are modified
    if (fs.existsSync(CACHE_FILE_PATH)) {
      try {
        const stats = fs.statSync(CACHE_FILE_PATH);
        const currentMtime = stats.mtimeMs;
        if (currentMtime > cssModulesCacheMtime) {
          loadCacheFromFile();
          cssModulesCacheMtime = currentMtime;
        }
      } catch {
        // Ignore errors, will try to load from cache
      }
    }

    const normalizedPath = path.normalize(filePath);
    const tokens = getCssModulesTokens(normalizedPath);

    // Return empty object if hash map is not found (with warning log)
    if (Object.keys(tokens).length === 0) {
      log.warn(
        `CSS Modules map not found for ${normalizedPath}. Make sure the SCSS file is processed before the TSX file.`,
      );
    }

    // Set CSS Modules token map as module exports
    module.exports = tokens;
    return;
  }

  // Use original handling for regular .scss files (if available)
  if (originalScssExtension) {
    originalScssExtension(module, filePath);
  } else {
    // Default handling: return empty object
    module.exports = {};
  }
};

/**
 * Sets up require hook for .tsx files.
 * Provides source code from memory and compiles with ts-node.
 */
const originalTsxExtension = Module._extensions[".tsx"];

Module._extensions[".tsx"] = function (module, filePath) {
  // Get source code from memory map
  const sourceCode = inMemorySourceMap.get(filePath);

  if (sourceCode) {
    // Compile from memory using ts-node service
    const compiledCode = tsNodeService.compile(sourceCode, filePath);
    // Execute compiled JavaScript code
    module._compile(compiledCode, filePath);
    // Remove from map after use (memory saving)
    inMemorySourceMap.delete(filePath);
    return;
  }

  // Use original handling if not in memory (actual file)
  if (originalTsxExtension) {
    originalTsxExtension(module, filePath);
  } else {
    // Process with regular require since ts-node is already registered
    const fs = require("fs");
    const source = fs.readFileSync(filePath, "utf8");
    const compiledCode = tsNodeService.compile(source, filePath);
    module._compile(compiledCode, filePath);
  }
};

/**
 * TSX renderer
 * Compiles TSX files to React components and renders them to HTML.
 * Reads and uses CSS Modules hash map from unified cache file.
 * Compiles in memory without temporary files.
 * Files in layout directory are automatically wrapped with Document component.
 *
 * @param {HexoRendererData} data - Hexo renderer data object
 * @param {Object} _options - Renderer options (unused)
 * @returns {string} Rendered HTML string
 */
function tsxRenderer(data, _options) {
  log.info("tsxRenderer entered", data.path);
  const virtualPath = data.path;

  try {
    // Check if file has been modified and clear cache if needed
    checkAndClearCacheIfModified(virtualPath);

    // Store source code in memory map
    inMemorySourceMap.set(virtualPath, data.text);

    // Remove from require cache to force reload
    delete require.cache[virtualPath];

    // Load component module (ts-node will automatically compile)

    const ComponentModule = require(virtualPath);

    // Extract component
    const Component = ComponentModule.default || ComponentModule;

    if (!Component) {
      throw new Error(
        `No default export found in TSX file: ${data.path}. The component must have a default export.`,
      );
    }

    // Check if it's a layout directory
    const isLayoutFile =
      virtualPath.includes(path.join(themeRoot, "layout")) ||
      virtualPath.includes("layout/") ||
      virtualPath.replace(/\\/g, "/").includes("layout/");

    let html;

    if (isLayoutFile) {
      // Wrap with Document component if it's a layout file
      const DocumentModule = require(path.resolve(themeRoot, "components/_document.tsx"));
      const Document = DocumentModule.default || DocumentModule;

      if (!Document) {
        throw new Error("Document component not found");
      }

      // Render by wrapping layout component with Document component
      // title, description, lang can be extended to get from Hexo context later
      html = renderToStaticMarkup(
        React.createElement(
          Document,
          {
            title: undefined,
            description: undefined,
            lang: "ko",
          },
          React.createElement(Component),
        ),
      );

      // Add DOCTYPE
      html = "<!DOCTYPE html>\n" + html;
    } else {
      // Keep existing behavior for regular components
      html = renderToStaticMarkup(React.createElement(Component));
    }

    return html;
  } catch (error) {
    throw new Error(
      `Failed to render TSX file ${data.path}: ${
        error instanceof Error ? error.message : String(error)
      }${error.stack ? `\n${error.stack}` : ""}`,
    );
  } finally {
    // Clean up from memory map (already removed in Module._extensions, but for safety)
    inMemorySourceMap.delete(virtualPath);
    // Also remove from require cache
    delete require.cache[virtualPath];
  }
}

// Register renderer with Hexo
if (typeof hexo !== "undefined") {
  hexo.extend.renderer.register("tsx", "html", tsxRenderer);
}

module.exports = tsxRenderer;
