"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SlideContent = exports.SlideContentWrapper = exports.SlideContainer = void 0;

var _reactEmotion = _interopRequireDefault(require("react-emotion"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SlideContainer =
/*#__PURE__*/
(0, _reactEmotion.default)("div", {
  target: "e1s7evq10"
})(function (_ref) {
  var printMode = _ref.printMode,
      exportMode = _ref.exportMode,
      styles = _ref.styles,
      background = _ref.background;
  var printStyles = printMode ? {
    backgroundColor: 'white',
    backgroundImage: 'none'
  } : {};
  var outerStyles = {
    transformOrigin: 'center center',
    position: exportMode ? 'relative' : 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    overflow: 'hidden',
    backgroundColor: background ? background : ''
  };
  return [outerStyles, styles.base, printStyles, styles.presenter];
});
exports.SlideContainer = SlideContainer;
var SlideContentWrapper =
/*#__PURE__*/
(0, _reactEmotion.default)("div", {
  target: "e1s7evq11"
})(function (_ref2) {
  var align = _ref2.align,
      overviewMode = _ref2.overviewMode;
  var innerStyles = {
    display: 'flex',
    position: 'relative',
    flex: 1,
    alignItems: align ? align.split(' ')[1] : 'center',
    justifyContent: align ? align.split(' ')[0] : 'center'
  };
  var overviewStyles = {
    flexDirection: 'column'
  };
  return [innerStyles, overviewMode && overviewStyles];
});
exports.SlideContentWrapper = SlideContentWrapper;
var SlideContent =
/*#__PURE__*/
(0, _reactEmotion.default)("div", {
  target: "e1s7evq12"
})(function (props) {
  var overviewMode = props.overviewMode,
      width = props.width,
      height = props.height,
      styles = props.styles;
  var contentStyles = {
    flex: 1,
    maxHeight: height || 700,
    maxWidth: width || 1000,
    padding: 10
  };
  var overviewStyles = {
    width: '100%'
  };
  return [styles.context, overviewMode && overviewStyles, contentStyles];
});
exports.SlideContent = SlideContent;