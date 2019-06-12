"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertFontSizeToPx = exports.getFontSizeFromElement = exports.parseFontSize = void 0;

var parseFontSize = function parseFontSize(fontSize) {
  var sizeComponents = fontSize.match(/\d*\.*\d+|\D+/g);
  var size = parseFloat(sizeComponents[0]);
  var unit = sizeComponents[1];
  return {
    size: size,
    unit: unit
  };
};

exports.parseFontSize = parseFontSize;

var getFontSizeFromElement = function getFontSizeFromElement(element) {
  var fontSize = window.getComputedStyle ? window.getComputedStyle(element).getPropertyValue('font-size') : element.currentStyle.fontSize;
  return fontSize ? parseFontSize(fontSize) : null;
};

exports.getFontSizeFromElement = getFontSizeFromElement;

var convertFontSizeToPx = function convertFontSizeToPx(fontSize) {
  var convertedFontSize;

  if (typeof fontSize === 'number') {
    convertedFontSize = fontSize;
  } else if (typeof fontSize === 'string') {
    var parsedFont = parseFontSize(fontSize);
    var bodyFont = getFontSizeFromElement(document.body);
    var htmlFont = getFontSizeFromElement(document.documentElement);

    switch (parsedFont.unit) {
      case 'px':
        convertedFontSize = parsedFont.size;
        break;

      case 'pt':
        convertedFontSize = parsedFont.size * 96 / 72;
        break;

      case '%':
        if (bodyFont) {
          convertedFontSize = bodyFont.size * parsedFont.size / 100;
        }

        break;

      case 'em':
        if (bodyFont) {
          convertedFontSize = bodyFont.size * parsedFont.size;
        }

        break;

      case 'rem':
        if (htmlFont) {
          convertedFontSize = htmlFont.size * parsedFont.size;
        }

        break;
    }
  }

  return convertedFontSize;
};

exports.convertFontSizeToPx = convertFontSizeToPx;