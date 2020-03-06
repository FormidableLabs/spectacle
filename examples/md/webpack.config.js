const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const base = require('../../webpack.config');

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
  module: {
    rules: base.module.rules.concat([
      {
        test: /\.md$/,
        use: [require.resolve('raw-loader')]
      }
    ])
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Spectacle MD Development Example',
      template: `./index.html`
    })
  ],
  resolve: {
    alias: {
      spectacle: path.resolve(__dirname, '../../src')
    }
  }
};
