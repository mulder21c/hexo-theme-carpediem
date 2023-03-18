/**
 * @public
 * @function
 * @alias generate_uid
 * @desc Generate unique id consisting of lowercase letters and numbers,
 * like `i49ygg04c64`
 * @return {string}
 * @example
 * a(id= generate_uid())
 */
function generateUidHelper() {
  const chars = `abcdefghijklmnopqrstuvwxyz`;
  const prefix = chars[Math.floor(Math.random() * 46656) % chars.length];
  const phase1 = performance.now().toString(36).slice(-5);
  const phase2 = (Math.random() * 46656).toString(32).slice(-5);

  return `${prefix}${phase1}${phase2}`.replace(/\./, "-");
}

module.exports = generateUidHelper;
