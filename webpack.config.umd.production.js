const webpack = require('webpack');
const config = require('./webpack.config.umd');

// Mutate dev config to production.
config.output.pathinfo = false;
config.output.filename = '[name].min.js';
config.plugins = config.plugins.concat([
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    compressor: {
      warnings: false
    }
  })
]);

module.exports = config;
