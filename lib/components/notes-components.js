"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WithNotesSlide = exports.WithNotesContainer = exports.SlideWrapper = exports.NotesWrapper = void 0;

var _reactEmotion = _interopRequireDefault(require("react-emotion"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NotesWrapper =
/*#__PURE__*/
(0, _reactEmotion.default)("div", {
  target: "e15tkt8o0"
})("background-color:white;display:flex;justify-content:center;flex:1 0 auto;width:100%;bottom:0;left:0;right:0;padding:20px;");
exports.NotesWrapper = NotesWrapper;
var SlideWrapper =
/*#__PURE__*/
(0, _reactEmotion.default)("div", {
  target: "e15tkt8o1"
})("width:100%;height:100%;position:relative;");
exports.SlideWrapper = SlideWrapper;
var WithNotesContainer =
/*#__PURE__*/
(0, _reactEmotion.default)("div", {
  target: "e15tkt8o2"
})("height:100%;width:100%;background-color:white;display:flex;flex-direction:column;justify-content:center;align-self:center;padding:30px;");
exports.WithNotesContainer = WithNotesContainer;
var WithNotesSlide =
/*#__PURE__*/
(0, _reactEmotion.default)("div", {
  target: "e15tkt8o3"
})("width:100%;flex:1 1 70%;");
exports.WithNotesSlide = WithNotesSlide;