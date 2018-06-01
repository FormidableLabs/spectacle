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

  if (typeof textSize === 'number') {
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

export const getStyles = function getStyles() {
  if (
    process.env.NODE_ENV !== 'production' &&
    typeof this.warnedAboutFontSize === 'undefined'
  ) {
    this.warnedAboutFontSize = false;
  }

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

  const styles = {};
  const recommendedMinFontSizePx = 24;

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
    let color = '';
    if (!this.context.styles.colors.hasOwnProperty(textColor)) {
      color = textColor;
    } else {
      color = this.context.styles.colors[textColor];
    }
    styles.color = color;
  }
  if (textFont) {
    let font = '';
    if (!this.context.styles.fonts.hasOwnProperty(textFont)) {
      font = textFont;
    } else {
      font = this.context.styles.fonts[textFont];
    }
    styles.fontFamily = font;
  }
  if (textSize) {
    styles.fontSize = textSize;
    if (
      process.env.NODE_ENV !== 'production' &&
      !this.warnedAboutFontSize &&
      this.context.store.getState().style.globalStyleSet
    ) {
      const fontSize =
        convertFontSizeToPx(textSize) || recommendedMinFontSizePx;
      if (fontSize < recommendedMinFontSizePx) {
        // eslint-disable-next-line
        console.warn(
          `prop \`textSize="${textSize}"\` is below the recommended minimum of ${recommendedMinFontSizePx}px`
        );
        this.warnedAboutFontSize = true;
      }
    }
  }
  if (textAlign) {
    styles.textAlign = textAlign;
  }
  if (bgColor) {
    let color = '';
    if (!this.context.styles.colors.hasOwnProperty(bgColor)) {
      color = bgColor;
    } else {
      color = this.context.styles.colors[bgColor];
    }
    styles.backgroundColor = color;
  }
  if (bgImage) {
    if (bgDarken) {
      styles.backgroundImage = `linear-gradient( rgba(0, 0, 0, ${bgDarken}), rgba(0, 0, 0, ${bgDarken}) ), url(${bgImage})`;
    } else {
      styles.backgroundImage = `url(${bgImage})`;
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
