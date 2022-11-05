const fs = require("fs");

/**
 * if file exists, remove file
 * @param {string} path
 * @param {string} [initContent] Initial content to be set on truncated files
 */
const truncateFile = (path, initContent) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
  fs.writeFileSync(path, initContent, { encoding: `utf8`, flag: `w` });
};

module.exports = truncateFile;
