const { PropTypes } = require("vanilla-prop-types");
const preset = {
  heading: PropTypes.shape({
    level: PropTypes.number.custom(({ prop }) => {
      if (Number.isInteger(prop) && prop > 0 && prop < 7) {
        return true;
      } else {
        throw new Error("level must be an integer between 1 and 6.");
      }
    }).isRequired,
    visible: PropTypes.bool,
  }),
  headingLevel: PropTypes.number.custom(({ prop }) => {
    if (Number.isInteger(prop) && prop > 0 && prop < 7) {
      return true;
    } else {
      throw new Error("level must be an integer between 1 and 6.");
    }
  }),
};

module.exports = preset;