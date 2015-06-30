var getConfig = require('hjs-webpack')
var config = require('./presentation/config');

module.exports = getConfig({
  in: './index.jsx',
  out: 'dist',
  clearBeforeBuild: true,
  html: config.html
});