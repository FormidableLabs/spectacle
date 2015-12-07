import React, { Component, PropTypes } from "react";
import { getStyles } from "../utils/base";
import Radium from "radium";

@Radium
export default class Image extends Component {
  render() {
    const styles = {
      width: this.props.width || "",
      height: this.props.height || "",
      display: this.props.display || ""
    };
    return (
      <img
        className={this.props.className}
        src={this.props.src}
        style={[
          this.context.styles.components.image,
          getStyles.call(this),
          styles,
          this.props.style
        ]}
      />
    );
  }
}

Image.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  display: PropTypes.string,
  src: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string
};

Image.contextTypes = {
  styles: PropTypes.object
};
