const { truncateImageInfo } = require("../utils/image-processor");
const isCleanStage = hexo.env.cmd === "clean";

/**
 * @desc process for clean image-info when after initialized hexo
 */
hexo.extend.filter.register(
  `after_init`,
  () => {
    truncateImageInfo(isCleanStage);
  },
  0
);
