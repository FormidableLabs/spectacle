'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _screen = require('./screen');

var _screen2 = _interopRequireDefault(_screen);

var _print = require('./print');

var _print2 = _interopRequireDefault(_print);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(colors, fonts) {
  return {
    screen: (0, _screen2.default)(colors, fonts),
    print: (0, _print2.default)()
  };
};

exports.default = styles;