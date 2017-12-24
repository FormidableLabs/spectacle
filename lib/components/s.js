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

var textDecoration = function textDecoration(type) {
  if (type.indexOf('strikethrough') !== -1) {
    return 'line-through';
  } else if (type.indexOf('underline') !== -1) {
    return 'underline';
  }
  return 'none';
};

var StyledS = /*#__PURE__*/(0, _reactEmotion2.default)('span')(function (_ref) {
  var type = _ref.type,
      styles = _ref.styles;
  return [{
    textDecoration: textDecoration(type),
    fontWeight: type.indexOf('bold') !== -1 ? 'bold' : 'normal',
    fontStyle: type.indexOf('italic') !== -1 ? 'italic' : 'normal'
  }, styles.context, styles.base, styles.user];
});

var S = function (_Component) {
  (0, _inherits3.default)(S, _Component);

  function S() {
    (0, _classCallCheck3.default)(this, S);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  S.prototype.render = function render() {
    var _props = this.props,
        type = _props.type,
        style = _props.style,
        children = _props.children;

    return (0, _jsx3.default)(StyledS, {
      className: this.props.className,
      type: type,
      styles: {
        context: this.context.styles.components.s[type],
        base: _base.getStyles.call(this),
        user: style
      }
    }, void 0, children);
  };

  return S;
}(_react.Component);

exports.default = S;


S.contextTypes = {
  styles: _propTypes2.default.object,
  store: _propTypes2.default.object
};