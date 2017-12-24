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

var format = function format(str) {
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

var StyledCode = /*#__PURE__*/(0, _reactEmotion2.default)('code')(function (props) {
  return props.styles;
});

var Code = function (_Component) {
  (0, _inherits3.default)(Code, _Component);

  function Code() {
    (0, _classCallCheck3.default)(this, Code);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  Code.prototype.createMarkup = function createMarkup() {
    return {
      __html: format(this.props.children)
    };
  };

  Code.prototype.render = function render() {
    var styles = [this.context.styles.components.code, _base.getStyles.call(this), this.props.style];
    return (0, _jsx3.default)(StyledCode, {
      className: this.props.className,
      styles: styles,
      dangerouslySetInnerHTML: this.createMarkup()
    });
  };

  return Code;
}(_react.Component);

exports.default = Code;


Code.contextTypes = {
  styles: _propTypes2.default.object,
  store: _propTypes2.default.object
};