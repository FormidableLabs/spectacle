/*eslint max-statements:0,complexity:0,no-invalid-this:0*/
import { PropTypes } from "react";

// render() { return (<tag style={[..., styleBase(this.props, this.context), ...]}></tag>); }
export const styleBase = function styleBase({
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
  bgDarken
}, {
  styles
}) {
  const style = {};
  if (typeof italic === "boolean") {
    style.fontStyle = italic ? "italic" : "normal";
  }
  if (typeof bold === "boolean") {
    style.fontWeight = bold ? "bold" : "normal";
  }
  if (typeof caps === "boolean") {
    style.textTransform = caps ? "uppercase" : "none";
  }
  if (margin) {
    style.margin = margin;
  }
  if (padding) {
    style.padding = padding;
  }
  if (textColor) {
    let color = "";
    if (!styles.colors.hasOwnProperty(textColor)) {
      color = textColor;
    } else {
      color = styles.colors[textColor];
    }
    style.color = color;
  }
  if (textFont) {
    let font = "";
    if (!styles.fonts.hasOwnProperty(textFont)) {
      font = textFont;
    } else {
      font = styles.fonts[textFont];
    }
    style.fontFamily = font;
  }
  if (textSize) {
    style.fontSize = textSize;
  }
  if (textAlign) {
    style.textAlign = textAlign;
  }
  if (bgColor) {
    let color = "";
    if (!styles.colors.hasOwnProperty(bgColor)) {
      color = bgColor;
    } else {
      color = styles.colors[bgColor];
    }
    style.backgroundColor = color;
  }
  if (bgImage) {
    if (bgDarken) {
      style.backgroundImage =
      `linear-gradient( rgba(0, 0, 0, ${bgDarken}), rgba(0, 0, 0, ${bgDarken}) ), url(${bgImage})`;
    } else {
      style.backgroundImage = `url(${bgImage})`;
    }
    style.backgroundSize = "cover";
    style.backgroundPosition = "center center";
  }
  return style;
};

export const propTypesBase = {
  italic: PropTypes.bool,
  bold: PropTypes.bool,
  caps: PropTypes.bool,
  margin: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  padding: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  textColor: PropTypes.string,
  textFont: PropTypes.string,
  textSize: PropTypes.string,
  textAlign: PropTypes.string,
  bgColor: PropTypes.string,
  bgImage: PropTypes.string,
  bgDarken: PropTypes.number
};
