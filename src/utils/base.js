/*eslint max-statements:0,complexity:0,no-invalid-this:0,consistent-return:0*/
import checkWarnings from './warn';
// eslint-disable-next-line max-params
export const buildStyles = (transforms, props, context, styles = {}) => {
  return transforms.reduce((av, cv) => {
    return { ...av, ...cv(props, context, av) };
  }, styles);
};

const applyMargin = ({ margin }) => (margin ? { margin } : undefined);
const applyPadding = ({ padding }) => (padding ? { padding } : undefined);
const applyOverflow = ({ overflow }) => (overflow ? { overflow } : undefined);
const applyHeight = ({ height }) => (height ? { height } : undefined);

export const transformTextColor = ({ textColor }, context) => {
  if (textColor) {
    let color = '';
    if (!context.styles.colors.hasOwnProperty(textColor)) {
      color = textColor;
    } else {
      color = context.styles.colors[textColor];
    }
    return { color };
  }
};

// export const getStyles = function getStyles() {
//   if (
//     process.env.NODE_ENV !== 'production' &&
//     typeof this.warnedAboutFontSize === 'undefined'
//   ) {
//     this.warnedAboutFontSize = false;
//   }
//
//   const {
//     italic,
//     bold,
//     caps,
//     margin,
//     padding,
//     textColor,
//     textFont,
//     textSize,
//     textAlign,
//     bgColor,
//     bgGradient,
//     bgImage,
//     bgDarken,
//     bgSize,
//     bgPosition,
//     bgRepeat,
//     overflow,
//     height
//   } = this.props;
//
//   const styles = {};
//   const recommendedMinFontSizePx = 24;
//
//   if (typeof italic === 'boolean') {
//     styles.fontStyle = italic ? 'italic' : 'normal';
//   }
//   if (typeof bold === 'boolean') {
//     styles.fontWeight = bold ? 'bold' : 'normal';
//   }
//   if (typeof caps === 'boolean') {
//     styles.textTransform = caps ? 'uppercase' : 'none';
//   }
//   if (margin) {
//     styles.margin = margin;
//   }
//   if (padding) {
//     styles.padding = padding;
//   }
// }

// >>>>>>> master
//   if (textColor) {
//     let color = '';
//     if (!context.styles.colors.hasOwnProperty(textColor)) {
//       color = textColor;
//     } else {
//       color = context.styles.colors[textColor];
//     }
//     return { color };
//   }
// };

export const transformTextFont = ({ textFont }, context) => {
  if (textFont) {
    let fontFamily = '';
    if (!context.styles.fonts.hasOwnProperty(textFont)) {
      fontFamily = textFont;
    } else {
      fontFamily = context.styles.fonts[textFont];
    }
    return { fontFamily };
  }
};

export const transformTextAlign = ({ textAlign }) => {
  if (textAlign) {
    return { textAlign };
  }
};
export function transformTextSize({ textSize }) {
  if (textSize) {
    return { fontSize: textSize };
  }
}
export const transformItalic = ({ italic }) => {
  if (typeof italic === 'boolean') {
    return { fontStyle: italic ? 'italic' : 'normal' };
  }
};
export const transformBold = ({ bold }) => {
  if (typeof bold === 'boolean') {
    return { fontWeight: bold ? 'bold' : 'normal' };
  }
};
export const transformCaps = ({ caps }) => {
  if (typeof caps === 'boolean') {
    return { textTransform: caps ? 'uppercase' : 'none' };
  }
};
export const transformBgColor = ({ bgColor }, context) => {
  if (bgColor) {
    let backgroundColor = '';
    if (!context.styles.colors.hasOwnProperty(bgColor)) {
      backgroundColor = bgColor;
    } else {
      backgroundColor = context.styles.colors[bgColor];
    }
    return { backgroundColor };
  }
  // <<<<<<< HEAD
};

export const transformBgSize = ({ bgImage, bgSize }) => {
  if (bgImage && bgSize) {
    return { backgroundSize: bgSize || 'cover' };
  }
};

// let's make sure this works as expected
export const transformBgImageByGradient = ({ bgGradient }) => {
  return { backgroundImage: bgGradient };
};

// // =======
//     if (bgGradient) {
//       styles.backgroundImage = bgGradient;
//     }
//
//     if (bgImage) {
//       if (bgDarken) {
//         styles.backgroundImage = `linear-gradient( rgba(0, 0, 0, ${bgDarken}), rgba(0, 0, 0, ${bgDarken}) ), url(${bgImage})`;
//       } else {
//         styles.backgroundImage = `url(${bgImage})`;
//       }
//       styles.backgroundSize = bgSize || 'cover';
//       styles.backgroundPosition = bgPosition || 'center center';
//       if (bgRepeat) {
//         styles.backgroundRepeat = bgRepeat;
//       }
// // >>>>>>> master
//     }
//   }
//   ;
// }

export const transformBgPosition = ({ bgImage, bgPosition }) => {
  if (bgImage && bgPosition) {
    return { backgroundPosition: bgPosition || 'center center' };
  }
};
export const transformBgRepeat = ({ bgImage, bgRepeat }) => {
  if (bgImage && bgRepeat) {
    return { backgroundRepeat: bgRepeat };
  }
};
export const transformBgImageByBgStyle = ({ bgImageStyle }) => {
  return { backgroundImage: bgImageStyle };
};
export const transformBgImage = ({
  bgImage,
  bgDarken,
  bgLighten,
  bgImageStyle,
  bgGradient
}) => {
  if (!bgImage) {
    return;
  }

  if (bgImageStyle) {
    return transformBgImageByBgStyle({ bgImageStyle });
  }

  if (bgGradient) {
    return transformBgImageByGradient({ bgGradient });
  }

  if (bgDarken) {
    return {
      backgroundImage: `linear-gradient( rgba(0, 0, 0, ${bgDarken}), rgba(0, 0, 0, ${bgDarken}) ), url(${bgImage})`
    };
  } else if (bgLighten) {
    return {
      backgroundImage: `linear-gradient( rgba(255, 255, 255, ${bgLighten}), rgba(255, 255, 255, ${bgLighten}) ), url(${bgImage})`
    };
  } else {
    return { backgroundImage: `url(${bgImage})` };
  }
};

const textTransforms = [
  transformItalic,
  transformBold,
  transformCaps,
  transformTextColor,
  transformTextFont,
  transformTextAlign,
  transformTextSize
];

const generalTransforms = [
  applyMargin,
  applyPadding,
  applyOverflow,
  applyHeight
];

const bgTransforms = [
  transformBgColor,
  transformBgImage,
  transformBgRepeat,
  transformBgSize,
  transformBgPosition
];

const styleTransforms = [
  ...textTransforms,
  ...generalTransforms,
  ...bgTransforms
];

export const getStyles = function getStyles() {
  if (process.env.NODE_ENV !== 'production') {
    checkWarnings(this);
  }

  return buildStyles(styleTransforms, this.props, this.context);
};
