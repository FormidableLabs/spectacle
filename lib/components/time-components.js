"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TSingleButton = exports.TButtonContainer = exports.TimeContainer = exports.Clock = void 0;

var _emotion = require("emotion");

var _reactEmotion = _interopRequireDefault(require("react-emotion"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Clock =
/*#__PURE__*/
(0, _reactEmotion.default)("h2", {
  target: "e1fb0qei0"
})("position:relative;top:50%;transform:translateY(-50%);float:right;margin:0;line-height:1;display:inline-block;font-size:28px;");
exports.Clock = Clock;
var TimeContainer =
/*#__PURE__*/
(0, _reactEmotion.default)("div", {
  target: "e1fb0qei1"
})("padding:20px 0;");
exports.TimeContainer = TimeContainer;
var TButtonContainer =
/*#__PURE__*/
(0, _reactEmotion.default)("div", {
  target: "e1fb0qei2"
})("position:relative;float:right;padding-right:20px;-webkit-transform:translateY(-45%);font-size:20.088px;");
exports.TButtonContainer = TButtonContainer;
var fadeIn =
/*#__PURE__*/
(0, _emotion.keyframes)("from{opacity:0;}to{opacity:1;}");
var vanishOut =
/*#__PURE__*/
(0, _emotion.keyframes)("from{opacity:1;transform-origin:50% 50%;transform:scale(1,1);filter:blur(0px);}to{opacity:0;transform-origin:50% 50%;transform:scale(2,2);filter:blur(2px);}");
var TSingleButton =
/*#__PURE__*/
(0, _reactEmotion.default)("button", {
  target: "e1fb0qei3"
})("width:68px;font-size:1em;font-family:'Open Sans Condensed';margin:3px;border:0;border-radius:15px;background:", function (props) {
  if (props.stop) {
    return '#e23d3d';
  } else if (props.start) {
    return '#42a53c';
  } else {
    return '#darkgrey';
  }
}, ";&:focus{outline:0px;}&:active{animation:", vanishOut, " 0.5s;}opacity:0;animation:", fadeIn, " ease-in 1;animation-fill-mode:forwards;animation-duration:0.5s;animation-delay:0s;");
exports.TSingleButton = TSingleButton;