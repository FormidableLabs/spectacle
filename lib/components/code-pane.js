"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _base = require("../utils/base");

var _reactEmotion = _interopRequireDefault(require("react-emotion"));

require("../utils/prism-import");

var _reactLive = require("react-live");

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

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var StyledWrapper =
/*#__PURE__*/
(0, _reactEmotion.default)("div", {
  target: "ep9ila60"
})(function (props) {
  return props.styles;
});
var StyledEditor =
/*#__PURE__*/
(0, _reactEmotion.default)(function (_ref) {
  var _ = _ref.syntaxStyles,
      __ = _ref.prismTheme,
      rest = _objectWithoutProperties(_ref, ["syntaxStyles", "prismTheme"]);

  return _react.default.createElement(_reactLive.Editor, rest);
}, {
  target: "ep9ila61"
})("&&{", function (props) {
  return props.syntaxStyles;
}, " &.builtin-prism-theme{", function (props) {
  return props.prismTheme;
}, ";}}");

var CodePane =
/*#__PURE__*/
function (_Component) {
  _inherits(CodePane, _Component);

  function CodePane() {
    _classCallCheck(this, CodePane);

    return _possibleConstructorReturn(this, _getPrototypeOf(CodePane).apply(this, arguments));
  }

  _createClass(CodePane, [{
    key: "handleEditorEvent",
    value: function handleEditorEvent(evt) {
      evt.stopPropagation();
    }
  }, {
    key: "render",
    value: function render() {
      var useDarkTheme = this.props.theme === 'dark';
      var externalPrismTheme = this.props.theme === 'external';
      var className = "language-".concat(this.props.lang, " ").concat(externalPrismTheme ? '' : 'builtin-prism-theme', " ").concat(this.props.className);
      var wrapperStyles = [this.context.styles.components.codePane, _base.getStyles.call(this), this.props.style];
      return _react.default.createElement(StyledWrapper, {
        className: this.props.className,
        styles: wrapperStyles
      }, _react.default.createElement(StyledEditor, {
        className: className,
        code: this.props.source,
        language: this.props.lang,
        contentEditable: this.props.contentEditable,
        syntaxStyles: this.context.styles.components.syntax,
        prismTheme: this.context.styles.prism[useDarkTheme ? 'dark' : 'light'],
        onKeyDown: this.handleEditorEvent,
        onKeyUp: this.handleEditorEvent,
        onClick: this.handleEditorEvent
      }));
    }
  }]);

  return CodePane;
}(_react.Component);

exports.default = CodePane;
CodePane.contextTypes = {
  styles: _propTypes.default.object,
  store: _propTypes.default.object
};
CodePane.propTypes = {
  children: _propTypes.default.node,
  className: _propTypes.default.string,
  contentEditable: _propTypes.default.bool,
  lang: _propTypes.default.string,
  source: _propTypes.default.string,
  style: _propTypes.default.object,
  theme: _propTypes.default.oneOf(['dark', 'light', 'external'])
};
CodePane.defaultProps = {
  className: '',
  contentEditable: false,
  lang: 'markup',
  source: '',
  theme: 'dark'
};