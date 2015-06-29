var getConfig = require('hjs-webpack')
var config = require('./config');

module.exports = getConfig({
  in: './index.jsx',
  out: 'dist',
  clearBeforeBuild: true,
  html: config.html
});