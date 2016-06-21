/* eslint-disable */

var webpack = require("webpack");
var path = require("path");

module.exports = function (config) {
  config.set({
    browsers: [ "Chrome" ],
    frameworks: [ "mocha" ],

    files: [
      "tests.webpack.js"
    ],

    preprocessors: {
      "tests.webpack.js": [ "webpack", "sourcemap" ]
    },

    webpack: {
      module: {
        loaders: [{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel'
        }, {
          test: /\.css$/,
          loaders: ['style', 'raw'],
          include: __dirname
        }, {
          test: /\.svg$/,
          loader: 'url?limit=10000&mimetype=image/svg+xml',
          include: path.join(__dirname, 'assets')
        }, {
          test: /\.png$/,
          loader: 'url-loader?mimetype=image/png',
          include: path.join(__dirname, 'assets')
        }, {
          test: /\.jpg$/,
          loader: 'url-loader?mimetype=image/jpg',
          include: path.join(__dirname, 'assets')
        }]
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('test')
        })
      ]
    },

    webpackServer: {
      noInfo: true
    }
  });
};