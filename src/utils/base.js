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
};

export const transformBgSize = ({ bgImage, bgSize }) => {
  if (bgImage) {
    return { backgroundSize: bgSize || 'cover' };
  }
};

export const transformBgImageByGradient = ({ bgGradient }) => {
  return { backgroundImage: bgGradient };
};

export const transformBgPosition = ({ bgImage, bgPosition }) => {
  if (bgImage) {
    return { backgroundPosition: bgPosition || 'center center' };
  }
};
export const transformBgRepeat = ({ bgImage, bgRepeat }) => {
  if (bgImage) {
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
  if (!bgImage && !bgImageStyle && !bgGradient) {
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

export const generalTransforms = [
  applyMargin,
  applyPadding,
  applyOverflow,
  applyHeight
];

export const bgTransforms = [
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
