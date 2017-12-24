'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TSingleButton = exports.TButtonContainer = exports.TimeContainer = exports.Clock = undefined;

var _emotion = require('emotion');

var _reactEmotion = require('react-emotion');

var _reactEmotion2 = _interopRequireDefault(_reactEmotion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Clock = /*#__PURE__*/exports.Clock = (0, _reactEmotion2.default)('h2', {
  target: 'css-1so0upo0'
})('position:relative;top:50%;transform:translateY(-50%);float:right;margin:0;line-height:1;display:inline-block;font-size:28px;');

var TimeContainer = /*#__PURE__*/exports.TimeContainer = (0, _reactEmotion2.default)('div', {
  target: 'css-1so0upo1'
})('padding:20px 0;');

var TButtonContainer = /*#__PURE__*/exports.TButtonContainer = (0, _reactEmotion2.default)('div', {
  target: 'css-1so0upo2'
})('position:relative;float:right;padding-right:20px;-webkit-transform:translateY(-45%);font-size:20.088px;');

var fadeIn = /*#__PURE__*/(0, _emotion.keyframes)('from{opacity:0;}to{opacity:1;}');

var vanishOut = /*#__PURE__*/(0, _emotion.keyframes)('from{opacity:1;transform-origin:50% 50%;transform:scale(1,1);filter:blur(0px);}to{opacity:0;transform-origin:50% 50%;transform:scale(2,2);filter:blur(2px);}');

var TSingleButton = /*#__PURE__*/exports.TSingleButton = (0, _reactEmotion2.default)('button', {
  target: 'css-1so0upo3'
})('width:68px;font-size:1em;font-family:"Open Sans Condensed";margin:3px;border:0;border-radius:15px;background:', function (props) {
  if (props.stop) {
    return '#e23d3d';
  } else if (props.start) {
    return '#42a53c';
  } else {
    return '#darkgrey';
  }
}, ';&:focus{outline:0px;}&:active{animation:', vanishOut, ' 0.5s;}opacity:0;/* make things invisible upon start */\n  animation:', fadeIn, ' ease-in 1;animation-fill-mode:forwards;animation-duration:0.5s;animation-delay:0s;');