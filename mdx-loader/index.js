const { getOptions } = require('loader-utils');

const parse = require('./parse');

module.exports = async function(src) {
  const callback = this.async();
  const options = Object.assign({}, getOptions(this), {
    filepath: this.resourcePath
  });

  const allCode = parse(src, options);
  return callback(null, allCode);
};
