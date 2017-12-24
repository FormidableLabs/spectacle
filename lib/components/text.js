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

var FitText = /*#__PURE__*/(0, _reactEmotion2.default)('div')(function (_ref) {
  var height = _ref.height,
      styles = _ref.styles;
  return [styles.context, styles.base, {
    display: 'block',
    width: '100%',
    height: height
  }];
});

var FitTextContent = /*#__PURE__*/(0, _reactEmotion2.default)('span')(function (_ref2) {
  var lineHeight = _ref2.lineHeight,
      scale = _ref2.scale,
      styles = _ref2.styles;
  return [{
    fontSize: 16,
    display: 'block',
    margin: '0',
    padding: '0',
    lineHeight: lineHeight,
    transform: 'scale(' + scale + ')',
    transformOrigin: 'center top'
  }, styles.typeface, styles.user];
});

var UnfitText = /*#__PURE__*/(0, _reactEmotion2.default)('p')(function (_ref3) {
  var lineHeight = _ref3.lineHeight,
      styles = _ref3.styles;
  return [styles.context, styles.base, { lineHeight: lineHeight }, styles.typeface, styles.user];
});

var Text = function (_Component) {
  (0, _inherits3.default)(Text, _Component);

  function Text() {
    (0, _classCallCheck3.default)(this, Text);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this));

    _this.resize = _this.resize.bind(_this);
    _this.state = {
      scale: 1,
      height: 16
    };
    return _this;
  }

  Text.prototype.componentDidMount = function componentDidMount() {
    this.resize();
    window.addEventListener('load', this.resize);
    window.addEventListener('resize', this.resize);
  };

  Text.prototype.componentWillReceiveProps = function componentWillReceiveProps() {
    this.resize();
  };

  Text.prototype.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener('load', this.resize);
    window.removeEventListener('resize', this.resize);
  };

  Text.prototype.resize = function resize() {
    if (this.props.fit) {
      var text = this.textRef;
      var container = this.containerRef;
      text.style.display = 'inline-block';
      var scale = container.offsetWidth / text.offsetWidth;
      var height = text.offsetHeight * scale || 0;
      text.style.display = 'block';
      this.setState({
        scale: scale,
        height: height
      });
    }
  };

  Text.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        lineHeight = _props.lineHeight,
        fit = _props.fit,
        style = _props.style,
        children = _props.children;

    var typefaceStyle = this.context.typeface || {};
    return fit ? (0, _jsx3.default)(FitText, {
      className: this.props.className,
      innerRef: function innerRef(c) {
        _this2.containerRef = c;
      },
      height: this.state.height,
      styles: {
        context: this.context.styles.components.text,
        base: _base.getStyles.call(this)
      }
    }, void 0, (0, _jsx3.default)(FitTextContent, {
      innerRef: function innerRef(t) {
        _this2.textRef = t;
      },
      lineHeight: lineHeight,
      scale: this.state.scale,
      styles: { user: style, typeface: typefaceStyle }
    }, void 0, children)) : (0, _jsx3.default)(UnfitText, {
      className: this.props.className,
      styles: {
        context: this.context.styles.components.text,
        base: _base.getStyles.call(this),
        typeface: typefaceStyle,
        user: style
      }
    }, void 0, children);
  };

  return Text;
}(_react.Component);

exports.default = Text;


Text.defaultProps = {
  lineHeight: 1
};

Text.contextTypes = {
  styles: _propTypes2.default.object,
  store: _propTypes2.default.object,
  typeface: _propTypes2.default.object
};