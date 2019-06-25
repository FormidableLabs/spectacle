const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const context = __dirname;

module.exports = {
  entry: './index.js',
  context,
  mode: 'development',
  target: 'web',
  devtool: 'eval-source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')],
    alias: {
      spectacle: path.resolve(__dirname, '../..')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: require.resolve('source-map-loader'),
        include: [/node_modules/, context],
        enforce: 'pre'
      },
      {
        test: /\.js$/,
        include: [context],
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.mdx?$/,
        include: [context],
        exclude: [/node_modules/],
        use: ['babel-loader', '@mdx-js/loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `./index.html`
    })
  ]
};
