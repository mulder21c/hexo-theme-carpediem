const { PropTypes } = require("vanilla-prop-types");

// define heading level prop type
const presetHeadingLevel = PropTypes.number.custom(({ prop }) => {
  if (Number.isInteger(prop) && prop > 0 && prop < 7) {
    return true;
  } else {
    throw new Error("level must be an integer between 1 and 6.");
  }
});

// define heading prop type
const presetHeading = PropTypes.shape({
  level: PropTypes.number.custom(({ prop }) => {
    if (Number.isInteger(prop) && prop > 0 && prop < 7) {
      return true;
    } else {
      throw new Error("level must be an integer between 1 and 6.");
    }
  }).isRequired,
  htmlString: PropTypes.string,
  visible: PropTypes.bool,
});

module.exports = {
  headingLevel: presetHeadingLevel,
  heading: presetHeading,
};
