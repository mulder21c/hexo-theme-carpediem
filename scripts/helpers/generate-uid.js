/**
 * @desc Generate unique id
 * @return {string}
 */
function generateUidHelper() {
  const chars = `abcdefghijklmnopqrstuvwxyz`;
  const prefix = chars[Math.floor(Math.random() * 46656) % chars.length];
  const phase1 = performance.now().toString(36).slice(-5);
  const phase2 = (Math.random() * 46656).toString(32).slice(-5);

  return `${prefix}${phase1}${phase2}`.replace(/\./, "-");
}

module.exports = generateUidHelper;
