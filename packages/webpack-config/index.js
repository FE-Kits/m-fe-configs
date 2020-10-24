const { merge } = require('webpack-merge');

module.exports = ({
  rootPath = process.cwd(),
  target = 'web', // target 可以为 web, mobile, server, rn, taro 等
  cacheId = 'cacheId',
  themeVars = {},
  title = 'Awesome App',
  useCssModule = true,
  usePrepack = false,
  useFractalNpmPackages = false,
  useCssHash = false,
  extendedBaseConfig = {},
  htmlWebpackPluginOptions = {},
} = {}) => {
  console.log(`\nCurrent build path: ${rootPath}\n`);

  const baseConfig = merge(
    require('./webpack.config.base')({
      rootPath,
      cacheId,
      themeVars,
      title,
      target,
      useCssModule,
    }),
    extendedBaseConfig,
  );

  const devConfig = require('./webpack.config.dev')(
    { ...baseConfig },
    {
      rootPath,
      cacheId,
      themeVars,
      title,
      target,
    },
  );

  const prodConfig = require('./webpack.config.prod')(
    { ...baseConfig },
    {
      rootPath,
      cacheId,
      themeVars,
      title,
      target,
      htmlWebpackPluginOptions,
      usePrepack,
      useFractalNpmPackages,
      useCssHash,
    },
  );

  const umdConfig = require('./webpack.config.umd')(
    { ...prodConfig },
    {
      rootPath,
      cacheId,
      themeVars,
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
