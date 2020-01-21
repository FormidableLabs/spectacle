const path = require('path');

/**
 * Production library config.
 *
 * Used as a base, this produces with other configs:
 *
 * - `dist/spectacle.min.js`: production library
 * - `dist/spectacle.js`: development library
 */

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    library: 'Spectacle',
    libraryTarget: 'umd',
    path: path.join(__dirname, 'dist'),
    filename: 'spectacle.min.js'
  },
  devtool: 'source-map',
  // TODO: Document externals
  externals: {
    react: 'React',
    'react-dom': 'ReactDom',
    'react-is': 'ReactIs',
    'prop-types': 'PropTypes'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  }
};
