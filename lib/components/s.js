"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _base = require("../utils/base");

var _reactEmotion = _interopRequireDefault(require("react-emotion"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var textDecoration = function textDecoration(type) {
  if (type.indexOf('strikethrough') !== -1) {
    return 'line-through';
  } else if (type.indexOf('underline') !== -1) {
    return 'underline';
  }

  return 'none';
};

var StyledS =
/*#__PURE__*/
(0, _reactEmotion.default)("span", {
  target: "et9fpyj0"
})(function (_ref) {
  var type = _ref.type,
      styles = _ref.styles;
  return [{
    textDecoration: textDecoration(type),
    fontWeight: type.indexOf('bold') !== -1 ? 'bold' : 'normal',
    fontStyle: type.indexOf('italic') !== -1 ? 'italic' : 'normal'
  }, styles.context, styles.base, styles.user];
});

var S =
/*#__PURE__*/
function (_Component) {
  _inherits(S, _Component);

  function S() {
    _classCallCheck(this, S);

    return _possibleConstructorReturn(this, _getPrototypeOf(S).apply(this, arguments));
  }

  _createClass(S, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          type = _this$props.type,
          style = _this$props.style,
          children = _this$props.children;
      return _react.default.createElement(StyledS, {
        className: this.props.className,
        type: type,
        styles: {
          context: this.context.styles.components.s[type],
          base: _base.getStyles.call(this),
          user: style
        }
      }, children);
    }
  }]);

  return S;
}(_react.Component);

exports.default = S;
S.propTypes = {
  children: _propTypes.default.node,
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  type: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.array])
};
S.contextTypes = {
  styles: _propTypes.default.object,
  store: _propTypes.default.object
};