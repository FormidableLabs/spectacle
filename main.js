'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/react.production.min.js');
} else {
  module.exports = require('./dist/react.development.js');
}