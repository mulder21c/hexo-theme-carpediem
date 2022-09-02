const fs = require("fs");
const path = require("path");

/**
 * if file exists, remove file
 * @param {string} file
 */
const cleanDirectory = (directory) => {
  const files = fs.readdirSync(directory);
  (files || []).forEach((file) => {
    fs.unlinkSync(path.join(directory, file), (err) => {
      if (err) throw err;
    });
  });
};

module.exports = cleanDirectory;
