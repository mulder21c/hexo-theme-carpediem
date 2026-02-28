const fs = require("fs");
const path = require("path");
const { build } = require("esbuild");
const log = require("hexo-log").default({ debug: false, silent: false });
const { minify } = require("terser");

// Theme root directory path
const themeRoot = path.resolve(__dirname, "../..");

// Flag to prevent multiple simultaneous executions
let isBundling = false;

/**
 * Gets the modification time of a file, or 0 if it doesn't exist.
 * @param {string} filePath - File path
 * @returns {number} Modification time in milliseconds, or 0 if file doesn't exist
 */
function getFileMtime(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      return fs.statSync(filePath).mtimeMs;
    }
  } catch (_error) {
    // File doesn't exist or can't be accessed
  }
  return 0;
}

/**
 * Recursively finds all *.ui.ts files in a directory.
 * @param {string} dirPath - Directory path to search
 * @param {string[]} fileList - Found file list (accumulated)
 * @returns {string[]} Array of found *.ui.ts file paths
 */
function findUiFiles(dirPath, fileList = []) {
  if (!fs.existsSync(dirPath)) {
    return fileList;
  }

  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findUiFiles(filePath, fileList);
    } else if (file.endsWith(".ui.ts")) {
      fileList.push(filePath);
    }
  }

  return fileList;
}

/**
 * Collects all *.ui.ts files from components and layout directories.
 * @param {string} root - Theme root directory
 * @returns {string[]} Array of found *.ui.ts file paths (sorted)
 */
function collectUiFiles(root) {
  const uiFiles = [];

  // 1. components/**/*.ui.ts
  const componentsDir = path.join(root, "components");
  if (fs.existsSync(componentsDir)) {
    const componentFiles = findUiFiles(componentsDir);
    uiFiles.push(...componentFiles);
  }

  // 2. layout/**/*.ui.ts
  const layoutDir = path.join(root, "layout");
  if (fs.existsSync(layoutDir)) {
    const layoutFiles = findUiFiles(layoutDir);
    uiFiles.push(...layoutFiles);
  }

  // Sort files for consistent output
  uiFiles.sort();

  return uiFiles;
}

/**
 * Bundles a single TypeScript UI file using esbuild.
 * @param {string} entryPoint - Entry point file path
 * @returns {Promise<string>} Bundled JavaScript code
 */
async function bundleSingleFile(entryPoint) {
  try {
    const result = await build({
      entryPoints: [entryPoint],
      bundle: true,
      format: "iife",
      target: "es2020",
      platform: "browser",
      write: false,
      minify: false, // Will minify with terser later
      sourcemap: false,
      treeShaking: true,
      legalComments: "none",
      tsconfig: path.join(themeRoot, "tsconfig.json"),
      define: {
        "process.env.NODE_ENV": '"production"',
      },
      // Path aliases are resolved via tsconfig.json paths configuration
      // External dependencies that should not be bundled
      external: [],
    });

    // esbuild returns outputs array, we need the text from the first output
    if (result.outputFiles && result.outputFiles.length > 0) {
      return result.outputFiles[0].text;
    }

    throw new Error(`No output files from esbuild for ${entryPoint}`);
  } catch (error) {
    log.error(`Failed to bundle file ${entryPoint}: ${error.message}`);
    if (error.errors) {
      error.errors.forEach((err) => {
        log.error(
          `  ${err.text} at ${err.location?.file}:${err.location?.line}:${err.location?.column}`,
        );
      });
    }
    throw error;
  }
}

/**
 * Bundles TypeScript UI files using esbuild.
 * Each file is bundled separately and then concatenated.
 * @param {string[]} entryPoints - Array of entry point file paths
 * @returns {Promise<string>} Concatenated bundled JavaScript code
 */
