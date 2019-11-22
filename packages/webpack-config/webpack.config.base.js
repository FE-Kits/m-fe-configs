/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const process = require('process');

const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const RewriteImportPlugin = require('less-plugin-rewrite-import');

const rootPath = process.cwd();

const NODE_ENV = process.env.NODE_ENV || 'development';
const __DEV__ = NODE_ENV === 'development' || NODE_ENV === 'dev';
const NODE_MODULES_REG = /[\\/]node_modules[\\/]/;
const hashType = __DEV__ ? 'hash' : 'contenthash';
const packageName = require(path.resolve(rootPath, 'package.json'));

console.log(
  `Current build path: ${rootPath}, packageName: ${packageName.name}`,
);

const buildEnv = {
  rootPath,
  packageName,
  src: path.resolve(rootPath, './src'),
  public: path.resolve(rootPath, './public'),
  build: path.resolve(rootPath, './build'),

  cacheId: 'cacheId',
  title: 'Awesome App',
  primaryColor: '#5d4bff',

  ...(process.env.buildEnv || {}),
};

const moduleCSSLoader = {
  loader: 'css-loader',
  options: {
    modules: {
      localIdentName: __DEV__
        ? '[path][name]__[local]---[hash:base64:5]'
        : '[hash:base64:10]',
    },
    sourceMap: __DEV__,
    importLoaders: 2,
    localsConvention: 'camelCaseOnly',
  },
};

const lessLoader = {
  loader: 'less-loader',
  options: {
    modifyVars: {
      'primary-color': buildEnv.primaryColor,
    },
    javascriptEnabled: true,
    sourceMap: __DEV__,
    plugins: [
      new RewriteImportPlugin({
        paths: {
          // '~antd/es/style/themes/default.less': function() {
          //   return 'antd/es/style/themes/default.less';
          // },
        },
      }),
    ],
  },
};

const fontsOptions = {
  limit: 8192,
  mimetype: 'application/font-woff',
  name: 'fonts/[name].[ext]',
};

module.exports = {
  context: rootPath,
  entry: {
    index: path.resolve(buildEnv.rootPath, './src/index.tsx'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css', '.less'],
    plugins: [new TSConfigPathsPlugin()],
    alias: Object.assign(
      {
        dayjs: 'dayjs/esm',
        moment$: 'dayjs/esm',
        systemjs$: 'systemjs/dist/system.js',
        '@': path.resolve(rootPath, './src/'),
      },
      __DEV__ && {
        'react-dom': '@hot-loader/react-dom',
      },
    ),
  },
  output: {
    path: buildEnv.build,
    // 设置所有资源的默认公共路径，Webpack 会自动将 import 的资源改写为该路径
    publicPath: '/',
    filename: `[name].[${hashType}].js`,
    globalObject: 'this', // 避免全局使用 window
  },
  module: {
    rules: [
      {
        test: /.*ts-worker.*/,
        use: ['workerize-loader', 'ts-loader'],
      },
      {
        test: /\.(ts|tsx)?$/,
        use: [
          'cache-loader',
          {
            loader: 'thread-loader',
            options: {
              // there should be 1 cpu for the fork-ts-checker-webpack-plugin
              workers: require('os').cpus().length - 1,
              // eslint-disable-next-line no-magic-numbers
              poolTimeout: __DEV__ ? Infinity : 2000, // set this to Infinity in watch mode - see https://github.com/webpack-contrib/thread-loader
            },
          },
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true,
              getCustomTransformers: () => ({
                before: [tsImportPluginFactory(/** options */)],
              }),
            },
          },
        ],

        exclude: NODE_MODULES_REG,
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'images/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: fontsOptions,
          },
        ],
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'file-loader',
            options: fontsOptions,
          },
        ],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        oneOf: [
          {
            issuer: /\.[jt]sx?$/,
            use: [
              {
                loader: 'svg-inline-loader',
              },
            ],
          },
          {
            loader: 'url-loader',
          },
        ],
      },

      {
        test: /\.wasm$/,
        loader: 'wasm-loader',
        exclude: NODE_MODULES_REG,
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true,
      eslint: true,
    }),
    new webpack.WatchIgnorePlugin([/less\.d\.ts$/]),
    new webpack.IgnorePlugin(/\.js\.map$/),
  ],

  // 定义非直接引用依赖，使用方式即为 var $ = require("jquery")
  externals: {
    window: 'window',
    jquery: '$',
  },
  extra: {
    const: { NODE_MODULES_REG },
    moduleCSSLoader,
    lessLoader,
    buildEnv,
  },
};
