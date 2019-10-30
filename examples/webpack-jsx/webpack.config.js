const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: './src/index',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!raw-loader'
      },
      {
        test: /\.png$/,
        include: path.join(__dirname, 'assets'),
        loader: 'url-loader?mimetype=image/png'
      },
    ]
  },
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react')
    }
  }
};