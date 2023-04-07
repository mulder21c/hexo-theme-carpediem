/**
 * @param {string} str the string to evaluate
 * @returns {any}
 */
function parseCustomTagParam(str) {
  try {
    return Function(`'use strict'; return (${str})`)();
  } catch (err) {
    return str;
  }
}

module.exports = parseCustomTagParam;
