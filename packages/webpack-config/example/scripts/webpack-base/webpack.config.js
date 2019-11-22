const path = require('path');

module.exports = require('../../..')({
  rootPath: path.resolve(__dirname, '../../'),
  extendedBaseConfig: {
    entry: {
      index: path.resolve(__dirname, '../../src/index'),
    },
    resolve: {
      alias: {
        dayjs: 'dayjs/esm',
        moment$: 'dayjs/esm',
        systemjs$: 'systemjs/dist/system.js',
      },
    },
  },
});
