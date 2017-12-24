'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactTypography = require('react-typography');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Typeface = function (_Component) {
  (0, _inherits3.default)(Typeface, _Component);

  function Typeface() {
    (0, _classCallCheck3.default)(this, Typeface);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  Typeface.prototype.getChildContext = function getChildContext() {
    return {
      typeface: {
        fontFamily: this.props.googleFont || this.props.font || '',
        fontWeight: this.props.weight,
        fontStyle: this.props.italic ? 'italic' : 'normal'
      }
    };
  };

  Typeface.prototype.render = function render() {
    var _props = this.props,
        children = _props.children,
        googleFont = _props.googleFont,
        _props$weight = _props.weight,
        weight = _props$weight === undefined ? 400 : _props$weight,
        _props$italic = _props.italic,
        italic = _props$italic === undefined ? false : _props$italic,
        styles = _props.styles;

    if (typeof googleFont !== 'undefined' && googleFont.length > 0) {
      var styleSuffix = italic ? 'i' : '';
      var config = {
        title: '' + googleFont,
        options: {
          googleFonts: [{
            name: googleFont,
            styles: styles || ['' + weight + styleSuffix]
          }]
        }
      };
      return (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)(_reactTypography.GoogleFont, {
        typography: config
      }), children);
    } else {
      return (0, _jsx3.default)('div', {}, void 0, children);
    }
  };

  return Typeface;
}(_react.Component);

Typeface.childContextTypes = {
  typeface: _propTypes2.default.object
};

exports.default = Typeface;