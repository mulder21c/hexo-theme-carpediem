const fs = require("fs");

/**
 * if file exists, remove file
 * @param {string} file
 */
const removeFile = (file) => {
  fs.existsSync(file) && fs.unlinkSync(file);
};

module.exports = removeFile;
