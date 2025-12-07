const sass = require("sass");
const postcss = require("postcss");
const postcssModules = require("postcss-modules");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const path = require("path");
const fs = require("fs");
const log = require("hexo-log").default({ debug: false, silent: false });
const { storeCssModulesMap } = require("./css-modules-cache");

/**
 * @typedef {Object} HexoRendererData
 * @property {string} text - File content
 * @property {string} path - File path
 */

// Theme root directory path
const themeRoot = path.resolve(__dirname, "../..");

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
 * Checks if the file is an entry point.
 * @param {string} filePath - File path
 * @returns {boolean} Whether it is an entry point
 */
function isEntryPoint(filePath) {
  const normalizedPath = path.normalize(filePath);
  const entryPointPath = path.join(themeRoot, "source", "css", "index.scss");
  return normalizedPath === path.normalize(entryPointPath);
}

/**
 * Collects SCSS files to merge.
 * Order: source/css/index.scss, all scss files under components, all scss files under layout
 * @param {string} root - Theme root directory
 * @returns {{entryPoint: string|null, componentModuleFiles: string[], componentRegularFiles: string[], layoutModuleFiles: string[], layoutRegularFiles: string[]}} Object separated by category and module type
 */
function collectScssFiles(root) {
  const componentModuleFiles = [];
  const componentRegularFiles = [];
  const layoutModuleFiles = [];
  const layoutRegularFiles = [];

  // 1. source/css/index.scss (entry point)
  const entryPoint = path.join(root, "source", "css", "index.scss");
  const entryPointPath = fs.existsSync(entryPoint) ? entryPoint : null;

  // 2. components/**/*.scss
  const componentsDir = path.join(root, "components");
  if (fs.existsSync(componentsDir)) {
    const componentFiles = findScssFiles(componentsDir);
    componentFiles.sort();
    for (const filePath of componentFiles) {
      if (filePath.includes(".module.scss")) {
        componentModuleFiles.push(filePath);
      } else {
        componentRegularFiles.push(filePath);
      }
    }
  }

  // 3. layout/**/*.scss
  const layoutDir = path.join(root, "layout");
  if (fs.existsSync(layoutDir)) {
    const layoutFiles = findScssFiles(layoutDir);
    layoutFiles.sort();
    for (const filePath of layoutFiles) {
      if (filePath.includes(".module.scss")) {
        layoutModuleFiles.push(filePath);
      } else {
        layoutRegularFiles.push(filePath);
      }
    }
  }

  return {
    entryPoint: entryPointPath,
    componentModuleFiles,
    componentRegularFiles,
    layoutModuleFiles,
    layoutRegularFiles,
  };
}

/**
 * Merges multiple SCSS files into a single string.
 * @param {string[]} filePaths - Array of file paths to merge
 * @param {string} root - Theme root directory
 * @returns {string} Merged SCSS string
 */
function mergeScssFiles(filePaths, root) {
  const mergedContent = [];

  for (const filePath of filePaths) {
    if (!fs.existsSync(filePath)) {
      log.error(`SCSS file not found: ${filePath}`);
      continue;
    }

    const content = fs.readFileSync(filePath, "utf8");
    const relativePath = path.relative(root, filePath);

    // Add comment for file separation (for easier debugging)
    mergedContent.push(`\n/* ===== ${relativePath} ===== */\n`);
    mergedContent.push(content);
    mergedContent.push("\n");
  }

  return mergedContent.join("");
}

/**
 * Compiles SCSS to CSS.
 * @param {string} scssContent - SCSS content
 * @param {string} sourcePath - Source file path (for error messages)
 * @returns {Promise<string>} Compiled CSS string
 */
async function compileScss(scssContent, sourcePath) {
  const sourceCssDir = path.join(themeRoot, "source", "css");
  const fileDir = path.dirname(sourcePath);

  try {
    const result = await sass.compileStringAsync(scssContent, {
      loadPaths: [fileDir, sourceCssDir, themeRoot],
      style: "expanded",
      sourceMap: false,
    });

    return result.css;
  } catch (error) {
    throw new Error(`Failed to compile SCSS: ${error.message}\nFile: ${sourcePath}`);
  }
}

/**
 * Processes CSS through PostCSS pipeline.
 * @param {string} css - CSS content
 * @param {string} filePath - Original file path
 * @param {boolean} hasModuleFiles - Whether module files are included
 * @returns {Promise<string>} Processed CSS string
 */
