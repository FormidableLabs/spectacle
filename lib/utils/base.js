"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformTextSize = transformTextSize;
exports.getStyles = exports.bgTransforms = exports.generalTransforms = exports.transformBgImage = exports.transformBgImageByBgStyle = exports.transformBgRepeat = exports.transformBgPosition = exports.transformBgImageByGradient = exports.transformBgSize = exports.transformBgColor = exports.transformCaps = exports.transformBold = exports.transformItalic = exports.transformTextAlign = exports.transformTextFont = exports.transformTextColor = exports.buildStyles = void 0;

var _warn = _interopRequireDefault(require("./warn"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// eslint-disable-next-line max-params
var buildStyles = function buildStyles(transforms, props, context) {
  var styles = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  return transforms.reduce(function (av, cv) {
    return _objectSpread({}, av, cv(props, context, av));
  }, styles);
};

exports.buildStyles = buildStyles;

var applyMargin = function applyMargin(_ref) {
  var margin = _ref.margin;
  return margin ? {
    margin: margin
  } : undefined;
};

var applyPadding = function applyPadding(_ref2) {
  var padding = _ref2.padding;
  return padding ? {
    padding: padding
  } : undefined;
};

var applyOverflow = function applyOverflow(_ref3) {
  var overflow = _ref3.overflow;
  return overflow ? {
    overflow: overflow
  } : undefined;
};

var applyHeight = function applyHeight(_ref4) {
  var height = _ref4.height;
  return height ? {
    height: height
  } : undefined;
};

var transformTextColor = function transformTextColor(_ref5, context) {
  var textColor = _ref5.textColor;

  if (textColor) {
    var color = '';

    if (!context.styles.colors.hasOwnProperty(textColor)) {
      color = textColor;
    } else {
      color = context.styles.colors[textColor];
    }

    return {
      color: color
    };
  }
};

exports.transformTextColor = transformTextColor;

var transformTextFont = function transformTextFont(_ref6, context) {
  var textFont = _ref6.textFont;

  if (textFont) {
    var fontFamily = '';

    if (!context.styles.fonts.hasOwnProperty(textFont)) {
      fontFamily = textFont;
    } else {
      fontFamily = context.styles.fonts[textFont];
    }

    return {
      fontFamily: fontFamily
    };
  }
};

exports.transformTextFont = transformTextFont;

var transformTextAlign = function transformTextAlign(_ref7) {
  var textAlign = _ref7.textAlign;

  if (textAlign) {
    return {
      textAlign: textAlign
    };
  }
};

exports.transformTextAlign = transformTextAlign;

function transformTextSize(_ref8) {
  var textSize = _ref8.textSize;

  if (textSize) {
    return {
      fontSize: textSize
    };
  }
}

var transformItalic = function transformItalic(_ref9) {
  var italic = _ref9.italic;

  if (typeof italic === 'boolean') {
    return {
      fontStyle: italic ? 'italic' : 'normal'
    };
  }
};

exports.transformItalic = transformItalic;

var transformBold = function transformBold(_ref10) {
  var bold = _ref10.bold;

  if (typeof bold === 'boolean') {
    return {
      fontWeight: bold ? 'bold' : 'normal'
    };
  }
};

exports.transformBold = transformBold;

var transformCaps = function transformCaps(_ref11) {
  var caps = _ref11.caps;

  if (typeof caps === 'boolean') {
    return {
      textTransform: caps ? 'uppercase' : 'none'
    };
  }
};

exports.transformCaps = transformCaps;

var transformBgColor = function transformBgColor(_ref12, context) {
  var bgColor = _ref12.bgColor;

  if (bgColor) {
    var backgroundColor = '';

    if (!context.styles.colors.hasOwnProperty(bgColor)) {
      backgroundColor = bgColor;
    } else {
      backgroundColor = context.styles.colors[bgColor];
    }

    return {
      backgroundColor: backgroundColor
    };
  }
};

exports.transformBgColor = transformBgColor;

var transformBgSize = function transformBgSize(_ref13) {
  var bgImage = _ref13.bgImage,
      bgSize = _ref13.bgSize;

  if (bgImage) {
    return {
      backgroundSize: bgSize || 'cover'
    };
  }
};

exports.transformBgSize = transformBgSize;

var transformBgImageByGradient = function transformBgImageByGradient(_ref14) {
  var bgGradient = _ref14.bgGradient;
  return {
    backgroundImage: bgGradient
  };
};

exports.transformBgImageByGradient = transformBgImageByGradient;

var transformBgPosition = function transformBgPosition(_ref15) {
  var bgImage = _ref15.bgImage,
      bgPosition = _ref15.bgPosition;

  if (bgImage) {
    return {
      backgroundPosition: bgPosition || 'center center'
    };
  }
};

exports.transformBgPosition = transformBgPosition;

var transformBgRepeat = function transformBgRepeat(_ref16) {
  var bgImage = _ref16.bgImage,
      bgRepeat = _ref16.bgRepeat;

  if (bgImage) {
    return {
      backgroundRepeat: bgRepeat
    };
  }
};

exports.transformBgRepeat = transformBgRepeat;

var transformBgImageByBgStyle = function transformBgImageByBgStyle(_ref17) {
  var bgImageStyle = _ref17.bgImageStyle;
  return {
    backgroundImage: bgImageStyle
  };
};

exports.transformBgImageByBgStyle = transformBgImageByBgStyle;

var transformBgImage = function transformBgImage(_ref18) {
  var bgImage = _ref18.bgImage,
      bgDarken = _ref18.bgDarken,
      bgLighten = _ref18.bgLighten,
      bgImageStyle = _ref18.bgImageStyle,
      bgGradient = _ref18.bgGradient;

  if (!bgImage && !bgImageStyle && !bgGradient) {
    return;
  }

  if (bgImageStyle) {
    return transformBgImageByBgStyle({
      bgImageStyle: bgImageStyle
    });
  }

  if (bgGradient) {
    return transformBgImageByGradient({
      bgGradient: bgGradient
    });
  }

  if (bgDarken) {
    return {
      backgroundImage: "linear-gradient( rgba(0, 0, 0, ".concat(bgDarken, "), rgba(0, 0, 0, ").concat(bgDarken, ") ), url(").concat(bgImage, ")")
    };
  } else if (bgLighten) {
    return {
      backgroundImage: "linear-gradient( rgba(255, 255, 255, ".concat(bgLighten, "), rgba(255, 255, 255, ").concat(bgLighten, ") ), url(").concat(bgImage, ")")
    };
  } else {
    return {
      backgroundImage: "url(".concat(bgImage, ")")
    };
  }
};

exports.transformBgImage = transformBgImage;
var textTransforms = [transformItalic, transformBold, transformCaps, transformTextColor, transformTextFont, transformTextAlign, transformTextSize];
var generalTransforms = [applyMargin, applyPadding, applyOverflow, applyHeight];
exports.generalTransforms = generalTransforms;
var bgTransforms = [transformBgColor, transformBgImage, transformBgRepeat, transformBgSize, transformBgPosition];
exports.bgTransforms = bgTransforms;
var styleTransforms = [].concat(textTransforms, generalTransforms, bgTransforms);

var getStyles = function getStyles() {
  if (process.env.NODE_ENV !== 'production') {
    (0, _warn.default)(this);
  }

  return buildStyles(styleTransforms, this.props, this.context);
};

exports.getStyles = getStyles;