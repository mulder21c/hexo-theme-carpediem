const format = require("date-fns/format");

/**
 * @desc Return the result of executing dateFormat from date-fns
 * @see https://date-fns.org/docs/format
 * @return {string}
 */
function dateFormatHelper(...arguments) {
  return format.call(null, ...arguments);
}

module.exports = dateFormatHelper;
