/* jshint node: true */
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var fs = require('fs');
var webpack = require('webpack');

require('dotenv').config();

var package = require('./package.json');

var ENV = process.env.npm_lifecycle_event;
var isProd = ENV === 'build';

module.exports = function makeWebpackConfig() {
  var config = {};

  config.devtool = 'source-map';
  config.entry = ['react-hot-loader/patch','whatwg-fetch','index.tsx'];
  config.output = {
    path: __dirname + '/dist',
    publicPath: isProd ? '/' : ('http://localhost:' + process.env.PORT + '/'),
    filename: isProd ? 'ftcapp.[hash].min.js' : '[name].bundle.js',
    chunkFilename: isProd ? 'ftcapp.[name].[hash].min.js' : '[name].bundle.js'
  };
  config.resolve = {
    extensions: [
      '.ts', '.tsx', '.js', '.jsx', '.less', '.json'
    ],
    modules: ['./src', './node_modules']
  };
  config.module = {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        loaders: ['babel-loader','ts-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'file-loader'
      }, {
        test: /\.html$/,
        loader: 'raw-loader'
      }, {
        test: /\.less$/,
        use: isProd ? ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            { loader: 'resolve-url-loader' },
            { loader: 'less-loader' }
          ]
        }) : [
            { loader: 'style-loader' },
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'resolve-url-loader' },
            {
              loader: 'less-loader',
              options: {
                sourceMap: true
              }
            }
          ]
      }
    ]
  };
  config.plugins = [];

  config.plugins.push(
    new HtmlWebpackPlugin(
      {
        template: './public/index.html',
        inject: 'body'
      }
    ),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(isProd ? 'production' : 'development'),
      PROD: JSON.stringify('production'),
      DEV: JSON.stringify('development'),
      API_URL: JSON.stringify(process.env.API_URL),
      WS_API_URL: JSON.stringify(process.env.WS_API_URL),
      API_VERSION: JSON.stringify('v1'),
      'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development')      
    })
  );
    
  if (isProd) {
    config.plugins.push(
      new ExtractTextPlugin({
        filename: 'ftcapp.[hash].min.css',
        allChunks: true
      }),
      //Compress css assets
      new OptimizeCssAssetsPlugin(),
      //Compress and supress warnings
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      //Copy all assets excluding index.html to dist folder
      new CopyWebpackPlugin([
        {
          from: './public',
          ignore: ['index.html']
        }
      ])
    );
  } else {
    config.plugins.push(
      new webpack.NamedModulesPlugin()
    );
  }
  
  config.devServer = {
    port: process.env.PORT,
    contentBase: './public',
    stats: 'minimal',
    hot: true
  };

  return config;
  
}();