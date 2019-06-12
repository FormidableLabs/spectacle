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
        // include: ['index.js', 'src', 'example/assets', 'example/src'].map(
        //   name => path.resolve(__dirname, name)
        // ),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      { test: /\.mdx?$/, use: ['babel-loader', '@mdx-js/loader'] }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `./index.html`
    })
  ]
};
