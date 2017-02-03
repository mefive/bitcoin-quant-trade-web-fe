var webpack = require('webpack');
var merge = require('webpack-merge');
var base = require('./webpack.base.config');
var config = require('./config');
var buildRoot = 'dev';

module.exports = merge(base, {
  devtool: 'source-map',
  // devtool: '#eval-source-map',
  devServer: {
    port: 1996,
    hot: true,
    inline: true,
    colors: true,
    proxy: {
      '^/api/**': {
        target: 'http://localhost:3000',
        hostRewrite: 'http://localhost:3000',
        secure: false,
        changeOrigin: true
      }
    }
  },
  // entry: config.getDevEntry(),
  output: {
    filename: '[name].js',
    path: buildRoot,
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // loaders: ['react-hot', 'babel']
        loaders: ['babel']
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});
