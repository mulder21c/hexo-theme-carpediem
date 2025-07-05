/* eslint-disable @typescript-eslint/no-var-requires, no-underscore-dangle, global-require, @typescript-eslint/no-explicit-any, @typescript-eslint/no-require-imports, import/no-extraneous-dependencies */

/**
 * TSX Renderer for Hexo
 *
 * This script enables rendering React TSX components as static HTML in Hexo.
 * It sets up the TypeScript environment, resolves path aliases, provides
 * a renderer that converts React components to HTML markup, and includes
 * file watching for development.
 */

import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import fs from "fs";
import path from "path";
import chokidar from "chokidar";
import { glob } from "glob";
import { register } from "ts-node";
import { createMatchPath, MatchPath } from "tsconfig-paths";
import type { StoreFunctionData } from "hexo/dist/extend/renderer";

// Type definitions
interface TSConfig {
  compilerOptions: {
    baseUrl?: string;
    paths?: Record<string, Array<string>>;
    [key: string]: unknown;
  };
}

interface TSXConfig {
  paths: {
    projectRoot: string;
    layout: string;
    src: string;
  };
  filePatterns: {
    layoutTsx: string;
    componentTsx: string;
    srcTsx: string;
  };
  typescript: {
    transpileOnly: boolean;
    compilerOptions: Record<string, unknown>;
  };
}

class TSXRendererError extends Error {
  constructor(
    message: string,
    public readonly filePath: string,
    public readonly originalError?: Error,
  ) {
    super(message);
    this.name = "TSXRendererError";
  }
}

// Configuration
function createConfig(): TSXConfig {
  const projectRoot = hexo.theme_dir || path.resolve(__dirname, "../../");

  return {
    paths: {
      projectRoot,
      layout: path.join(projectRoot, "layout"),
      src: path.join(projectRoot, "src"),
    },
    filePatterns: {
      layoutTsx: "/layout/**/*.tsx",
      componentTsx: "/src/components/**/*.tsx",
      srcTsx: "/src/**/*.tsx",
    },
    typescript: {
      transpileOnly: true,
      compilerOptions: {
        module: "CommonJS",
        jsx: "react",
        esModuleInterop: true,
      },
    },
  };
}

// Global state
const config = createConfig();
let matchPath: MatchPath | null = null;
let isTypeScriptRegistered = false;
let originalResolveFilename: any = null;

// Utility Functions
/**
 * Get all TSX file patterns to watch
 */
function getTSXFilePatterns(): Array<string> {
  return [
    config.filePatterns.layoutTsx,
    config.filePatterns.componentTsx,
    config.filePatterns.srcTsx,
  ];
}

/**
 * Find all TSX files in the project
 */
function findTSXFiles(searchPath: string): Array<string> {
  return glob.sync(`${config.paths.projectRoot}${searchPath}`);
}

/**
 * Get all TSX files from configured patterns
 */
function getAllTSXFiles(): Array<string> {
  return getTSXFilePatterns().reduce((files, pattern) => {
    const foundFiles = findTSXFiles(pattern) || [];
    return [...files, ...foundFiles];
  }, [] as Array<string>);
}

/**
 * Override module resolution to support path aliases
 */
function overrideModuleResolution(): void {
  if (!matchPath || originalResolveFilename) return;

  const Module = require("module");
  originalResolveFilename = Module._resolveFilename;

  Module._resolveFilename = function resolveFn(
    request: string,
    parent: any,
    isMain: boolean,
    options?: any,
  ) {
    // Only resolve path aliases, not all module requests
    if (typeof request === "string" && request.startsWith("@/")) {
      const resolvedPath = matchPath!(request);
      if (resolvedPath) {
        return originalResolveFilename.call(this, resolvedPath, parent, isMain, options);
      }
    }
    return originalResolveFilename.call(this, request, parent, isMain, options);
  };
}

/**
 * Setup path aliases for module resolution
 */
function setupPathAliases(): void {
  if (matchPath) return; // Already setup

  try {
    const tsConfigPath = path.join(config.paths.projectRoot, "tsconfig.json");
    const tsConfig: TSConfig = JSON.parse(fs.readFileSync(tsConfigPath, "utf8"));

    const { baseUrl = ".", paths = {} } = tsConfig.compilerOptions;
    matchPath = createMatchPath(path.join(config.paths.projectRoot, baseUrl), paths);

    overrideModuleResolution();
  } catch (error) {
    const log = hexo?.log || console;
    log.warn("Failed to setup path aliases:", error);
  }
}

/**
 * Register TypeScript compiler with ts-node
 */
