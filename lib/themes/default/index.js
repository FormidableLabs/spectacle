"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _screen = _interopRequireDefault(require("./screen"));

var _print = _interopRequireDefault(require("./print"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(colors, fonts) {
  return {
    screen: (0, _screen.default)(colors, fonts),
    print: (0, _print.default)()
  };
};

var _default = styles;
exports.default = _default;