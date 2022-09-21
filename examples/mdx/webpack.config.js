const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const base = require('../../webpack.config.base');

/**
 * Base configuration for the CLI, core, and examples.
 */
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
  devtool: 'source-map',
  module: {
    ...base.module,
    rules: [
      ...base.module.rules,
      {
        test: /\.mdx$/,
        use: [
          require.resolve('babel-loader'),
          require.resolve('spectacle-mdx-loader')
        ]
      }
    ]
  },
  plugins: [
    ...base.plugins,
    new HtmlWebpackPlugin({
      title: 'Spectacle MDX Development Example',
      template: `./index.html`
    })
  ]
};
