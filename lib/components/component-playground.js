'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlaygroundProvider = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactEmotion = require('react-emotion');

var _reactEmotion2 = _interopRequireDefault(_reactEmotion);

var _playground = require('../utils/playground.default-code');

var _fullscreenButton = require('./fullscreen-button');

var _fullscreenButton2 = _interopRequireDefault(_fullscreenButton);

var _fullscreen = require('../utils/fullscreen');

var _reactLive = require('react-live');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PlaygroundProvider = /*#__PURE__*/exports.PlaygroundProvider = (0, _reactEmotion2.default)(_reactLive.LiveProvider, {
  target: 'css-i4nh8x0'
})('border-radius:0 0 6px 6px;height:100%;width:100%;border-radius:6px;overflow:hidden;');

var PlaygroundPreview = /*#__PURE__*/(0, _reactEmotion2.default)(function (_ref) {
  var className = _ref.className;
  return (0, _jsx3.default)(_reactLive.LivePreview, {
    className: className
  });
}, {
  target: 'css-i4nh8x1'
})('padding:0.5rem;min-height:100%;background:', function (p) {
  return p.previewBackgroundColor || '#fff';
}, ';');

var PlaygroundEditor = /*#__PURE__*/(0, _reactEmotion2.default)(function (_ref2) {
  var _ = _ref2.syntaxStyles,
      __ = _ref2.prismTheme,
      rest = (0, _objectWithoutProperties3.default)(_ref2, ['syntaxStyles', 'prismTheme']);
  return _react2.default.createElement(_reactLive.LiveEditor, rest);
}, {
  target: 'css-i4nh8x2'
})('&&{', function (props) {
  return props.syntaxStyles;
}, '\n    min-height:100%;font-size:1.25vw;}', function (props) {
  return props.prismTheme;
});

var PlaygroundRow = /*#__PURE__*/(0, _reactEmotion2.default)('div', {
  target: 'css-i4nh8x3'
})('display:flex;justify-content:stretch;align-items:center;width:100%;/* NOTE:Comma separation doesn\'t seem to work here */\n\n  &:-webkit-full-screen { height: 100%; }\n  &:-moz-full-screen { height: 100%; }\n  &:-ms-fullscreen { height: 100%; }\n  &:fullscreen { height: 100%; }\n\n  &:-webkit-full-screen > * { height: 100%; }\n  &:-moz-full-screen > * { height: 100%; }\n  &:-ms-fullscreen > * { height: 100%; }\n  &:fullscreen > * { height: 100%; }');

var Title = /*#__PURE__*/(0, _reactEmotion2.default)('div', {
  target: 'css-i4nh8x4'
})('position:relative;flex:1;background:#ddd;border-bottom:1px solid #999;color:#424242;display:block;font-family:\'Roboto Mono\',\'Menlo\',\'Andale Mono\',monospace;font-size:1.15vw;padding:0.4rem 0;text-transform:uppercase;&:last-child{border-left:1px solid #999;}> button{position:absolute;right:1em;margin-top:-0.1em;}', function (props) {
  return props.useDarkTheme && /*#__PURE__*/(0, _reactEmotion.css)('background:#272822;border-bottom:1px solid #000;color:#fff;');
});

var PlaygroundColumn = /*#__PURE__*/(0, _reactEmotion2.default)('div', {
  target: 'css-i4nh8x5'
})('flex:1;font-size:1.25vw;margin:0;position:relative;height:60vh;overflow-y:scroll;&:last-child{border-left:1px solid #999;}');

var PlaygroundError = /*#__PURE__*/(0, _reactEmotion2.default)(_reactLive.LiveError, {
  target: 'css-i4nh8x6'
})('position:absolute;bottom:0;width:100%;text-align:left;white-space:pre-wrap;background:rgba(255,35,36,0.8);color:white;padding:0.5rem;');

var STORAGE_KEY = 'spectacle-playground';

var _ref4 = (0, _jsx3.default)(Title, {}, void 0, 'Live Preview');

var _ref5 = (0, _jsx3.default)(PlaygroundError, {});

