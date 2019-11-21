const { allowModules } = require('@wx-fc/eslint-config/_util');

module.exports = {
  extends: '@wx-fc/eslint-config/recommended',
  settings: {
    node: {
      allowModules: allowModules.concat('tslint', 'typescript'),
    },
    polyfills: [
      'console',
      'Array.isArray',
      'JSON',
      'Object.assign',
      'Object.entries',
      'Object.keys',
      'Promise',
    ],
  },
};
