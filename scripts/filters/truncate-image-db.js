const { truncateImageInfo } = require("../utils/image-processor");

/**
 * @desc process for clean image-info when after initialized hexo
 */
function truncateImageDBFilter() {
  const isCleanStage = this.env.cmd === `clean`;
  truncateImageInfo(isCleanStage);
}

module.exports = truncateImageDBFilter;
