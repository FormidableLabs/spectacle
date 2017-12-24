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

var StyledImg = /*#__PURE__*/(0, _reactEmotion2.default)('img')(function (_ref) {
  var styles = _ref.styles;
  return [styles.context, styles.base, {
    maxWidth: '100%',
    maxHeight: '100%'
  }, styles.props, styles.user];
});

var Image = function (_Component) {
  (0, _inherits3.default)(Image, _Component);

  function Image() {
    (0, _classCallCheck3.default)(this, Image);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  Image.prototype.render = function render() {
    var styles = {
      context: this.context.styles.components.image,
      base: _base.getStyles.call(this),
      props: {
        width: this.props.width,
        height: this.props.height,
        display: this.props.display
      },
      user: this.props.style
    };
    return (0, _jsx3.default)(StyledImg, {
      className: this.props.className,
      src: this.props.src,
      alt: this.props.alt,
      styles: styles
    });
  };

  return Image;
}(_react.Component);

exports.default = Image;


Image.contextTypes = {
  styles: _propTypes2.default.object,
  store: _propTypes2.default.object
};