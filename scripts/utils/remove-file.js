const fs = require("fs");
const path = require("path");

/**
 * if file exists, remove file
 * @param {string} file
 */
const cleanDirectory = (directory) => {
  return new Promise((resolve, reject) => {
    try {
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
      }
      const files = fs.readdirSync(directory);
      (files || []).forEach((file) => {
        fs.unlinkSync(path.join(directory, file), (err) => {
          if (err) throw err;
        });
      });
      setTimeout(() => {
        resolve();
      }, 1000);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = cleanDirectory;
