'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*eslint max-statements:0,complexity:0,no-invalid-this:0*/

var parseFontSize = function parseFontSize(fontSize) {
  var sizeComponents = fontSize.match(/\d*\.*\d+|\D+/g);
  var size = parseFloat(sizeComponents[0]);
  var unit = sizeComponents[1];
  return { size: size, unit: unit };
};

var getFontSizeFromElement = function getFontSizeFromElement(element) {
  var fontSize = window.getComputedStyle ? window.getComputedStyle(element).getPropertyValue('font-size') : element.currentStyle.fontSize;
  return fontSize ? parseFontSize(fontSize) : null;
};

var convertFontSizeToPx = function convertFontSizeToPx(fontSize) {
  var convertedFontSize = void 0;

  if (typeof textSize === 'number') {
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

var getStyles = exports.getStyles = function getStyles() {
  if (process.env.NODE_ENV !== 'production' && typeof this.warnedAboutFontSize === 'undefined') {
    this.warnedAboutFontSize = false;
  }

  var _props = this.props,
      italic = _props.italic,
      bold = _props.bold,
      caps = _props.caps,
      margin = _props.margin,
      padding = _props.padding,
      textColor = _props.textColor,
      textFont = _props.textFont,
      textSize = _props.textSize,
      textAlign = _props.textAlign,
      bgColor = _props.bgColor,
      bgImage = _props.bgImage,
      bgDarken = _props.bgDarken,
      bgSize = _props.bgSize,
      bgPosition = _props.bgPosition,
      bgRepeat = _props.bgRepeat,
      overflow = _props.overflow,
      height = _props.height;


  var styles = {};
  var recommendedMinFontSizePx = 24;

  if (typeof italic === 'boolean') {
    styles.fontStyle = italic ? 'italic' : 'normal';
  }
  if (typeof bold === 'boolean') {
    styles.fontWeight = bold ? 'bold' : 'normal';
  }
  if (typeof caps === 'boolean') {
    styles.textTransform = caps ? 'uppercase' : 'none';
  }
  if (margin) {
    styles.margin = margin;
  }
  if (padding) {
    styles.padding = padding;
  }
  if (textColor) {
    var color = '';
    if (!this.context.styles.colors.hasOwnProperty(textColor)) {
      color = textColor;
    } else {
      color = this.context.styles.colors[textColor];
    }
    styles.color = color;
  }
  if (textFont) {
    var font = '';
    if (!this.context.styles.fonts.hasOwnProperty(textFont)) {
      font = textFont;
    } else {
      font = this.context.styles.fonts[textFont];
    }
    styles.fontFamily = font;
  }
  if (textSize) {
    styles.fontSize = textSize;
    if (process.env.NODE_ENV !== 'production' && !this.warnedAboutFontSize && this.context.store.getState().style.globalStyleSet) {
      var fontSize = convertFontSizeToPx(textSize) || recommendedMinFontSizePx;
      if (fontSize < recommendedMinFontSizePx) {
        console.warn('prop `textSize="' + textSize + '"` is below the recommended minimum of ' + recommendedMinFontSizePx + 'px'); // eslint-disable-line
        this.warnedAboutFontSize = true;
      }
    }
  }
  if (textAlign) {
    styles.textAlign = textAlign;
  }
  if (bgColor) {
    var _color = '';
    if (!this.context.styles.colors.hasOwnProperty(bgColor)) {
      _color = bgColor;
    } else {
      _color = this.context.styles.colors[bgColor];
    }
    styles.backgroundColor = _color;
  }
  if (bgImage) {
    if (bgDarken) {
      styles.backgroundImage = 'linear-gradient( rgba(0, 0, 0, ' + bgDarken + '), rgba(0, 0, 0, ' + bgDarken + ') ), url(' + bgImage + ')';
    } else {
      styles.backgroundImage = 'url(' + bgImage + ')';
    }
    styles.backgroundSize = bgSize || 'cover';
    styles.backgroundPosition = bgPosition || 'center center';
    if (bgRepeat) {
      styles.backgroundRepeat = bgRepeat;
    }
  }
  if (overflow) {
    styles.overflow = overflow;
  }
  if (height) {
    styles.height = height;
  }
  return styles;
};