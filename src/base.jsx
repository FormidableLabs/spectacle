/*eslint max-statements:0,complexity:0*/
import React from "react/addons";

const getStyles = function getStyles() {
  const styles = {};
  if (this.props.italic) {
    styles.fontStyle = "italic";
  }
  if (this.props.bold) {
    styles.fontWeight = "bold";
  }
  if (this.props.caps) {
    styles.textTransform = "uppercase";
  }
  if (this.props.margin) {
    styles.margin = this.props.margin;
  }
  if (this.props.padding) {
    styles.padding = this.props.padding;
  }
  if (this.props.textColor) {
    let color = "";
    if (!this.context.styles.colors.hasOwnProperty(this.props.textColor)) {
      color = this.props.textColor;
    } else {
      color = this.context.styles.colors[this.props.textColor];
    }
    styles.color = color;
  }
  if (this.props.textFont) {
    let font = "";
    if (!this.context.styles.fonts.hasOwnProperty(this.props.textFont)) {
      font = this.props.textFont;
    } else {
      font = this.context.styles.fonts[this.props.textFont];
    }
    styles.fontFamily = font;
  }
  if (this.props.textSize) {
    styles.fontSize = this.props.textSize;
  }
  if (this.props.textAlign) {
    styles.textAlign = this.props.textAlign;
  }
  if (this.props.bgColor) {
    let color = "";
    if (!this.context.styles.colors.hasOwnProperty(this.props.bgColor)) {
      color = this.props.bgColor;
    } else {
      color = this.context.styles.colors[this.props.bgColor];
    }
    styles.backgroundColor = color;
  }
  if (this.props.bgImage) {
    if (this.props.bgDarken) {
      styles.backgroundImage =
      "linear-gradient( rgba(0, 0, 0, " + this.props.bgDarken +
        "), rgba(0, 0, 0, " + this.props.bgDarken +
        ") ), url(" + this.props.bgImage + ")";
    } else {
      styles.backgroundImage = "url(" + this.props.bgImage + ")";
    }
    styles.backgroundSize = "cover";
    styles.backgroundPosition = "center center";
  }
  return styles;
};

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.getStyles = getStyles;
  }

  render() {
    return null;
  }
}

Base.propTypes = {
  textColor: React.PropTypes.string,
  textFont: React.PropTypes.string,
  bgColor: React.PropTypes.string,
  bgImage: React.PropTypes.string,
  bgDarken: React.PropTypes.number
};

Base.defaultProps = {
  bgDarken: 0
};

Base.Mixin = {
  getStyles
};

export default Base;
