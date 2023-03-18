const fs = require("fs");
const path = require("path");

/**
 * clean up directory
 * @param {string} directory the path for cleaning up
 */
const cleanUpDirectory = (directory) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }
  const files = fs.readdirSync(directory);
  (files || []).forEach((file) => {
    fs.unlinkSync(path.join(directory, file));
  });
};

/**
 * clean up files
 * @param {array} files the path for cleaning up
 */
const cleanUpFiles = (files) => {
  files.forEach((file) => {
    if (!fs.existsSync(file)) return;
    fs.unlinkSync(file);
  });
};

module.exports = {
  cleanUpDirectory,
  cleanUpFiles,
};
