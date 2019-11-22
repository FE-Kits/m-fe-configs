const merge = require('webpack-merge');

module.exports = ({
  rootPath = process.cwd(),
  cacheId = 'cacheId',
  primaryColor = '#5d4bff',
  title = 'Awesome App',
  extendedBaseConfig = {},
} = {}) => {
  console.log(`\nCurrent build path: ${rootPath}\n`);

  return {
    baseConfig: merge(
      require('./webpack.config.base')({
        rootPath,
        cacheId,
        primaryColor,
        title,
      }),
      extendedBaseConfig,
    ),
    devConfig: merge(
      require('./webpack.config.dev')({
        rootPath,
        cacheId,
        primaryColor,
        title,
      }),
      extendedBaseConfig,
    ),
    prodConfig: merge(
      require('./webpack.config.prod')({
        rootPath,
        cacheId,
        primaryColor,
        title,
      }),
      extendedBaseConfig,
    ),
    umdConfig: merge(
      require('./webpack.config.umd')({
        rootPath,
        cacheId,
        primaryColor,
        title,
      }),
      extendedBaseConfig,
    ),
  };
};
