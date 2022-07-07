const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const base = require('../../packages/spectacle/webpack.config');

module.exports = {
  ...base,
  mode: 'development',
  context: __dirname,
  entry: './index.tsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'example.js'
  },
  externals: {},
  plugins: [
    ...base.plugins,
    new HtmlWebpackPlugin({
      title: 'Spectacle TypeScript Demo',
      template: `./index.html`
    })
  ]
};
