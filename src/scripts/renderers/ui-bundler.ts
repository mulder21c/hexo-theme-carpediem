import fs from "fs";
import path from "path";
import { glob } from "glob";
import * as esbuild from "esbuild";
import type Hexo from "hexo";

/**
 * UI Bundler Renderer
 *
 * Finds all ui.ts files under src/components,
 * bundles them and creates source/js/ui.js file.
 */

// Configuration and paths
const CONFIG = {
  // Source file pattern
  sourcePattern: "src/components/**/ui.ts",
  // Output file path
  outputFile: "source/js/ui.js",
  // In development mode, generate sourcemap and skip minification
  isDev: process.env.NODE_ENV === "development",
};

// Global variable for tracking bundling status
let isBundling = false;

class UIBundler {
  private hexo: Hexo;
  private sourceRoot: string;
  private outputPath: string;

  constructor(hexo: Hexo) {
    this.hexo = hexo;
    this.sourceRoot = hexo.theme_dir;
    this.outputPath = path.join(this.sourceRoot, CONFIG.outputFile);
  }

  /**
   * Find all UI script files
   */
  findUIScripts(): string[] {
    return glob.sync(path.join(this.sourceRoot, CONFIG.sourcePattern));
  }

  /**
   * Convert file contents into a single import string
   */
  generateImports(files: string[]): string {
    return files
      .map((file) => {
        // Convert to relative path
        const relativePath = path.relative(this.sourceRoot, file);
        // Remove extension
        const pathWithoutExt = relativePath.replace(/\.ts$/, "");
        // Create import statement
        return `import './${pathWithoutExt}';`;
      })
      .join("\n");
  }

  /**
   * Generate bundle file (synchronous version)
   */
  generateBundle(): void {
    // Prevent duplicate execution if already bundling
    if (isBundling) {
      this.hexo.log.info("Bundling is already in progress. Please wait...");
      return;
    }

    try {
      isBundling = true;
      const files = this.findUIScripts();

      if (files.length === 0) {
        this.hexo.log.info("No UI script files found.");
        return;
      }

      this.hexo.log.info(`Found ${files.length} UI script files.`);

      // Check and create output directory
      const outputDir = path.dirname(this.outputPath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // Create temporary entry file (with unique name)
      const timestamp = Date.now();
      const entryFile = path.join(this.sourceRoot, `.temp-ui-entry-${timestamp}.ts`);
      const imports = this.generateImports(files);

      // Simply import all UI modules
      // Each module handles its own initialization
      fs.writeFileSync(entryFile, imports);

      // Synchronous bundling with esbuild
      const result = esbuild.buildSync({
        entryPoints: [entryFile],
        bundle: true,
        minify: !CONFIG.isDev,
        sourcemap: CONFIG.isDev,
        target: ["es2018"],
        format: "iife",
        outfile: this.outputPath,
        write: true,
      });

      // Delete temporary file
      fs.unlinkSync(entryFile);

      if (result.errors.length > 0) {
        this.hexo.log.error("Error occurred during UI script bundling:", result.errors);
        return;
      }

      this.hexo.log.info(`UI script bundling completed: ${CONFIG.outputFile}`);
    } catch (error: unknown) {
      this.hexo.log.error("Error occurred during UI script bundling:", error);
    } finally {
      isBundling = false;
    }
  }
}

function initializeFileWatcher(): void {
  // File change detection in development mode
  if (CONFIG.isDev) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const chokidar = require("chokidar");

    // Watch only source files, excluding output file
    const outputFilePath = path.join(hexo.theme_dir, CONFIG.outputFile);

    const watcher = chokidar.watch(path.join(hexo.theme_dir, CONFIG.sourcePattern), {
      persistent: true,
      ignoreInitial: true,
      ignored: [outputFilePath, "**/.temp-ui-entry-*.ts"],
    });

    // Handle change events (synchronous)
    watcher.on("change", (filePath: string) => {
      const relativePath = path.relative(hexo.theme_dir, filePath);
      hexo.log.info(`UI script file changed: "${relativePath}". Re-bundling...`);

      // Run synchronous bundling
      const bundler = new UIBundler(hexo);
      bundler.generateBundle();
    });

    // Clean up watcher on Hexo exit
    hexo.on("exit", () => {
      watcher.close();
    });
  }
}

// Run bundling on build start (synchronous)
hexo.on("ready", () => {
  const bundler = new UIBundler(hexo);
  bundler.generateBundle();

  // Initialize file watcher
  initializeFileWatcher();
});
