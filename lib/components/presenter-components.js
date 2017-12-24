'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SlideInfo = exports.Notes = exports.HeaderContainer = exports.PreviewNextSlide = exports.PreviewCurrentSlide = exports.PreviewPane = exports.PresenterContent = exports.EndHeader = exports.ContentContainer = undefined;

var _reactEmotion = require('react-emotion');

var _reactEmotion2 = _interopRequireDefault(_reactEmotion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ContentContainer = /*#__PURE__*/exports.ContentContainer = (0, _reactEmotion2.default)('div', {
  target: 'css-1ngit030'
})('display:flex;flex:1;padding:10px 50px 0;');

var EndHeader = /*#__PURE__*/exports.EndHeader = (0, _reactEmotion2.default)('h1', {
  target: 'css-1ngit031'
})('color:#fff;display:flex;margin:0;');

var PresenterContent = /*#__PURE__*/exports.PresenterContent = (0, _reactEmotion2.default)('div', {
  target: 'css-1ngit032'
})('display:flex;flex:1;flex-direction:column;height:100%;width:100%;');

var PreviewPane = /*#__PURE__*/exports.PreviewPane = (0, _reactEmotion2.default)('div', {
  target: 'css-1ngit033'
})('display:flex;flex:1;flex-wrap:wrap;height:90%;justify-content:center;position:absolute;top:10%;width:60%;');

var PreviewCurrentSlide = /*#__PURE__*/exports.PreviewCurrentSlide = (0, _reactEmotion2.default)('div', {
  target: 'css-1ngit034'
})('border:2px #fff solid;display:flex;flex:0 0 100%;height:55%;width:55%;padding:20px;');

var PreviewNextSlide = /*#__PURE__*/exports.PreviewNextSlide = (0, _reactEmotion2.default)('div', {
  target: 'css-1ngit035'
})('align-items:center;display:flex;flex:0 0 68.75%;height:40%;justify-content:center;opacity:0.4;');

var HeaderContainer = /*#__PURE__*/exports.HeaderContainer = (0, _reactEmotion2.default)('div', {
  target: 'css-1ngit036'
})('position:absolute;display:block;color:#fff;width:100%;height:10%;text-align:center;padding:10px 50px;');

var Notes = /*#__PURE__*/exports.Notes = (0, _reactEmotion2.default)('div', {
  target: 'css-1ngit037'
})('color:#fff;display:block;height:90%;left:calc(60% + 50px);padding:10px 30px;position:absolute;top:10%;width:(40% - 100px);overflow:auto;');

var SlideInfo = /*#__PURE__*/exports.SlideInfo = (0, _reactEmotion2.default)('h2', {
  target: 'css-1ngit038'
})('position:relative;top:50%;transform:translateY(-50%);float:left;margin:0;line-height:1;display:inline-block;fontSize:28px;');