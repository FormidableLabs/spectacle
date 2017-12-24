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

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _base = require('../utils/base');

var _reactEmotion = require('react-emotion');

var _reactEmotion2 = _interopRequireDefault(_reactEmotion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StyledHeader = /*#__PURE__*/(0, _reactEmotion2.default)('div')(function (_ref) {
  var height = _ref.height,
      styles = _ref.styles;
  return [styles.context, styles.base, {
    display: 'block',
    width: '100%',
    height: height
  }];
});

var dynamicHeaderFitStyles = function dynamicHeaderFitStyles(_ref2) {
  var scale = _ref2.scale,
      lineHeight = _ref2.lineHeight,
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
};

var dynamicStyledFitHeaders = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].reduce(function (memo, tag) {
  var _extends2;

  return (0, _extends5.default)({}, memo, (_extends2 = {}, _extends2[tag] = /*#__PURE__*/ /*#__PURE__*/(0, _reactEmotion2.default)(tag)(dynamicHeaderFitStyles), _extends2));
}, {});

var dynamicHeaderStyles = function dynamicHeaderStyles(_ref3) {
  var lineHeight = _ref3.lineHeight,
      styles = _ref3.styles;
  return [styles.context, styles.base, { lineHeight: lineHeight }, styles.typeface, styles.user];
};

var dynamicStyledHeaders = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].reduce(function (memo, tag) {
  var _extends3;

  return (0, _extends5.default)({}, memo, (_extends3 = {}, _extends3[tag] = /*#__PURE__*/ /*#__PURE__*/(0, _reactEmotion2.default)(tag)(dynamicHeaderStyles), _extends3));
}, {});

var Heading = function (_Component) {
  (0, _inherits3.default)(Heading, _Component);

  function Heading() {
    (0, _classCallCheck3.default)(this, Heading);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this));

    _this.resize = _this.resize.bind(_this);
    _this.state = {
      scale: 1,
      height: 16
    };
    return _this;
  }

  Heading.prototype.componentDidMount = function componentDidMount() {
    this.resize();
    window.addEventListener('load', this.resize);
    window.addEventListener('resize', this.resize);
  };

  Heading.prototype.componentWillReceiveProps = function componentWillReceiveProps() {
    this.resize();
  };

  Heading.prototype.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener('load', this.resize);
    window.removeEventListener('resize', this.resize);
  };

  Heading.prototype.resize = function resize() {
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

  Heading.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        size = _props.size,
        lineHeight = _props.lineHeight,
        fit = _props.fit,
        style = _props.style,
        children = _props.children;

    var Tag = 'h' + size;
    var typefaceStyle = this.context.typeface || {};

    if (fit) {
      return (0, _jsx3.default)(StyledHeader, {
        className: this.props.className,
        innerRef: function innerRef(c) {
          _this2.containerRef = c;
        },
        height: this.state.height,
        styles: {
          context: this.context.styles.components.heading['h' + size],
          base: _base.getStyles.call(this)
        }
      }, void 0, (0, _react.createElement)(dynamicStyledFitHeaders[Tag], {
        innerRef: function innerRef(t) {
          _this2.textRef = t;
        },
        scale: this.state.scale,
        lineHeight: lineHeight,
        styles: {
          user: style,
          typeface: typefaceStyle
        }
      }, children));
    }

    return (0, _react.createElement)(dynamicStyledHeaders[Tag], {
      className: this.props.className,
      lineHeight: lineHeight,
      styles: {
        context: this.context.styles.components.heading['h' + size],
        base: _base.getStyles.call(this),
        user: style,
        typeface: typefaceStyle
      }
    }, children);
  };

  return Heading;
}(_react.Component);

exports.default = Heading;


Heading.defaultProps = {
  size: 1,
  lineHeight: 1
};

Heading.contextTypes = {
  styles: _propTypes2.default.object,
  store: _propTypes2.default.object,
  typeface: _propTypes2.default.object
};