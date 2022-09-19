const path = require('path');
const base = require('../../webpack.config.base');

module.exports = {
  ...base,
  output: {
    ...base.output,
    path: path.join(__dirname, 'dist')
  }
};
