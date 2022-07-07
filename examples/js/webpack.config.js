const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const base = require('../../packages/spectacle/webpack.config');

module.exports = {
  ...base,
  mode: 'development',
  context: __dirname,
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'example.js'
  },
  externals: {},
  plugins: [
    ...base.plugins,
    new HtmlWebpackPlugin({
      title: 'Spectacle JavaScript Demo',
      template: `./index.html`
    })
  ],
  resolve: {
    ...base.resolve,
    alias: {
      spectacle: path.resolve(__dirname, '../../src')
    }
  }
};
