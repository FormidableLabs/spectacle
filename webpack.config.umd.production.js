const config = require('./webpack.config.umd');

module.exports = Object.assign({}, config, {
  mode: 'production',
  output: Object.assign({}, config.output, {
    pathinfo: false,
    filename: '[name].min.js'
  })
});
