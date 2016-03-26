/*eslint max-statements:0,complexity:0,no-invalid-this:0*/

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
    bgRepeat
  } = this.props;

  const styles = {};

  if (typeof italic === "boolean") {
    styles.fontStyle = italic ? "italic" : "normal";
  }
  if (typeof bold === "boolean") {
    styles.fontWeight = bold ? "bold" : "normal";
  }
  if (typeof caps === "boolean") {
    styles.textTransform = caps ? "uppercase" : "none";
  }
  if (margin) {
    styles.margin = margin;
  }
  if (padding) {
    styles.padding = padding;
  }
  if (textColor) {
    let color = "";
    if (!this.context.styles.colors.hasOwnProperty(textColor)) {
      color = textColor;
    } else {
      color = this.context.styles.colors[textColor];
    }
    styles.color = color;
  }
  if (textFont) {
    let font = "";
    if (!this.context.styles.fonts.hasOwnProperty(textFont)) {
      font = textFont;
    } else {
      font = this.context.styles.fonts[textFont];
    }
    styles.fontFamily = font;
  }
  if (textSize) {
    styles.fontSize = textSize;
  }
  if (textAlign) {
    styles.textAlign = textAlign;
  }
  if (bgColor) {
    let color = "";
    if (!this.context.styles.colors.hasOwnProperty(bgColor)) {
      color = bgColor;
    } else {
      color = this.context.styles.colors[bgColor];
    }
    styles.backgroundColor = color;
  }
  if (bgImage) {
    if (bgDarken) {
      styles.backgroundImage =
      `linear-gradient( rgba(0, 0, 0, ${bgDarken}), rgba(0, 0, 0, ${bgDarken}) ), url(${bgImage})`;
    } else {
      styles.backgroundImage = `url(${bgImage})`;
    }
    styles.backgroundSize = bgSize || "cover";
    styles.backgroundPosition = bgPosition || "center center";
    if (bgRepeat) {
      styles.backgroundRepeat = bgRepeat;
    }
  }
  return styles;
};

