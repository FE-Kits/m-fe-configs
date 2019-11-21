const { isAngularAvailable, isVueAvailable } = require('@pkgr/utils');

module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: [
    'stylelint-no-unsupported-browser-features',
    'stylelint-high-performance-animation',
  ],
  rules: Object.assign(
    {
      'plugin/no-unsupported-browser-features': [
        true,
        {
          ignore: ['css3-cursors', 'css-resize', 'rem'],
          severity: 'warning',
        },
      ],
      'selector-pseudo-element-colon-notation': 'single',
    },
    (isAngularAvailable || isVueAvailable) && {
      'selector-pseudo-element-no-unknown': [
        true,
        {
          ignorePseudoElements: [
            isAngularAvailable && 'ng-deep',
            isVueAvailable && 'v-deep',
          ].filter(Boolean),
        },
      ],
    },
  ),
};
