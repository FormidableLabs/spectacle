"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.getBulletStyle = exports.bulletStyles = void 0;

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

var bulletStyles = {
  star: '\\2605',
  classicCheck: '\\2713',
  greenCheck: '\\2705',
  arrow: '\\219d',
  cross: '\\274C'
};
exports.bulletStyles = bulletStyles;

var getBulletStyle = function getBulletStyle(bulletStyle, isListItemStyle) {
  if (bulletStyle) {
    var content = bulletStyles[bulletStyle] || "\\".concat(bulletStyle);
    return [{
      listStyleType: 'none'
    }, "".concat(isListItemStyle ? '&' : 'li', "::before {\n          content: '").concat(content, "' ").concat(isListItemStyle ? '!important' : '', ";\n          display: inline-block;\n          margin-right: 40px;\n          width: 20px;\n          font-size: 20px;\n          text-align: center;\n          vertical-align: middle;\n        }")];
  }

  return [];
};

exports.getBulletStyle = getBulletStyle;
var StyledOrderedList =
/*#__PURE__*/
(0, _reactEmotion.default)("ol", {
  target: "e8ukz1v0"
})(function (props) {
  return props.styles;
});
var StyledList =
/*#__PURE__*/
(0, _reactEmotion.default)("ul", {
  target: "e8ukz1v1"
})(function (props) {
  return props.styles;
});

var List =
/*#__PURE__*/
function (_Component) {
  _inherits(List, _Component);

  function List() {
    _classCallCheck(this, List);

    return _possibleConstructorReturn(this, _getPrototypeOf(List).apply(this, arguments));
  }

  _createClass(List, [{
    key: "render",
    value: function render() {
      return this.props.ordered ? _react.default.createElement(StyledOrderedList, {
        reversed: this.props.reversed,
        start: this.props.start,
        type: this.props.type,
        className: this.props.className,
        styles: [this.context.styles.components.list, _base.getStyles.call(this), this.props.style]
      }, this.props.children) : _react.default.createElement(StyledList, {
        className: this.props.className,
        styles: [this.context.styles.components.list, _base.getStyles.call(this), this.props.style, getBulletStyle(this.props.bulletStyle, false)]
      }, this.props.children);
    }
  }]);

  return List;
}(_react.Component);

exports.default = List;
List.propTypes = {
  bulletStyle: _propTypes.default.string,
  children: _propTypes.default.node,
  className: _propTypes.default.string,
  ordered: _propTypes.default.bool,
  reversed: _propTypes.default.bool,
  start: _propTypes.default.number,
  style: _propTypes.default.object,
  type: _propTypes.default.string
};
List.defaultProps = {
  ordered: false,
  reversed: false,
  start: 1,
  type: '1'
};
List.contextTypes = {
  styles: _propTypes.default.object,
  store: _propTypes.default.object
};