"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MarkdownSlides;

var _react = _interopRequireDefault(require("react"));

var _slide = _interopRequireDefault(require("./slide"));

var _markdown = _interopRequireDefault(require("./markdown"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transformStringsIntoJSX = function transformStringsIntoJSX(strings) {
  return strings.split(/\n---\n/).map(function (markdown, index) {
    return _react.default.createElement(_slide.default, {
      key: "md-slide-".concat(index)
    }, _react.default.createElement(_markdown.default, null, markdown));
  });
};

function MarkdownSlides(stringOrStrings) {
  for (var _len = arguments.length, interpolations = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
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