function registerTypeScript(): void {
  if (isTypeScriptRegistered) return;

  try {
    const tsConfigPath = path.join(config.paths.projectRoot, "tsconfig.json");
    const tsConfig: TSConfig = JSON.parse(fs.readFileSync(tsConfigPath, "utf8"));

    register({
      transpileOnly: config.typescript.transpileOnly,
      compilerOptions: {
        ...tsConfig.compilerOptions,
        ...config.typescript.compilerOptions,
      },
      require: ["tsconfig-paths/register"],
    });

    isTypeScriptRegistered = true;
  } catch (error) {
    throw new Error(
      `Failed to register TypeScript: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

/**
 * Clear require cache for a file and its dependencies
 */
function clearRequireCache(filePath: string): void {
  // Clear the specific file from cache
  delete require.cache[require.resolve(filePath)];

  // Also clear any files that might import this component
  Object.keys(require.cache).forEach((cachedPath) => {
    if (cachedPath.includes(path.dirname(filePath))) {
      delete require.cache[cachedPath];
    }
  });
}

/**
 * Load React component from file path
 */
function loadComponent(filePath: string): React.ComponentType<any> {
  try {
    // eslint-disable-next-line import/no-dynamic-require
    const moduleExports = require(filePath);

    const Component = moduleExports.default || moduleExports;

    if (!Component) {
      throw new TSXRendererError(
        "Cannot find default export or named export in TSX file",
        filePath,
      );
    }

    if (typeof Component !== "function") {
      throw new TSXRendererError(
        "Exported component is not a valid React component (must be a function or class)",
        filePath,
      );
    }

    return Component;
  } catch (error) {
    if (error instanceof TSXRendererError) {
      throw error;
    }
    throw new TSXRendererError(
      `Failed to load component: ${error instanceof Error ? error.message : String(error)}`,
      filePath,
      error instanceof Error ? error : undefined,
    );
  }
}

/**
 * Create React element from component and options
 */
function createReactElement(
  Component: React.ComponentType<any>,
  options: object,
): React.ReactElement {
  try {
    // Pass Hexo instance and other options as props to the component
    const props = { ...options, hexo };
    return React.createElement(Component, props);
  } catch (error) {
    throw new TSXRendererError(
      `Failed to create React element: ${error instanceof Error ? error.message : String(error)}`,
      "unknown",
      error instanceof Error ? error : undefined,
    );
  }
}

/**
 * Main TSX rendering function
 */
function renderTSX(data: StoreFunctionData, options: object): string {
  const log = hexo?.log || console;

  if (!data.path) {
    throw new TSXRendererError("No file path provided", "unknown");
  }

  const fullPath = path.resolve(data.path);

  try {
    // Setup environment if not already done
    setupPathAliases();
    registerTypeScript();

    // Clear the require cache to ensure changes are reflected without restart
    clearRequireCache(fullPath);

    const Component = loadComponent(fullPath);
    const element = createReactElement(Component, options);

    return renderToStaticMarkup(element);
  } catch (error) {
    const tsxError =
      error instanceof TSXRendererError
        ? error
        : new TSXRendererError(
            `Failed to render TSX component: ${error instanceof Error ? error.message : String(error)}`,
            fullPath,
            error instanceof Error ? error : undefined,
          );

    log.error(`TSX rendering error (${fullPath}):`, tsxError);
    throw tsxError;
  }
}

/**
 * Initialize file watcher for TSX files
 */
function initializeFileWatcher(): void {
  const log = hexo?.log || console;
  const filesToWatch = getAllTSXFiles();

  if (filesToWatch.length === 0) {
    log.info("No TSX files found to watch.");
    return;
  }

  const watcher = chokidar.watch(filesToWatch, {
    persistent: false,
  });

  watcher.on("change", (filePath) => {
    const relativePath = filePath.replace(config.paths.projectRoot, "");
    log.info(`TSX file changed: "${relativePath}" - clearing cache...`);

    try {
      clearRequireCache(filePath);
    } catch (error) {
      log.warn(`Failed to clear cache for ${relativePath}:`, error);
    }
  });

  watcher.on("add", (filePath) => {
    const relativePath = filePath.replace(config.paths.projectRoot, "");
    log.info(`New TSX file detected: "${relativePath}"`);
  });

  watcher.on("unlink", (filePath) => {
    const relativePath = filePath.replace(config.paths.projectRoot, "");
    log.info(`TSX file removed: "${relativePath}"`);

    try {
      clearRequireCache(filePath);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // File doesn't exist anymore, so cache clearing might fail - that's ok
    }
  });

  watcher.on("error", (error) => {
    log.error("TSX file watcher error:", error);
  });

  log.info(`TSX file watcher initialized. Watching ${filesToWatch.length} files.`);
}

/**
 * Cleanup function to restore original module resolution
 */
function cleanup(): void {
  if (originalResolveFilename) {
    const Module = require("module");
    Module._resolveFilename = originalResolveFilename;
    originalResolveFilename = null;
  }
}

// Register TSX renderer with Hexo
hexo.extend.renderer.register("tsx", "html", renderTSX, true);

// Initialize when Hexo is ready
hexo.on("ready", () => {
  const log = hexo?.log || console;

  try {
    initializeFileWatcher();
    log.info("TSX renderer initialized successfully.");
  } catch (error) {
    log.error("Failed to initialize TSX renderer:", error);
  }
});

// Cleanup on process exit
process.on("exit", cleanup);
process.on("SIGINT", () => {
  cleanup();
  process.exit(0);
});
process.on("SIGTERM", () => {
  cleanup();
  process.exit(0);
});
