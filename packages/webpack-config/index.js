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

  const baseConfig = merge(
    require('./webpack.config.base')({
      rootPath,
      cacheId,
      primaryColor,
      title,
      target,
    }),
    extendedBaseConfig,
  );

  const devConfig = require('./webpack.config.dev')(
    { ...baseConfig },
    {
      rootPath,
      cacheId,
      primaryColor,
      title,
      target,
    },
  );

  const prodConfig = require('./webpack.config.prod')(
    { ...baseConfig },
    {
      rootPath,
      cacheId,
      primaryColor,
      title,
      target,
    },
  );

  const umdConfig = require('./webpack.config.umd')(
    { ...prodConfig },
    {
      rootPath,
      cacheId,
      primaryColor,
      title,
      target,
    },
  );

  return {
    baseConfig,
    devConfig,
    prodConfig,
    umdConfig,
  };
};
