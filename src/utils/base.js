/*eslint max-statements:0,complexity:0,no-invalid-this:0*/

const parseFontSize = function(fontSize) {
  const sizeComponents = fontSize.match(/\d*\.*\d+|\D+/g);
  const size = parseFloat(sizeComponents[0]);
  const unit = sizeComponents[1];
  return { size, unit };
};

const getFontSizeFromElement = function(element) {
  const fontSize = window.getComputedStyle
    ? window.getComputedStyle(element).getPropertyValue('font-size')
    : element.currentStyle.fontSize;
  return fontSize ? parseFontSize(fontSize) : null;
};

const convertFontSizeToPx = function(fontSize) {
  let convertedFontSize;

  if (typeof fontSize === 'number') {
    convertedFontSize = fontSize;
  } else if (typeof fontSize === 'string') {
    const parsedFont = parseFontSize(fontSize);
    const bodyFont = getFontSizeFromElement(document.body);
    const htmlFont = getFontSizeFromElement(document.documentElement);

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

// eslint-disable-next-line max-params
const buildStyles = (transforms, props, context, styles = {}) => {
  return transforms.reduce((av, cv) => {
    return {...av, ...cv(props, context, av)}
  }, styles);
};


export const applyMargin = ({margin}) => margin ? {margin} : undefined;
export const applyPadding = ({padding}) => padding ? {padding} : undefined;
export const applyOverflow = ({overflow}) => overflow ? {overflow} : undefined;
export const applyHeight = ({height}) => height ? {height} : undefined;

const generalTransforms = [applyMargin, applyPadding, applyOverflow, applyHeight];

export const transformTextColor = ({textColor}, context) => {
  if (textColor) {
    let color = '';
    if (!context.styles.colors.hasOwnProperty(textColor)) {
      color = textColor;
    } else {
      color = context.styles.colors[textColor];
    }
    return {color};
  }
};

export  const transformTextFont = ({textFont}, context) => {
  if (textFont) {
    let fontFamily = '';
    if (!context.styles.fonts.hasOwnProperty(textFont)) {
      fontFamily = textFont;
    } else {
      fontFamily = context.styles.fonts[textFont];
    }
    return {fontFamily};
  }
};

export const transformTextAlign = ({textAlign}) => {
  if (textAlign) {
    return{textAlign}
  }
};

// const recommendedMinFontSizePx = 24;

export function transformTextSize({textSize}, context) {
  if (textSize) {
    //TODO: split up dev single-time stateful contextual warnings and generic stateless transforms
    // if (
    //   process.env.NODE_ENV !== 'production' &&
    //   !this.warnedAboutFontSize && context.store.getState().style.globalStyleSet
    // ) {
    //   const fontSize = convertFontSizeToPx(textSize) || recommendedMinFontSizePx;
    //
    //   if (fontSize < recommendedMinFontSizePx) {
    //     console.warn(
    //       `prop \`textSize="${textSize}"\` is below the recommended minimum of ${recommendedMinFontSizePx}px`
    //     ); // eslint-disable-line
    //     this.warnedAboutFontSize = true;
    //   }
    // }
    return {fontSize: textSize}
  }
}

export const transformItalic = ({italic}) => {
  if (typeof italic === 'boolean') {
    return  {fontStyle: italic ? 'italic' : 'normal'}
  }
};
export const transformBold = ({bold}) => {
  if (typeof italic === 'boolean') {
    return  {fontWeight: bold ? 'bold' : 'normal'}
  }
};
export const transformCaps = ({caps}) => {
  if (typeof caps === 'boolean') {
    return {textTransform: caps ? 'uppercase' : 'none'}
  }
};


const textTransforms = [transformItalic, transformBold, transformCaps, transformTextColor,
  transformTextFont, transformTextAlign, transformTextSize];

const transformBgColor = ({bgColor}, context) => {
  if (bgColor) {
    let backgroundColor = '';
    if (!context.styles.colors.hasOwnProperty(bgColor)) {
      backgroundColor = bgColor;
    } else {
      backgroundColor = context.styles.colors[bgColor];
    }
    return {backgroundColor}
  }
};

export const transformBgSize = ({bgSize}) => ({backgroundSize: bgSize || 'cover'});
export const transformBgPosition = ({bgPosition}) => ({backgroundPosition: bgPosition || 'center center'});


export const transformBgRepeat = ({bgImage, bgRepeat}) => {
  if (bgImage && bgRepeat) {
    return {backgroundRepeat: bgRepeat}
  }
};

// transforms that mutate the underlying component object need to be bound locally like:
// const localTransformTextSize = transformTextSize.bind(this);
// But also, creating a new bound function on every invocation for a dev-only warning
// that causes our function with a return value to have one-time side effects
// suggests we want to look at warnings differently

export const transformBgImageByBgStyle = ({bgImage, bgDarken, bgLighten, bgImageStyle}) => {
  //TODO: separate dev warnings from actual functionality
  // if(!this.warnedAboutBgStyle && (process.env.NODE_ENV !== 'production' &&
  //   (bgLighten || bgDarken || bgImage)
  // )) {
  //   console.warn(
  //     `The backgroundImage property has been set as \`bgImageStyle="${bgImageStyle}"\`,
  //       this will override any values which are currently set for the following properties:
  //        ${bgLighten ? `bgLighten={${bgLighten}}` : ''}
  //        ${bgDarken ? `bgDarken={${bgDarken}}` : ''}
  //        ${bgImage ? `bgImage={${bgImage}}}` : ''}`
  //   );
  //   this.warnedAboutBgStyle = true;
  // }
  return {backgroundImage: bgImageStyle}
};


export const transformBgImage = ({bgImage, bgDarken, bgLighten, bgImageStyle}) => {
  if (!bgImage) {
    return;
  }
  
  if (bgImageStyle) {
    return transformBgImageByBgStyle({bgImage, bgDarken, bgLighten, bgImageStyle})
  }
  
  if (bgDarken) {
    return {backgroundImage: `linear-gradient( rgba(0, 0, 0, ${bgDarken}), rgba(0, 0, 0, ${bgDarken}) ), url(${bgImage})`};
  } else if(bgLighten) {
    return {backgroundImage: `linear-gradient( rgba(255, 255, 255, ${bgLighten}), rgba(255, 255, 255, ${bgLighten}) ), url(${bgImage})`};
  } else {
    return {backgroundImage: `url(${bgImage})`};
  }
};

const bgTransforms = [transformBgColor, transformBgImage, transformBgRepeat, transformBgSize, transformBgPosition];

const styleTransforms = [...textTransforms, ...generalTransforms, ...bgTransforms];
export const getStyles = function getStyles() {

  const {
    italic,
    bold,
    caps,
    margin,
    padding,
    textColor,
    textFont,
    textSize,
    textAlign,
    bgColor,
    bgImage,
    bgDarken,
    bgSize,
    bgPosition,
    bgRepeat,
    overflow,
    height
  } = this.props;
  
  return buildStyles(styleTransforms, this.props, this.context)
};
