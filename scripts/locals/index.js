const vanillaPropTypes = require("vanilla-prop-types");
const { PropTypes } = vanillaPropTypes;

// provide vanillaPropTypes into `site`
hexo.locals.set("propTypes", vanillaPropTypes);
hexo.locals.set("propTypesPreset", {
  headingLevel: PropTypes.number.custom(({ prop }) => {
    if (Number.isInteger(prop) && prop > 0 && prop < 7) {
      return true;
    } else {
      throw new Error("level must be an integer between 1 and 6.");
    }
  }),
  heading: PropTypes.shape({
    level: PropTypes.number.custom(({ prop }) => {
      if (Number.isInteger(prop) && prop > 0 && prop < 7) {
        return true;
      } else {
        throw new Error("level must be an integer between 1 and 6.");
      }
    }).isRequired,
    htmlString: PropTypes.string,
    visible: PropTypes.bool,
  }),
});
