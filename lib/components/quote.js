'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _base = require('../utils/base');

var _reactEmotion = require('react-emotion');

var _reactEmotion2 = _interopRequireDefault(_reactEmotion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StyledQuote = /*#__PURE__*/(0, _reactEmotion2.default)('span')(function (props) {
  return props.styles;
});

var Quote = function (_Component) {
  (0, _inherits3.default)(Quote, _Component);

  function Quote() {
    (0, _classCallCheck3.default)(this, Quote);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  Quote.prototype.render = function render() {
    var typefaceStyle = this.context.typeface || {};
    return (0, _jsx3.default)(StyledQuote, {
      className: this.props.className,
      styles: [this.context.styles.components.quote, _base.getStyles.call(this), typefaceStyle, this.props.style]
    }, void 0, this.props.children);
  };

  return Quote;
}(_react.Component);

exports.default = Quote;


Quote.contextTypes = {
  styles: _propTypes2.default.object,
  store: _propTypes2.default.object,
  typeface: _propTypes2.default.object
};