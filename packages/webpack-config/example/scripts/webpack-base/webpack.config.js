const path = require('path');

const configMap = require('../../..')({
  rootPath: path.resolve(__dirname, '../../'),
  themeVars: { 'primary-color': '#1DA57A', 'brand-primary': '#1DA57A' },
  extendedBaseConfig: {
    entry: {
      index: path.resolve(__dirname, '../../src/index'),
    },
    resolve: {
      alias: {
        dayjs: 'dayjs/esm',
        // moment$: 'dayjs/esm',
        systemjs$: 'systemjs/dist/system.js',
      },
    },
  },
});

module.exports = configMap;
