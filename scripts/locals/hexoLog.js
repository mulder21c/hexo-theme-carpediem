"use strict";

const HAS_PROCESS = typeof process !== "undefined";

function getLogger() {
  if (HAS_PROCESS) {
    try {
      return require("hexo-log").default({ debug: false, silent: false });
    } catch (_) {
      return console;
    }
  }
  return console;
}

const logImpl = getLogger();

const hexoLog = {
  info: (...args) => logImpl.info(...args),
  warn: (...args) => logImpl.warn(...args),
  error: (...args) => logImpl.error(...args),
  debug: (...args) => logImpl.debug(...args),
};

if (typeof hexo !== "undefined") {
  hexo.locals.set("hexoLog", () => hexoLog);
}

module.exports = hexoLog;
