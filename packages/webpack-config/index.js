const merge = require('webpack-merge');

module.exports = ({
  rootPath = process.cwd(),
  // target 可以为 web, mobile, server, rn, taro 等
  target = 'web',
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
        target,
      }),
      extendedBaseConfig,
    ),
    devConfig: merge(
      require('./webpack.config.dev')({
        rootPath,
        cacheId,
        primaryColor,
        title,
        target,
      }),
      extendedBaseConfig,
    ),
    prodConfig: merge(
      require('./webpack.config.prod')({
        rootPath,
        cacheId,
        primaryColor,
        title,
        target,
      }),
      extendedBaseConfig,
    ),
    umdConfig: merge(
      require('./webpack.config.umd')({
        rootPath,
        cacheId,
        primaryColor,
        title,
        target,
      }),
      extendedBaseConfig,
    ),
  };
};
