/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

module.exports = (
  baseConfig,
  { cacheId, title, htmlWebpackPluginOptions } = {},
) => {
  const { buildEnv, moduleCSSLoader, lessLoader } = baseConfig.extra;

  delete baseConfig.extra;

  const config = merge(baseConfig, {
    devtool: 'hidden-source-map',
    mode: 'production',
    output: { filename: '[name].[contenthash].js' },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.less$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            moduleCSSLoader,
            'postcss-loader',
            lessLoader,
          ],
        },
        {
          test: /\.less$/,
          include: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            lessLoader,
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(false),
      }),

      new GenerateSW({
        cacheId,
        runtimeCaching: [
          {
            urlPattern: /[./]api[./]/,
            handler: 'NetworkFirst',
          },
        ],
      }),

      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),

      // 使用 Prepack 优化包体大小
      // 暂时存在 Bug,等待修复
      // 使用前 21 - 425
      // 使用后 21 - 433
      // new PrepackWebpackPlugin({
      //   mathRandomSeed: '0'
      // }),

      // 必须将 CopyWebpackPlugin 与 HtmlWebpackPlugin 添加到末尾
      new CopyWebpackPlugin([{ from: buildEnv.public, to: buildEnv.build }]),

      new HtmlWebpackPlugin({
        template: path.join(__dirname, './template/template.ejs'),
        title: title,
        favicon: path.join(buildEnv.public, 'favicon.ico'),
        manifest: path.join(buildEnv.public, 'manifest.json'),
        meta: [
          { name: 'robots', content: 'noindex,nofollow' },
          {
            name: 'viewport',
            content:
              'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no',
          },
        ],
        appMountIds: ['root'],
        minify: true,
        mobile: true,
        alwaysWriteToDisk: true,
        inlineSource: /(^|[\\/])manifest\.\w+\.js$/,
        scripts: [],
        ...htmlWebpackPluginOptions,
      }),
      new HtmlWebpackHarddiskPlugin(),
    ],

    optimization: {
      runtimeChunk: 'single',
      minimizer: [
        new TerserPlugin({
          exclude: /.*ts-worker.*/,
          terserOptions: {
            output: {
              comments: false,
            },
          },
        }),
        new OptimizeCSSAssetsPlugin({}),
      ],
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /node_modules/,
            name: 'vendors',
            enforce: true,
            chunks: 'all',
          },
          // 将所有的样式文件打包到单个项目
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
  });

  return config;
};
