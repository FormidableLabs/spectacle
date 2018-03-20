const path = require('path');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: [
    '@babel/polyfill',
    './index',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          'index.js',
          'src',
          'example/assets',
          'example/src',
        ].map((name) => path.resolve(__dirname, name)),
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192',
      },
      {
        test: /\.svg$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
      },
    ],
  },
};
