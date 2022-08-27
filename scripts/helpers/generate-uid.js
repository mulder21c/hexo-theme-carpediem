const uid = require("easy-uid");

/**
 * @desc Generate unique id
 * @return {string}
 */
function generateUidHelper() {
  return uid();
}

module.exports = generateUidHelper;
