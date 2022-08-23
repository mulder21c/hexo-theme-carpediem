const uid = require("easy-uid");

/**
 * @desc Generate unique id
 * @return {string}
 */
function generateUid() {
  return uid();
}

module.exports = generateUid;
