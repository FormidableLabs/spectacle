import React from 'react/addons';
import assign from 'object-assign';

class Base extends React.Component {
  constructor(props) {
    super(props);
  }
  getStyles() {
    let styles = {};
    if (this.props.italic) {
      styles = assign(styles, {fontStyle: 'italic'});
    }
    if (this.props.bold) {
      styles = assign(styles, {fontWeight: 'bold'});
    }
    if (this.props.caps) {
      styles = assign(styles, {textTransform: 'uppercase'});
    }
    if (this.props.margin) {
      styles = assign(styles, {margin: this.props.margin});
    }
    if (this.props.textColor) {
      let color = "";
      if (!this.context.styles.colors.hasOwnProperty(this.props.textColor)) {
        color = this.props.textColor
      } else {
        color = this.context.styles.colors[this.props.textColor]
      }
      styles = assign(styles, {color: color});
    }
    if (this.props.textFont) {
      styles = assign(styles, {fontFamily: this.context.styles.fonts[this.props.textFont]});
    }
    if (this.props.textSize) {
      styles = assign(styles, {fontSize: this.props.textSize});
    }
    if (this.props.bgColor) {
      styles = assign(styles, {backgroundColor: this.context.styles.colors[this.props.bgColor]});
    }
    if (this.props.bgImage) {
      styles = assign(styles, {backgroundImage:
        'linear-gradient( rgba(0, 0, 0, ' + this.props.bgDarken +
          '), rgba(0, 0, 0, ' + this.props.bgDarken +
          ') ), url(' + this.props.bgImage + ')'});
      styles = assign(styles, {backgroundSize: 'cover'});
    }
    return styles;
  }
  render() {
    return null;
  }
}

Base.propTypes = {
  textColor: React.PropTypes.string,
  textFont: React.PropTypes.oneOf(['primary','secondary','tertiary']),
  bgColor: React.PropTypes.oneOf(['primary','secondary','tertiary']),
  bgImage: React.PropTypes.string,
  bgDarken: React.PropTypes.number
};

Base.defaultProps = {
  bgDarken: 0
};

Base.Mixin = {
  getStyles() {
    let styles = {};
    if (this.props.italic) {
      styles = assign(styles, {fontStyle: 'italic'});
    }
    if (this.props.bold) {
      styles = assign(styles, {fontWeight: 'bold'});
    }
    if (this.props.caps) {
      styles = assign(styles, {textTransform: 'uppercase'});
    }
    if (this.props.margin) {
      styles = assign(styles, {margin: this.props.margin});
    }
    if (this.props.textColor) {
      let color = "";
      if (!this.context.styles.colors.hasOwnProperty(this.props.textColor)) {
        color = this.props.textColor
      } else {
        color = this.context.styles.colors[this.props.textColor]
      }
      styles = assign(styles, {color: color});
    }
    if (this.props.textFont) {
      styles = assign(styles, {fontFamily: this.context.styles.fonts[this.props.textFont]});
    }
    if (this.props.textSize) {
      styles = assign(styles, {fontSize: this.props.textSize});
    }
    if (this.props.bgColor) {
      styles = assign(styles, {backgroundColor: this.context.styles.colors[this.props.bgColor]});
    }
    if (this.props.bgImage) {
      styles = assign(styles, {backgroundImage:
        'linear-gradient( rgba(0, 0, 0, ' + this.props.bgDarken +
          '), rgba(0, 0, 0, ' + this.props.bgDarken +
          ') ), url(' + this.props.bgImage + ')'});
      styles = assign(styles, {backgroundSize: 'cover'});
    }
    return styles;
  }
};

export default Base;