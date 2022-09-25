/**
 * @desc Generate unique id
 * @return {string}
 */
function generateUidHelper() {
  const chars = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`;
  const prefix = chars[Math.floor(Math.random() * chars.length)];
  const phase1 = performance.now().toString(36);
  const phase2 = Math.random().toString(32).substring(2);

  return `${prefix}${phase1}${phase2}`.replace(/\./, "-");
}

module.exports = generateUidHelper;
