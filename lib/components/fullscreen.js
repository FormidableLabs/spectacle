'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Fullscreen = undefined;

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

var _reactEmotion = require('react-emotion');

var _reactEmotion2 = _interopRequireDefault(_reactEmotion);

var _fullscreenButton = require('./fullscreen-button');

var _fullscreenButton2 = _interopRequireDefault(_fullscreenButton);

var _fullscreen = require('../utils/fullscreen');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StyledFullscreen = /*#__PURE__*/(0, _reactEmotion2.default)(_fullscreenButton2.default, {
  target: 'css-1hvb8ia0'
})('position:absolute;bottom:10px;right:20px;opacity:0;transition:300ms opacity ease;font-size:30px;color:#fff;&:hover{opacity:1;}');

var Fullscreen = exports.Fullscreen = function (_Component) {
  (0, _inherits3.default)(Fullscreen, _Component);

  function Fullscreen() {
    (0, _classCallCheck3.default)(this, Fullscreen);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  Fullscreen.prototype.toggleFullscreen = function toggleFullscreen() {
    if (!(0, _fullscreen.getFullscreenElement)()) {
      (0, _fullscreen.requestFullscreen)(document.documentElement);
    } else {
      (0, _fullscreen.exitFullscreen)();
    }
  };

  Fullscreen.prototype.render = function render() {
    var _this2 = this;

    return (0, _jsx3.default)(StyledFullscreen, {
      onClick: function onClick() {
        return _this2.toggleFullscreen();
      },
      style: this.context.styles.fullscreen,
      viewBox: '0 0 512 512'
    });
  };

  return Fullscreen;
}(_react.Component);

Fullscreen.contextTypes = {
  styles: _propTypes2.default.object
};

exports.default = Fullscreen;