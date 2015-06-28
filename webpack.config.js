var getConfig = require('hjs-webpack')

module.exports = getConfig({
  in: './index.jsx',
  out: 'dist',
  clearBeforeBuild: true
});