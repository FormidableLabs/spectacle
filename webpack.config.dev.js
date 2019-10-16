const base = require('./webpack.config');

module.exports = {
  ...base,
  mode: 'development',
  output: {
    ...base.output,
    filename: 'spectacle.js'
  }
};
