const path = require('path');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: [
    '@babel/polyfill',
    './index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: [
        path.resolve(__dirname, 'index.js'),
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'example/assets'),
        path.resolve(__dirname, 'example/src')
      ],
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
