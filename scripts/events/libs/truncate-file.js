const fs = require("fs");
const path = require("path");

/**
 * if file exists, remove file
 * @param {string} filePath
 * @param {string} [initContent] Initial content to be set on truncated files
 */
const truncateFile = (filePath, initContent) => {
  if (!fs.existsSync(filePath)) {
    const dir = path.parse(filePath).dir;
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, initContent, { encoding: `utf8`, flag: `w` });
};

module.exports = truncateFile;
