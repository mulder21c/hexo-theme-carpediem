/* eslint-disable import/no-extraneous-dependencies */

/**
 * @fileoverview SCSS Renderer for Hexo
 *
 * This module provides comprehensive SCSS compilation and processing capabilities for Hexo.
 * Features include:
 * - SCSS compilation with automatic imports
 * - CSS Modules support with scoped class names
 * - PostCSS processing with minification
 * - File watching for development
 * - Safe error handling and logging
 * - Configurable paths and options
 *
 * @author Your Name
 * @version 2.0.0
 */

import fs from "fs";
import path from "path";
import chokidar from "chokidar";
import { glob } from "glob";
import sass from "sass";
import postcss, { AcceptedPlugin } from "postcss";
import cssnano from "cssnano";
import postcssModules from "postcss-modules";
import { mkdirpSync } from "mkdirp";
import type { StoreFunctionData } from "hexo/dist/extend/renderer";

// Types and Interfaces
interface ScssConfig {
  paths: {
    projectRoot: string;
    src: string;
    outputCss: string;
    outputMap: string;
    styles: string;
    components: string;
  };
  filePatterns: {
    mainScss: string;
    componentScss: string;
  };
  sass: {
    style: "expanded" | "compressed";
    loadPaths: Array<string>;
  };
  postcss: {
    preset: string;
  };
  cssModules: {
    generateScopedName: string;
  };
}

interface CompileResult {
  css: string;
  isModule: boolean;
}

interface CssModulesMap {
  [modulePath: string]: Record<string, string>;
}

// Configuration
const createConfig = (): ScssConfig => {
  const projectRoot = hexo.theme_dir || path.resolve(__dirname, "../../");

  return {
    paths: {
      projectRoot,
      src: path.join(projectRoot, "src"),
      outputCss: path.join(projectRoot, "source/css"),
      outputMap: path.join(projectRoot, "src/styles"),
      styles: path.join(projectRoot, "src/styles"),
      components: path.join(projectRoot, "src/components"),
    },
    filePatterns: {
      mainScss: "/styles/index.scss",
      componentScss: "/components/**/*.scss",
    },
    sass: {
      style: "compressed",
      loadPaths: [
        path.join(projectRoot, "src/styles"),
        path.join(projectRoot, "src/components"),
      ],
    },
    postcss: {
      preset: "default",
    },
    cssModules: {
      generateScopedName: "[local]_[hash:base64:8]",
    },
  };
};

// Constants
const config = createConfig();
const SCSS_IMPORTS_TEMPLATE = `
  @use "sass:math";
  @use "sass:map";
  @use "sass:color";
  @use "${config.paths.styles}/helpers/functions" as func;
  @use "${config.paths.styles}/helpers/mixins" as mixin;
  @use "${config.paths.styles}/modules/variables" as var;
`;

// Store CSS module class mappings
const cssModulesMap: CssModulesMap = {};

// Utility Functions
/**
 * Get all SCSS file patterns to watch
 * @returns Array of file patterns
 */
function getScssFilePatterns(): Array<string> {
  return [config.filePatterns.mainScss, config.filePatterns.componentScss];
}

/**
 * Find all SCSS files in the project
 * @returns Array of SCSS file paths
 */
function findScssFiles(searchPath: string): Array<string> {
  return glob.sync(`${config.paths.src}${searchPath}`);
}

/**
 * Get all SCSS files from configured patterns
 * @returns Array of all SCSS file paths
 */
function getAllScssFiles(): Array<string> {
  return getScssFilePatterns().reduce((files, pattern) => {
    const foundFiles = findScssFiles(pattern) || [];
    return [...files, ...foundFiles];
  }, [] as Array<string>);
}

/**
 * Compile SCSS file to CSS
 * @param filePath Path to the SCSS file
 * @returns Object containing compiled CSS and whether it's a CSS module
 */
async function compileScss(filePath: string): Promise<CompileResult> {
  // Determine if file is a CSS module based on filename
  const isModule = path.basename(filePath).includes(".module.scss");

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const contentWithAdditionalData = `${SCSS_IMPORTS_TEMPLATE}\n${fileContent}`;

  // Compile SCSS to CSS using sass compiler
  const result = sass.compileString(contentWithAdditionalData, {
    loadPaths: config.sass.loadPaths,
    style: config.sass.style,
  });

  return {
    css: result.css.toString(),
    isModule,
  };
}

/**
 * Process CSS with PostCSS plugins (modules and minification)
 * @param css CSS content to process
 * @param filePath Original file path
 * @param isModule Whether the file is a CSS module
 * @returns Processed CSS content
 */
