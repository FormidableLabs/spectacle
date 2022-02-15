const path = require('path');
const webpack = require('webpack');

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
  entry: './src/index.ts',
  output: {
    library: 'Spectacle',
    libraryTarget: 'umd',
    path: path.join(__dirname, 'dist'),
    filename: 'spectacle.min.js'
  },
  devtool: 'source-map',
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-is': 'ReactIs'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    fallback: { assert: require.resolve('assert/') }
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: ['babel-loader']
      },
      { test: /\.(png|svg|jpg|gif)$/, use: ['file-loader'] }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser'
    })
  ]
};
