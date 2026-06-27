const fs = require("fs");
const http = require("http");
const path = require("path");
const log = require("hexo-log").default({ debug: false, silent: false });

const DEFAULT_RELOAD_HOST = "127.0.0.1";
const DEFAULT_RELOAD_PORT = 35729;
const RELOAD_ENDPOINT = "/events";
const RECONNECT_DELAY_MS = 1000;
const WATCH_DIRECTORIES = ["components", "layout"];
const WATCH_EXTENSIONS = new Set([".scss", ".ts", ".tsx"]);

const themeRoot = path.resolve(__dirname, "../..");

let reloadServer;
let hasPendingFileChanges = false;
let watcherCleanup = () => {};
const clients = new Set();

function isServerCommand() {
  if (typeof hexo === "undefined") {
    return false;
  }

  if (process.argv.includes("--static") || process.argv.includes("-s")) {
    return false;
  }

  const envCommand = hexo.env && hexo.env.cmd;
  if (envCommand === "server" || envCommand === "s") {
    return true;
  }

  return process.argv.some((arg) => arg === "server" || arg === "s");
}

function getReloadHost() {
  return process.env.CARPEDIEM_DEV_RELOAD_HOST || DEFAULT_RELOAD_HOST;
}

function getReloadPort() {
  const port = Number(process.env.CARPEDIEM_DEV_RELOAD_PORT);
  return Number.isInteger(port) && port > 0 ? port : DEFAULT_RELOAD_PORT;
}

function getReloadUrl() {
  return `http://${getReloadHost()}:${getReloadPort()}${RELOAD_ENDPOINT}`;
}

function sendSseMessage(response, eventName, data) {
  response.write(`event: ${eventName}\n`);
  response.write(`data: ${JSON.stringify(data)}\n\n`);
}

function broadcastReload(reason = "generateAfter") {
  const payload = {
    reason,
    timestamp: Date.now(),
  };

  for (const response of clients) {
    sendSseMessage(response, "reload", payload);
  }
}

function createReloadServer() {
  if (reloadServer) {
    return;
  }

  reloadServer = http.createServer((request, response) => {
    if (
      !request.url ||
      new URL(request.url, getReloadUrl()).pathname !== RELOAD_ENDPOINT
    ) {
      response.writeHead(404);
      response.end();
      return;
    }

    response.writeHead(200, {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "Content-Type": "text/event-stream; charset=utf-8",
      "X-Accel-Buffering": "no",
    });
    response.write(": connected\n\n");

    clients.add(response);
    request.on("close", () => {
      clients.delete(response);
    });
  });

  reloadServer.on("error", (error) => {
    log.warn(`Dev reload server failed: ${error.message}`);
  });

  reloadServer.listen(getReloadPort(), getReloadHost(), () => {
    log.info(`Dev reload server listening on ${getReloadUrl()}`);
  });
}

function createReloadClientScript() {
  return `<script>
(function () {
  if (window.__carpediemDevReload) return;
  window.__carpediemDevReload = true;

  function connect() {
    var source = new EventSource(${JSON.stringify(getReloadUrl())});
    source.addEventListener("reload", function () {
      window.location.reload();
    });
    source.onerror = function () {
      source.close();
      window.setTimeout(connect, ${RECONNECT_DELAY_MS});
    };
  }

  connect();
})();
</script>`;
}

function injectReloadClient(html) {
  if (typeof html !== "string" || html.includes("__carpediemDevReload")) {
    return html;
  }

  const script = createReloadClientScript();
  if (html.includes("</body>")) {
    return html.replace("</body>", `${script}</body>`);
  }

  return `${html}${script}`;
}

function closeResources() {
  watcherCleanup();
  clients.forEach((response) => response.end());
  clients.clear();

  if (reloadServer) {
    reloadServer.close();
    reloadServer = undefined;
  }
}

function shouldWatchFile(filePath) {
  const normalizedPath = filePath.replace(/\\/g, "/");
  const extension = path.extname(normalizedPath);

  return (
    WATCH_EXTENSIONS.has(extension) &&
    !normalizedPath.includes("/__tests__/") &&
    !normalizedPath.endsWith(".test.ts") &&
    !normalizedPath.endsWith(".test.tsx") &&
    !normalizedPath.endsWith(".stories.tsx")
  );
}

function collectDirectories(directory, directories = []) {
  if (!fs.existsSync(directory)) {
    return directories;
  }

  directories.push(directory);

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      collectDirectories(path.join(directory, entry.name), directories);
    }
  }

  return directories;
}

function collectWatchTargets() {
  return WATCH_DIRECTORIES.flatMap((directory) =>
    collectDirectories(path.join(themeRoot, directory)),
  );
}

function markPendingFileChanges(filePath) {
  hasPendingFileChanges = true;
  log.info(`Theme file changed: ${path.relative(themeRoot, filePath)}`);
}

function broadcastPendingReload() {
  if (!hasPendingFileChanges) {
    return;
  }

  hasPendingFileChanges = false;
  broadcastReload("file-change");
}

function createDirectoryWatcher(directory) {
  try {
    const watcher = fs.watch(directory, (eventType, filename) => {
      if (!filename) {
        return;
      }

      const changedFilePath = path.join(directory, filename.toString());
      if (shouldWatchFile(changedFilePath)) {
        markPendingFileChanges(changedFilePath);
      }
    });

    watcher.on("error", (error) => {
      log.warn(`Dev reload watcher failed for ${directory}: ${error.message}`);
    });

    return () => watcher.close();
  } catch (error) {
    log.warn(`Failed to watch ${directory}: ${error.message}`);
    return () => {};
  }
}

function startFileWatchers() {
  const cleanupCallbacks = collectWatchTargets().map(createDirectoryWatcher);
  watcherCleanup = () => {
    cleanupCallbacks.forEach((cleanup) => cleanup());
  };
}

if (isServerCommand()) {
  createReloadServer();
  startFileWatchers();

  hexo.extend.filter.register("after_render:html", injectReloadClient);
  hexo.on("generateAfter", broadcastPendingReload);
  process.once("exit", closeResources);
}

module.exports = {
  broadcastReload,
  broadcastPendingReload,
  injectReloadClient,
  markPendingFileChanges,
  shouldWatchFile,
  startFileWatchers,
};