async function processWithPostCSS(css, filePath, hasModuleFiles) {
  const plugins = [];

  // CSS Modules: Only apply when .module.scss files are included
  if (hasModuleFiles) {
    plugins.push(
      postcssModules({
        generateScopedName: "[hash:base64:11]",
        getJSON: (cssFileName, json) => {
          // Store CSS Modules hash map to unified cache file
          // Use original file path as cssFileName may be a temporary file path
          const normalizedPath = path.normalize(filePath);
          storeCssModulesMap(normalizedPath, json);
        },
      }),
    );
  }

  // Autoprefixer: Add vendor prefixes
  plugins.push(autoprefixer());

  // cssnano: CSS optimization
  plugins.push(
    cssnano({
      preset: ["default", { discardComments: { removeAll: true } }],
    }),
  );

  try {
    const result = await postcss(plugins).process(css, {
      from: filePath,
      to: filePath.replace(/\.scss$/, ".css"),
    });

    return result.css;
  } catch (error) {
    throw new Error(
      `Failed to process CSS with PostCSS: ${error.message}\nFile: ${filePath}`,
    );
  }
}

/**
 * SCSS renderer
 * Compiles SCSS files to CSS and processes them through PostCSS pipeline.
 * Stores CSS Modules hash map to unified cache file.
 *
 * @param {HexoRendererData} data - Hexo renderer data object
 * @param {Object} options - Renderer options
 * @returns {Promise<string>} Compiled CSS string
 */
function scssRenderer(data) {
  if (!data || !data.path) {
    return Promise.reject(new Error("Invalid renderer data: missing path"));
  }

  const filePath = data.path;
  const isEntry = isEntryPoint(filePath);
  const isModuleFile = filePath.includes(".module.scss");

  return (async () => {
    let css;
    let hasModules = false;

    if (isEntry) {
      // Entry point: Process files in order: entry point → components → layout
      const {
        entryPoint,
        componentModuleFiles,
        componentRegularFiles,
        layoutModuleFiles,
        layoutRegularFiles,
      } = collectScssFiles(themeRoot);

      const cssParts = [];

      // 1. Process entry point (if exists)
      if (entryPoint) {
        const entryContent = fs.readFileSync(entryPoint, "utf8");
        const compiledCss = await compileScss(entryContent, entryPoint);
        const processedCss = await processWithPostCSS(compiledCss, entryPoint, false);
        cssParts.push(processedCss);
      }

      // 2. Process component module files
      for (const moduleFilePath of componentModuleFiles) {
        if (!fs.existsSync(moduleFilePath)) {
          log.error(`SCSS module file not found: ${moduleFilePath}`);
          continue;
        }

        const moduleContent = fs.readFileSync(moduleFilePath, "utf8");
        const compiledCss = await compileScss(moduleContent, moduleFilePath);
        const processedCss = await processWithPostCSS(compiledCss, moduleFilePath, true);
        cssParts.push(processedCss);
      }

      // 3. Process component regular files
      if (componentRegularFiles.length > 0) {
        const mergedScss = mergeScssFiles(componentRegularFiles, themeRoot);
        const compiledCss = await compileScss(mergedScss, filePath);
        const processedCss = await processWithPostCSS(compiledCss, filePath, false);
        cssParts.push(processedCss);
      }

      // 4. Process layout module files
      for (const moduleFilePath of layoutModuleFiles) {
        if (!fs.existsSync(moduleFilePath)) {
          log.error(`SCSS module file not found: ${moduleFilePath}`);
          continue;
        }

        const moduleContent = fs.readFileSync(moduleFilePath, "utf8");
        const compiledCss = await compileScss(moduleContent, moduleFilePath);
        const processedCss = await processWithPostCSS(compiledCss, moduleFilePath, true);
        cssParts.push(processedCss);
      }

      // 5. Process layout regular files
      if (layoutRegularFiles.length > 0) {
        const mergedScss = mergeScssFiles(layoutRegularFiles, themeRoot);
        const compiledCss = await compileScss(mergedScss, filePath);
        const processedCss = await processWithPostCSS(compiledCss, filePath, false);
        cssParts.push(processedCss);
      }

      if (cssParts.length === 0) {
        throw new Error("No SCSS files found to merge");
      }

      // 6. Merge all CSS
      css = cssParts.join("\n");
    } else {
      // Process individual file
      css = await compileScss(data.text, filePath);
      hasModules = isModuleFile;
      css = await processWithPostCSS(css, filePath, hasModules);
    }

    return css;
  })();
}

// Register renderer with Hexo (explicitly as async renderer)
if (typeof hexo !== "undefined") {
  hexo.extend.renderer.register("scss", "css", scssRenderer, false);
}

module.exports = scssRenderer;
