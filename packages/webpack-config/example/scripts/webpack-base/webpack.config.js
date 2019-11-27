const path = require('path');

const configMap = require('../../..')({
  rootPath: path.resolve(__dirname, '../../'),
  extendedBaseConfig: {
    entry: {
      index: path.resolve(__dirname, '../../src/index'),
    },
    module: {
      rules: [
        {
          test: /.*ts-worker.*/,
          use: ['workerize-loader', 'ts-loader'],
        },
      ],
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

console.log(configMap.baseConfig.module.rules.length);

module.exports = configMap;
