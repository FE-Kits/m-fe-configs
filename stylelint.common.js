const config = require('@wx-fc/stylelint-config');

module.exports = {
  ...config,
  rules: {
    ...config.rules,
    'plugin/no-unsupported-browser-features': null,
  },
};
