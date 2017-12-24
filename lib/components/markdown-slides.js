'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

exports.default = MarkdownSlides;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _slide = require('./slide');

var _slide2 = _interopRequireDefault(_slide);

var _markdown = require('./markdown');

var _markdown2 = _interopRequireDefault(_markdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transformStringsIntoJSX = function transformStringsIntoJSX(strings) {
  return strings.split(/\n---\n/).map(function (markdown, index) {
    return (0, _jsx3.default)(_slide2.default, {}, 'md-slide-' + index, (0, _jsx3.default)(_markdown2.default, {}, void 0, markdown));
  });
};

function MarkdownSlides(stringOrStrings) {
  for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    interpolations[_key - 1] = arguments[_key];
  }

  if (Array.isArray(stringOrStrings)) {
    var strings = stringOrStrings.map(function (string, index) {
      if (interpolations[index]) {
        return (string + interpolations[index]).trim();
      }
      return string.trim();
    }).join('');
    return transformStringsIntoJSX(strings);
  }
  return transformStringsIntoJSX(stringOrStrings);
}