var ComponentPlayground = function (_Component) {
  (0, _inherits3.default)(ComponentPlayground, _Component);

  function ComponentPlayground(props) {
    (0, _classCallCheck3.default)(this, ComponentPlayground);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.onRef = _this.onRef.bind(_this);
    _this.onEditorChange = _this.onEditorChange.bind(_this);
    _this.requestFullscreen = _this.requestFullscreen.bind(_this);
    _this.syncCode = _this.syncCode.bind(_this);

    _this.state = {
      code: (_this.props.code || _playground.defaultCode).trim()
    };
    return _this;
  }

  ComponentPlayground.prototype.componentDidMount = function componentDidMount() {
    localStorage.setItem(STORAGE_KEY, this.state.code);
    window.addEventListener('storage', this.syncCode);
  };

  ComponentPlayground.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.code !== this.props.code) {
      var code = (this.props.code || _playground.defaultCode).trim();
      this.setState({ code: code });
    }
  };

  ComponentPlayground.prototype.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener('storage', this.syncCode);
  };

  ComponentPlayground.prototype.onKeyUp = function onKeyUp(evt) {
    evt.stopPropagation();

    // Esc: When entering the editor or an input element the default esc-to-exit might not work anymore
    if (evt.keyCode === 27 && (0, _fullscreen.getFullscreenElement)()) {
      (0, _fullscreen.exitFullscreen)();
    }
  };

  ComponentPlayground.prototype.onKeyDown = function onKeyDown(evt) {
    evt.stopPropagation();
  };

  ComponentPlayground.prototype.onRef = function onRef(node) {
    this.node = node;
  };

  ComponentPlayground.prototype.onEditorChange = function onEditorChange(code) {
    this.setState({ code: code });
    localStorage.setItem(STORAGE_KEY, code);
  };

  ComponentPlayground.prototype.requestFullscreen = function requestFullscreen() {
    (0, _fullscreen.requestFullscreen)(this.node);
  };

  ComponentPlayground.prototype.syncCode = function syncCode(_ref3) {
    var key = _ref3.key,
        newValue = _ref3.newValue;

    if (key === STORAGE_KEY) {
      this.setState({ code: newValue });
    }
  };

  ComponentPlayground.prototype.render = function render() {
    var _props = this.props,
        previewBackgroundColor = _props.previewBackgroundColor,
        _props$scope = _props.scope,
        scope = _props$scope === undefined ? {} : _props$scope,
        _props$theme = _props.theme,
        theme = _props$theme === undefined ? 'dark' : _props$theme;


    var useDarkTheme = theme === 'dark';

    return (0, _jsx3.default)(PlaygroundProvider, {
      mountStylesheet: false,
      code: this.state.code,
      scope: (0, _extends3.default)({ Component: _react.Component }, scope),
      noInline: true
    }, void 0, (0, _jsx3.default)(PlaygroundRow, {}, void 0, _ref4, (0, _jsx3.default)(Title, {
      useDarkTheme: useDarkTheme
    }, void 0, 'Source Code', (0, _jsx3.default)(_fullscreenButton2.default, {
      onClick: this.requestFullscreen
    }))), (0, _jsx3.default)(PlaygroundRow, {
      innerRef: this.onRef,
      onKeyUp: this.onKeyUp,
      onKeyDown: this.onKeyDown
    }, void 0, (0, _jsx3.default)(PlaygroundColumn, {}, void 0, (0, _jsx3.default)(PlaygroundPreview, {
      previewBackgroundColor: previewBackgroundColor
    }), _ref5), (0, _jsx3.default)(PlaygroundColumn, {}, void 0, (0, _jsx3.default)(PlaygroundEditor, {
      className: 'language-prism',
      syntaxStyles: this.context.styles.components.syntax,
      prismTheme: this.context.styles.prism[useDarkTheme ? 'dark' : 'light'],
      onChange: this.onEditorChange
    }))));
  };

  return ComponentPlayground;
}(_react.Component);

ComponentPlayground.contextTypes = {
  styles: _propTypes2.default.object,
  store: _propTypes2.default.object
};

exports.default = ComponentPlayground;