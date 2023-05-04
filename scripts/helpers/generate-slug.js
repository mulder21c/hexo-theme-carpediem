/**
 * @public
 * @function
 * @alias generate_slug
 * @desc Generate slug for given string
 * @param {string} str The string to extract slug
 * @return {string}
 * @example
 * a(id= generate_slug("hexo blog theme"))
 */
function generateSlugHelper(str) {
  if (!str) return ``;
  let slug = str.toLowerCase();
  slug = slug.replace(/[^\p{L}\p{N}]/gu, `-`);
  return slug;
}

module.exports = generateSlugHelper;
