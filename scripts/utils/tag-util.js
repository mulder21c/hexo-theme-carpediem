/**
 * @param {string} str the string to calculate mathematical expression
 * @returns {any}
 */
function calcMathExp(str) {
  try {
    return Function(`'use strict'; return (${str})`)();
  } catch (err) {
    return str;
  }
}

/**
 * regular expression to validate url
 */
const urlExp =
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\w]*))?)/;

/**
 * @param {string} str the string to check if it is in aspect ratio format
 * @returns {boolean}
 */
function isRatioFormat(str) {
  return /^([0-9]+(\.\d+)?\/[0-9]+(\.\d+)?)$/.test(str);
}

module.exports = {
  calcMathExp,
  urlExp,
  isRatioFormat,
};
