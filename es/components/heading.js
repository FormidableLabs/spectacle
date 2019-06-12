function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import { getStyles } from '../utils/base';
import styled from 'react-emotion';
var StyledHeader =
/*#__PURE__*/
styled("div", {
  target: "e134u50i0"
})(function (_ref) {
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
    transform: "scale(".concat(scale, ")"),
    transformOrigin: 'center top'
  }, styles.typeface, styles.user];
};

var dynamicStyledFitHeaders = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].reduce(function (memo, tag) {
  return _objectSpread({}, memo, _defineProperty({}, tag,
  /*#__PURE__*/

  /*#__PURE__*/
  styled(tag, _defineProperty({
    target: "e134u50i1"
  }, "target", "e134u50i2"))(dynamicHeaderFitStyles)));
}, {});

var dynamicHeaderStyles = function dynamicHeaderStyles(_ref3) {
  var lineHeight = _ref3.lineHeight,
      styles = _ref3.styles;
  return [styles.context, styles.base, {
    lineHeight: lineHeight
  }, styles.typeface, styles.user];
};

var dynamicStyledHeaders = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].reduce(function (memo, tag) {
  return _objectSpread({}, memo, _defineProperty({}, tag,
  /*#__PURE__*/

  /*#__PURE__*/
  styled(tag, _defineProperty({
    target: "e134u50i3"
  }, "target", "e134u50i4"))(dynamicHeaderStyles)));
}, {});

var Heading =
/*#__PURE__*/
function (_Component) {
  _inherits(Heading, _Component);

  function Heading() {
    var _this;

    _classCallCheck(this, Heading);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Heading).apply(this, arguments));
    _this.resize = _this.resize.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.state = {
      scale: 1,
      height: 16
    };
    return _this;
  }

  _createClass(Heading, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.resize();
      window.addEventListener('load', this.resize);
      window.addEventListener('resize', this.resize);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.fit !== this.props.fit) {
        this.resize();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('load', this.resize);
      window.removeEventListener('resize', this.resize);
    }
  }, {
    key: "resize",
    value: function resize() {
      if (this.props.fit) {
        var text = this.textRef;
        var container = this.containerRef;
        text.style.display = 'inline-block';
        var scale = container.offsetWidth / text.offsetWidth || 0;
        var height = text.offsetHeight * scale || 0;
        text.style.display = 'block';
        this.setState({
          scale: scale,
          height: height
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          size = _this$props.size,
          lineHeight = _this$props.lineHeight,
          fit = _this$props.fit,
          style = _this$props.style,
          children = _this$props.children;

      if (size > 6) {
        throw new Error('Heading size must be between 1 and 6');
      }

      var Tag = "h".concat(size);
      var typefaceStyle = this.context.typeface || {};

      if (fit) {
        return React.createElement(StyledHeader, {
          className: this.props.className,
          innerRef: function innerRef(c) {
            _this2.containerRef = c;
          },
          height: this.state.height,
          styles: {
            context: this.context.styles.components.heading["h".concat(size)],
            base: getStyles.call(this)
          }
        }, createElement(dynamicStyledFitHeaders[Tag], {
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

      return createElement(dynamicStyledHeaders[Tag], {
        className: this.props.className,
        lineHeight: lineHeight,
        styles: {
          context: this.context.styles.components.heading["h".concat(size)],
          base: getStyles.call(this),
          user: style,
          typeface: typefaceStyle
        }
      }, children);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      return nextProps.fit !== prevState.fit ? {
        fit: nextProps.fit
      } : null;
    }
  }]);

  return Heading;
}(Component);

export { Heading as default };
Heading.defaultProps = {
  size: 1,
  lineHeight: 1
};
Heading.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  fit: PropTypes.bool,
  lineHeight: PropTypes.number,
  size: PropTypes.number,
  style: PropTypes.object
};
Heading.contextTypes = {
  styles: PropTypes.object,
  store: PropTypes.object,
  typeface: PropTypes.object
};