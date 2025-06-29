"use strict";
/* eslint-disable import/no-extraneous-dependencies, import/no-import-module-exports */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * TSX Renderer for Hexo
 *
 * This script enables rendering React TSX components as static HTML in Hexo.
 * It sets up the TypeScript environment, resolves path aliases, provides
 * a renderer that converts React components to HTML markup, and includes
 * file watching for development.
 */
const server_1 = require("react-dom/server");
const react_1 = __importDefault(require("react"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const chokidar_1 = __importDefault(require("chokidar"));
const glob_1 = require("glob");
const ts_node_1 = require("ts-node");
const tsconfig_paths_1 = require("tsconfig-paths");
class TSXRendererError extends Error {
    constructor(message, filePath, originalError) {
        super(message);
        this.filePath = filePath;
        this.originalError = originalError;
        this.name = 'TSXRendererError';
    }
}
// Configuration
function createConfig() {
    const projectRoot = hexo.theme_dir || path_1.default.resolve(__dirname, "../../");
    return {
        paths: {
            projectRoot,
            layout: path_1.default.join(projectRoot, "layout"),
            src: path_1.default.join(projectRoot, "src"),
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
let matchPath = null;
let isTypeScriptRegistered = false;
let originalResolveFilename = null;
// Utility Functions
/**
 * Get all TSX file patterns to watch
 */
function getTSXFilePatterns() {
    return [
        config.filePatterns.layoutTsx,
        config.filePatterns.componentTsx,
        config.filePatterns.srcTsx,
    ];
}
/**
 * Find all TSX files in the project
 */
function findTSXFiles(searchPath) {
    return glob_1.glob.sync(`${config.paths.projectRoot}${searchPath}`);
}
/**
 * Get all TSX files from configured patterns
 */
function getAllTSXFiles() {
    return getTSXFilePatterns().reduce((files, pattern) => {
        const foundFiles = findTSXFiles(pattern) || [];
        return [...files, ...foundFiles];
    }, []);
}
/**
 * Setup path aliases for module resolution
 */
function setupPathAliases() {
    if (matchPath)
        return; // Already setup
    try {
        const tsConfigPath = path_1.default.join(config.paths.projectRoot, "tsconfig.json");
        const tsConfig = JSON.parse(fs_1.default.readFileSync(tsConfigPath, "utf8"));
        const { baseUrl = ".", paths = {} } = tsConfig.compilerOptions;
        matchPath = (0, tsconfig_paths_1.createMatchPath)(path_1.default.join(config.paths.projectRoot, baseUrl), paths);
        overrideModuleResolution();
    }
    catch (error) {
        const log = hexo?.log || console;
        log.warn("Failed to setup path aliases:", error);
    }
}
/**
 * Override module resolution to support path aliases
 */
function overrideModuleResolution() {
    if (!matchPath || originalResolveFilename)
        return;
    const Module = require('module');
    originalResolveFilename = Module._resolveFilename;
    Module._resolveFilename = function (request, parent, isMain, options) {
        // Only resolve path aliases, not all module requests
        if (typeof request === 'string' && request.startsWith('@/')) {
            const resolvedPath = matchPath(request);
            if (resolvedPath) {
                return originalResolveFilename.call(this, resolvedPath, parent, isMain, options);
            }
        }
        return originalResolveFilename.call(this, request, parent, isMain, options);
    };
}
/**
 * Register TypeScript compiler with ts-node
 */
function registerTypeScript() {
    if (isTypeScriptRegistered)
        return;
    try {
        const tsConfigPath = path_1.default.join(config.paths.projectRoot, "tsconfig.json");
        const tsConfig = JSON.parse(fs_1.default.readFileSync(tsConfigPath, "utf8"));
        (0, ts_node_1.register)({
            transpileOnly: config.typescript.transpileOnly,
            compilerOptions: {
                ...tsConfig.compilerOptions,
                ...config.typescript.compilerOptions,
            },
            require: ["tsconfig-paths/register"],
        });
        isTypeScriptRegistered = true;
    }
    catch (error) {
        throw new Error(`Failed to register TypeScript: ${error instanceof Error ? error.message : String(error)}`);
    }
}
/**
 * Clear require cache for a file and its dependencies
 */
function clearRequireCache(filePath) {
    // Clear the specific file from cache
    delete require.cache[require.resolve(filePath)];
    // Also clear any files that might import this component
    Object.keys(require.cache).forEach(cachedPath => {
        if (cachedPath.includes(path_1.default.dirname(filePath))) {
            delete require.cache[cachedPath];
        }
    });
}
/**
 * Load React component from file path
 */
function loadComponent(filePath) {
    try {
        /* eslint-disable import/no-dynamic-require, global-require, @typescript-eslint/no-var-requires */
        const moduleExports = require(filePath);
        /* eslint-enable import/no-dynamic-require, global-require, @typescript-eslint/no-var-requires */
        const Component = moduleExports.default || moduleExports;
        if (!Component) {
            throw new TSXRendererError("Cannot find default export or named export in TSX file", filePath);
        }
        if (typeof Component !== 'function') {
            throw new TSXRendererError("Exported component is not a valid React component (must be a function or class)", filePath);
        }
        return Component;
    }
    catch (error) {
        if (error instanceof TSXRendererError) {
            throw error;
        }
        throw new TSXRendererError(`Failed to load component: ${error instanceof Error ? error.message : String(error)}`, filePath, error instanceof Error ? error : undefined);
    }
}
/**
 * Create React element from component and options
 */
function createReactElement(Component, options) {
    try {
        // Pass Hexo instance and other options as props to the component
        const props = { ...options, hexo };
        return react_1.default.createElement(Component, props);
    }
    catch (error) {
        throw new TSXRendererError(`Failed to create React element: ${error instanceof Error ? error.message : String(error)}`, 'unknown', error instanceof Error ? error : undefined);
    }
}
/**
 * Main TSX rendering function
 */
function renderTSX(data, options) {
    const log = hexo?.log || console;
    if (!data.path) {
        throw new TSXRendererError("No file path provided", "unknown");
    }
    const fullPath = path_1.default.resolve(data.path);
    try {
        // Setup environment if not already done
        setupPathAliases();
        registerTypeScript();
        // Clear the require cache to ensure changes are reflected without restart
        clearRequireCache(fullPath);
        const Component = loadComponent(fullPath);
        const element = createReactElement(Component, options);
        return (0, server_1.renderToStaticMarkup)(element);
    }
    catch (error) {
        const tsxError = error instanceof TSXRendererError
            ? error
            : new TSXRendererError(`Failed to render TSX component: ${error instanceof Error ? error.message : String(error)}`, fullPath, error instanceof Error ? error : undefined);
        log.error(`TSX rendering error (${fullPath}):`, tsxError);
        throw tsxError;
    }
}
/**
 * Initialize file watcher for TSX files
 */
function initializeFileWatcher() {
    const log = hexo?.log || console;
    const filesToWatch = getAllTSXFiles();
    if (filesToWatch.length === 0) {
        log.info('No TSX files found to watch.');
        return;
    }
    const watcher = chokidar_1.default.watch(filesToWatch, {
        persistent: false
    });
    watcher.on("change", (filePath) => {
        const relativePath = filePath.replace(config.paths.projectRoot, "");
        log.info(`TSX file changed: "${relativePath}" - clearing cache...`);
        try {
            clearRequireCache(filePath);
        }
        catch (error) {
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
        }
        catch (error) {
            // File doesn't exist anymore, so cache clearing might fail - that's ok
        }
    });
    watcher.on("error", (error) => {
        log.error('TSX file watcher error:', error);
    });
    log.info(`TSX file watcher initialized. Watching ${filesToWatch.length} files.`);
}
/**
 * Cleanup function to restore original module resolution
 */
function cleanup() {
    if (originalResolveFilename) {
        const Module = require('module');
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
        log.info('TSX renderer initialized successfully.');
    }
    catch (error) {
        log.error('Failed to initialize TSX renderer:', error);
    }
});
// Cleanup on process exit
process.on('exit', cleanup);
process.on('SIGINT', () => {
    cleanup();
    process.exit(0);
});
process.on('SIGTERM', () => {
    cleanup();
    process.exit(0);
});
