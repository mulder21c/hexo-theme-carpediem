const path = require("path");
const truncateFile = require("./libs/truncate-file");
const { hexoSourcePath } = require("../constants");
const heroDBPath = path.resolve(hexoSourcePath, "./_data/hero.db.json");

/**
 * truncate database file that has dimensions for hero images
 */
function heroInfoRemover(ctx) {
  const hexo = this;
  if (hexo?.env?.cmd === `clean`) {
    truncateFile(heroDBPath, `[]`);
    hexo.log.info(`Cleaned up hero image database.`);
  }
}

module.exports = heroInfoRemover;