async function bundleUiFiles(entryPoints) {
  if (entryPoints.length === 0) {
    log.warn("No *.ui.ts files found to bundle");
    return "";
  }

  const bundledParts = [];

  for (const entryPoint of entryPoints) {
    try {
      const relativePath = path.relative(themeRoot, entryPoint);
      log.info(`  Bundling: ${relativePath}`);
      const bundledCode = await bundleSingleFile(entryPoint);
      if (bundledCode && bundledCode.trim().length > 0) {
        // Wrap each bundle in IIFE to avoid conflicts
        bundledParts.push(bundledCode);
      }
    } catch (error) {
      log.error(`Failed to bundle ${entryPoint}: ${error.message}`);
      // Continue with other files even if one fails
      continue;
    }
  }

  if (bundledParts.length === 0) {
    throw new Error("No files were successfully bundled");
  }

  // Join all bundled parts with newlines
  return bundledParts.join("\n\n");
}

/**
 * Minifies and obfuscates JavaScript code using terser.
 * @param {string} code - JavaScript code to minify
 * @returns {Promise<string>} Minified JavaScript code
 */
async function minifyCode(code) {
  if (!code || code.trim().length === 0) {
    return "";
  }

  try {
    const result = await minify(code, {
      compress: {
        drop_console: false, // Keep console logs for debugging
        drop_debugger: true,
        pure_funcs: [], // Functions that can be safely removed if return value is unused
        passes: 3, // Multiple passes for better optimization
      },
      mangle: {
        toplevel: false, // Don't mangle top-level names to preserve global scope
        properties: {
          // Don't mangle object properties to preserve parameter object structures
          // This prevents issues where destructured parameters don't match their source objects
          regex: false, // Disable property mangling entirely
        },
      },
      format: {
        comments: false,
        preserve_annotations: false,
      },
      toplevel: false,
      sourceMap: false,
    });

    if (result.error) {
      throw result.error;
    }

    return result.code || "";
  } catch (error) {
    log.error(`Failed to minify code: ${error.message}`);
    throw error;
  }
}

/**
 * Writes bundled and minified code to destination file.
 * @param {string} code - JavaScript code to write
 * @param {string} destPath - Destination file path
 */
function writeOutputFile(code, destPath) {
  const destDir = path.dirname(destPath);

  // Ensure destination directory exists
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  fs.writeFileSync(destPath, code, "utf8");
  log.info(`UI bundle written to: ${path.relative(themeRoot, destPath)}`);
}

/**
 * Gets cached source file list from a metadata file.
 * @param {string} metadataPath - Path to metadata file
 * @returns {string[]} Previously bundled source file paths, or empty array
 */
function getCachedSourceFiles(metadataPath) {
  try {
    if (fs.existsSync(metadataPath)) {
      const content = fs.readFileSync(metadataPath, "utf8");
      return JSON.parse(content);
    }
  } catch (_error) {
    // If metadata file is invalid, treat as if it doesn't exist
  }
  return [];
}

/**
 * Saves source file list to metadata file.
 * @param {string[]} sourceFiles - Array of source file paths
 * @param {string} metadataPath - Path to metadata file
 */
function saveCachedSourceFiles(sourceFiles, metadataPath) {
  try {
    const destDir = path.dirname(metadataPath);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.writeFileSync(metadataPath, JSON.stringify(sourceFiles, null, 2), "utf8");
  } catch (error) {
    log.warn(`Failed to save source file cache: ${error.message}`);
  }
}

/**
 * Checks if rebuild is necessary by comparing source files with output.
 * Rebuilds if:
 * - Output file doesn't exist
 * - Any source file is newer than output (or equal, to handle same-second edits)
 * - Source file list has changed (files added/removed)
 * @param {string[]} sourceFiles - Array of source file paths
 * @param {string} outputFile - Output file path
 * @returns {boolean} True if rebuild is necessary
 */