async function processWithPostcss(
  css: string,
  filePath: string,
  isModule: boolean,
): Promise<string> {
  const srcPath = path.resolve(config.paths.projectRoot, "src").replace(/\\/g, "/");
  // Create a unique ID for the module based on its path
  const modulesId = filePath
    .replace(/\\/g, "/")
    .replace(/\.[^/.]+$/, "")
    .replace(srcPath, "");

  // Set up PostCSS plugins - always include cssnano for minification
  const plugins: Array<AcceptedPlugin> = [cssnano({ preset: config.postcss.preset })];

  // For CSS modules, add the postcss-modules plugin to generate class name mappings
  if (isModule) {
    plugins.unshift(
      postcssModules({
        generateScopedName: config.cssModules.generateScopedName,
        getJSON: (cssFileName: string, json: Record<string, string>) => {
          cssModulesMap[modulesId] = json;
        },
      }),
    );
  }

  const result = await postcss(plugins).process(css, {
    from: filePath,
  });

  return result.css;
}

/**
 * Save the CSS modules mapping to a JSON file
 * This mapping is used by the application to reference the generated class names
 */
async function saveCssModulesMap(): Promise<void> {
  mkdirpSync(config.paths.outputMap);

  fs.writeFileSync(
    path.join(config.paths.outputMap, "css-modules-map.json"),
    JSON.stringify(cssModulesMap, null, 2),
  );
}

/**
 * Process individual SCSS file
 * @param filePath Path to the SCSS file
 * @returns Processed CSS content with file comment
 */
async function processScssFile(filePath: string): Promise<string> {
  try {
    const { css, isModule } = await compileScss(filePath);
    const processedCss = await processWithPostcss(css, filePath, isModule);

    return `/* ${filePath} */\n${processedCss}\n\n`;
  } catch (error) {
    (hexo?.log?.error || console.error)(`Error processing ${filePath}: `, error);

    return "";
  }
}

/**
 * Combine multiple CSS files into a single string
 * @param scssFiles Array of SCSS file paths
 * @returns Combined CSS content
 */
async function combineScssFiles(scssFiles: Array<string>): Promise<string> {
  const cssResults = await Promise.all(scssFiles.map((file) => processScssFile(file)));

  return cssResults.join("");
}

/**
 * Write CSS content to output file
 * @param cssContent CSS content to write
 */
function writeCssFile(cssContent: string): void {
  const outputPath = path.join(config.paths.outputCss, "style.css");
  fs.writeFileSync(outputPath, cssContent);
}

/**
 * Main function to render all SCSS files in the project
 * Compiles SCSS, processes with PostCSS, and generates a combined CSS file
 */
async function renderScss(): Promise<void> {
  const log = hexo.log || console;

  try {
    // Ensure output directory exists
    mkdirpSync(config.paths.outputCss);

    // Find all SCSS files using utility function
    const scssFiles = getAllScssFiles();

    if (scssFiles.length === 0) {
      log.error("No SCSS files found to process.");
      return;
    }

    // Process and combine all files
    const combinedCss = await combineScssFiles(scssFiles);

    // Write the combined CSS to the output file
    writeCssFile(combinedCss);

    // Save the CSS modules mapping
    await saveCssModulesMap();

    log.info("SCSS rendering completed: CSS and module maps have been generated.");
  } catch (error) {
    log.error("SCSS rendering error:", error);
  }
}

/**
 * Optimize CSS content with cssnano
 * @param css CSS content to optimize
 * @param filePath Original file path
 * @returns Optimized CSS content
 */
async function optimizeCss(css: string, filePath: string): Promise<string> {
  try {
    const result = await postcss([cssnano({ preset: config.postcss.preset })]).process(
      css,
      {
        from: filePath,
      },
    );

    return result.css;
  } catch (error) {
    (hexo?.log?.error || console.error)(`Error optimizing CSS for ${filePath}:`, error);

    return css; // Return original CSS if optimization fails
  }
}

// Register CSS renderer with Hexo
hexo.extend.renderer.register(
  "css",
  "css",
  async function renderCSS(data: StoreFunctionData) {
    const log = hexo?.log || console;

    try {
      const css = data.text || "";
      const filePath = data.path || "unknown";

      if (!css.trim()) {
        log.info(`Empty CSS content for ${filePath}`);

        return "";
      }

      const optimizedCss = await optimizeCss(css, filePath);

      return optimizedCss;
    } catch (error) {
      log.error("CSS rendering error:", error);

      return data.text || ""; // Return original content on error
    }
  },
);

/**
 * Initialize file watcher for SCSS files
 */
function initializeFileWatcher(): void {
  const log = hexo?.log || console;
  const filesToWatch = getAllScssFiles();

  if (filesToWatch.length === 0) {
    log.info("No SCSS files found to watch.");
    return;
  }

  const watcher = chokidar.watch(filesToWatch, {
    persistent: false,
  });

  watcher.on("change", (filePath) => {
    const relativePath = filePath.replace(config.paths.projectRoot, "");
    log.info(`Re-rendering SCSS... "${relativePath}" has been changed.`);
    renderScss();
  });

  watcher.on("error", (error) => {
    log.error("File watcher error:", error);
  });
}

// Initialize when Hexo is ready
hexo.on("ready", async () => {
  initializeFileWatcher();
  renderScss();
});
