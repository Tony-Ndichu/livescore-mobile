const HTMLWebpackPlugin = require('html-webpack-plugin');
const { ModuleConcatenationPlugin, AggressiveMergingPlugin } = require('webpack').optimize;
const CompressionPlugin = require('compression-webpack-plugin');
const { join } = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const { HotModuleReplacementPlugin } = require('webpack');
require('babel-polyfill');
const path = require('path');
const BrotliPlugin = require('brotli-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const BUILD_DIR = path.resolve(__dirname, './build');
const APP_DIR = path.resolve(__dirname, './');

module.exports = {
  mode: 'development',
  // entry: ['babel-polyfill', join(__dirname, 'app.js')],
  entry: [
    'babel-polyfill',
    `${APP_DIR}/index.js`,
  ],
  output: {
    path: BUILD_DIR,
    publicPath: '//localhost:3000/',
    filename: 'bundle.js',
  },
  devServer: {
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|svg|jpe?g|eot|ttf|woff|woff2|gif)$/i,
        use: 'url-loader',
      },
      {
        test: /\.s(c|a)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            // Requires sass-loader@^8.0.0
            options: {
              implementation: require('sass'),
              sassOptions: {
                fiber: require('fibers'),
              },
            },
          },
        ],
      },
    ],
  },
  optimization: { namedModules: true, namedChunks: true, splitChunks: { cacheGroups: { default: false } } },
  plugins: [
    new HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new HTMLWebpackPlugin({
      showErrors: true,
      cache: true,
      title: 'Betika Livescore',
      // favicon: join(__dirname, 'logo.png'),
      template: join(__dirname, 'index.html'),
    }),
    // new AggressiveMergingPlugin(),
    // new Dotenv(),
    // new ModuleConcatenationPlugin(),
    // new CompressionPlugin({
    //   filename: '[path].gz[query]',
    //   algorithm: 'gzip',
    //   test: /\.js$|\.css$|\.html$/,
    //   threshold: 10240,
    //   minRatio: 0.8,
    // }),
    // new BrotliPlugin({
    //   asset: '[path].br[query]',
    //   test: /\.(js|css|html|svg)$/,
    //   threshold: 10240,
    //   minRatio: 0.8,
    // }),
  ],
};
