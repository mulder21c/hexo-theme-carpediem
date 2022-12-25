const fs = require("fs");
const jsYml = require("js-yaml");
const log = (() => {
  try {
    return hexo.log;
  } catch {
    return console;
  }
})();

/**
 * return content of yaml file
 * @param {stirng} path the path of file to read
 * @param {stirng} errorMsg the template for error message
 * @returns {object}
 */
function loadYml(path, errorMsg) {
  try {
    return jsYml.load(fs.readFileSync(path, `utf8`));
  } catch (err) {
    log.error(errorMsg || `Cant't load ${path}`);
  }
}

module.exports = loadYml;
