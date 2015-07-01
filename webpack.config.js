var getConfig = require('hjs-webpack')
var config = require('./presentation/config');

var webpackConfig = getConfig({
  in: './index.jsx',
  out: 'dist',
  clearBeforeBuild: true,
  html: config.html
});

webpackConfig.module.loaders[0] = {
  test: /(\.js$)|(\.jsx$)/,
  exclude: /node_modules/,
  loaders: [
    'babel-loader?stage=1'
  ]
}

module.exports = webpackConfig;