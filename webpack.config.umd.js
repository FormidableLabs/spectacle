const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    spectacle: './src/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    pathinfo: true,
    filename: '[name].js',
    library: 'Spectacle',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map'
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192'
    }, {
      test: /\.svg$/,
      loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
    }]
  }
};
