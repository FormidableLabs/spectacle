'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactEmotion = require('react-emotion');

var _reactEmotion2 = _interopRequireDefault(_reactEmotion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Button = /*#__PURE__*/(0, _reactEmotion2.default)('button', {
  target: 'css-cqeuyf0'
})('display:inline-block;appearance:none;background:none;border:none;outline:0;color:inherit;padding:0;cursor:pointer;> svg{height:1.5em;width:1.5em;}');

var _ref = (0, _jsx3.default)('svg', {
  viewBox: '0 0 24 24'
}, void 0, (0, _jsx3.default)('path', {
  d: 'M0 0h24v24H0z',
  fill: 'none'
}), (0, _jsx3.default)('path', {
  d: 'M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z',
  fill: 'currentColor'
}));

var FullscreenButton = function FullscreenButton(props) {
  return _react2.default.createElement(
    Button,
    props,
    _ref
  );
};

exports.default = FullscreenButton;