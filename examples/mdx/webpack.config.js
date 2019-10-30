const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const base = require('./webpack.config');

module.exports = {
  ...base,
  mode: 'development',
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'example.js'
  },
  externals: {},
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Spectacle Development Example',
      template: `./index.html`
    })
  ]
};
