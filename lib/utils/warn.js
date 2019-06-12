"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fontSize = require("./font-size");

var _lodash = require("lodash");

var recommendedMinFontSizePx = 24;

var fontSizeWarning = function fontSizeWarning(component) {
  var props = component.props,
      context = component.context;

  if (context.store && !(0, _lodash.get)(context.store.getState(), 'style.globalStyleSet')) {
    return false;
  }

  var textSize = props.textSize;
  var fontSize = (0, _fontSize.convertFontSizeToPx)(textSize) || recommendedMinFontSizePx;

  if (fontSize < recommendedMinFontSizePx) {
    // eslint-disable-next-line
    console.warn("prop `textSize=\"".concat(textSize, "\"` is below the recommended minimum of ").concat(recommendedMinFontSizePx, "px")); // eslint-disable-line

    return true;
  }

  return false;
};

var bgImageStyleWarning = function bgImageStyleWarning(component) {
  var props = component.props;
  var bgLighten = props.bgLighten,
      bgDarken = props.bgDarken,
      bgImage = props.bgImage,
      bgImageStyle = props.bgImageStyle,
      bgGradient = props.bgGradient;

  if (!bgImageStyle) {
    return false;
  }

  if (bgImageStyle && (bgLighten || bgDarken || bgImage || bgGradient)) {
    // eslint-disable-next-line
    console.warn("The backgroundImage property has been set directly as `bgImageStyle=\"".concat(bgImageStyle, "\"`.\n       Because bgImageStyle sets the backgroundImage to a string, the following \n       properties which modify backgroundImage will not be applied:\n       ").concat(bgLighten ? "bgLighten={".concat(bgLighten, "}") : '', "\n       ").concat(bgDarken ? "bgDarken={".concat(bgDarken, "}") : '', "\n       ").concat(bgImage ? "bgImage={".concat(bgImage, "}}") : '', "\n       ").concat(bgImage ? "bgImage={".concat(bgGradient, "}}") : ''));
    return true;
  }

  return false;
};

var styleWarnings = [bgImageStyleWarning, fontSizeWarning];

function checkWarnings(component) {
  var warnings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : styleWarnings;

  if (!component.warnings) {
    component.warnings = warnings;
  }

  if (component.warnings.length) {
    component.warnings = component.warnings.filter(function (w) {
      return !w(component);
    });
  }
}

var _default = checkWarnings;
exports.default = _default;