function needsRebuild(sourceFiles, outputFile) {
  const outputMtime = getFileMtime(outputFile);

  // If output doesn't exist, we need to build
  if (outputMtime === 0) {
    log.info("Output file does not exist, rebuild needed.");
    return true;
  }

  // Normalize paths for comparison
  const normalizePaths = (files) => files.map((f) => path.normalize(f)).sort();

  // Check if source file list has changed
  const metadataPath = path.join(themeRoot, "source", ".cache", "ui.js.metadata.json");
  const cachedFiles = normalizePaths(getCachedSourceFiles(metadataPath));
  const currentFiles = normalizePaths(sourceFiles);

  if (JSON.stringify(cachedFiles) !== JSON.stringify(currentFiles)) {
    log.info("Source file list has changed, rebuild needed.");
    log.info(`  Previous: ${cachedFiles.length} files`);
    log.info(`  Current: ${currentFiles.length} files`);
    return true;
  }

  // Check if any source file is newer than or equal to output
  // Use >= instead of > to handle same-second edits
  for (const sourceFile of sourceFiles) {
    const sourceMtime = getFileMtime(sourceFile);
    if (sourceMtime >= outputMtime) {
      const relativePath = path.relative(themeRoot, sourceFile);
      log.info(
        `Source file ${relativePath} is newer or equal to output, rebuild needed.`,
      );
      log.info(`  Source mtime: ${new Date(sourceMtime).toISOString()}`);
      log.info(`  Output mtime: ${new Date(outputMtime).toISOString()}`);
      return true;
    }
  }

  log.info("All source files are older than output, skipping rebuild.");
  return false;
}

/**
 * Main function to bundle and minify UI files.
 */
async function bundleUi() {
  // Prevent multiple simultaneous executions
  if (isBundling) {
    log.debug("UI bundling already in progress, skipping...");
    return;
  }

  try {
    isBundling = true;

    // 1. Collect all *.ui.ts files
    const uiFiles = collectUiFiles(themeRoot);

    if (uiFiles.length === 0) {
      log.warn("No *.ui.ts files found. Skipping UI bundling.");
      return;
    }

    const outputPath = path.join(themeRoot, "source", "js", "ui.js");

    // 2. Check if rebuild is necessary
    const shouldRebuild = needsRebuild(uiFiles, outputPath);
    if (!shouldRebuild) {
      log.info("UI bundle is up to date, skipping rebuild.");
      return;
    }

    log.info("Starting UI bundling process...");
    log.info(`Found ${uiFiles.length} UI file(s):`);
    uiFiles.forEach((file) => {
      log.info(`  - ${path.relative(themeRoot, file)}`);
    });

    // 3. Bundle TypeScript files with esbuild
    log.info("Bundling TypeScript files...");
    const bundledCode = await bundleUiFiles(uiFiles);

    if (!bundledCode || bundledCode.trim().length === 0) {
      log.warn("Bundle result is empty. Skipping minification.");
      return;
    }

    // 4. Minify and obfuscate with terser
    log.info("Minifying and obfuscating code...");
    const minifiedCode = await minifyCode(bundledCode);

    if (!minifiedCode || minifiedCode.trim().length === 0) {
      log.warn("Minified code is empty. Writing bundled code instead.");
      writeOutputFile(bundledCode, outputPath);
      return;
    }

    // 5. Write output file
    writeOutputFile(minifiedCode, outputPath);

    // 6. Save source file list metadata for change detection
    const metadataPath = path.join(themeRoot, "source", ".cache", "ui.js.metadata.json");
    saveCachedSourceFiles(uiFiles, metadataPath);

    log.info("UI bundling completed successfully.");
  } catch (error) {
    log.error(`UI bundling failed: ${error.message}`);
    throw error;
  } finally {
    isBundling = false;
  }
}

// Register Hexo filter
if (typeof hexo !== "undefined") {
  // Run before generation to ensure UI bundle is available
  // Note: source/js/ui.js is not watched by Hexo as it's in source/ but generated,
  // so this won't cause infinite loops
  hexo.extend.filter.register("before_generate", bundleUi, 10);
}

module.exports = bundleUi;
