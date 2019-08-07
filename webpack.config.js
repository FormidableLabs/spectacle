const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.mdx$/,
        use: [
          { loader: 'babel-loader' },
          { loader: require.resolve('./mdx-slide-loader') }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `./index.html`
    })
  ]
};
