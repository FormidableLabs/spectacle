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

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _base = require('../utils/base');

var _reactEmotion = require('react-emotion');

var _reactEmotion2 = _interopRequireDefault(_reactEmotion);

require('../utils/prism-import');

var _reactLive = require('react-live');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StyledWrapper = /*#__PURE__*/(0, _reactEmotion2.default)('div')(function (props) {
  return props.styles;
});
var StyledEditor = /*#__PURE__*/(0, _reactEmotion2.default)(function (_ref) {
  var _ = _ref.syntaxStyles,
      __ = _ref.prismTheme,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['syntaxStyles', 'prismTheme']);
  return _react2.default.createElement(_reactLive.Editor, rest);
}, {
  target: 'css-digdla0'
})('&&{', function (props) {
  return props.syntaxStyles;
}, '}', function (props) {
  return props.prismTheme;
});

var CodePane = function (_Component) {
  (0, _inherits3.default)(CodePane, _Component);

  function CodePane() {
    (0, _classCallCheck3.default)(this, CodePane);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  CodePane.prototype.handleEditorEvent = function handleEditorEvent(evt) {
    evt.stopPropagation();
  };

  CodePane.prototype.render = function render() {
    var useDarkTheme = this.props.theme === 'dark';

    var wrapperStyles = [this.context.styles.components.codePane, _base.getStyles.call(this), this.props.style];

    return (0, _jsx3.default)(StyledWrapper, {
      className: this.props.className,
      styles: wrapperStyles
    }, void 0, (0, _jsx3.default)(StyledEditor, {
      className: 'language-prism',
      code: this.props.source,
      language: this.props.lang,
      contentEditable: this.props.contentEditable,
      syntaxStyles: this.context.styles.components.syntax,
      prismTheme: this.context.styles.prism[useDarkTheme ? 'dark' : 'light'],
      onKeyDown: this.handleEditorEvent,
      onKeyUp: this.handleEditorEvent,
      onClick: this.handleEditorEvent
    }));
  };

  return CodePane;
}(_react.Component);

exports.default = CodePane;


CodePane.contextTypes = {
  styles: _propTypes2.default.object,
  store: _propTypes2.default.object
};

CodePane.defaultProps = {
  theme: 'dark',
  className: '',
  contentEditable: false,
  lang: 'markup',
  source: ''
};