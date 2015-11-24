import React, { Component, PropTypes } from "react";
import Radium from "radium";
import { styleBase } from "../utils/base";

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
        src={this.props.src}
        style={[
          this.context.styles.components.image,
          styleBase(this.props, this.context),
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
  style: PropTypes.object
};

Image.contextTypes = {
  styles: PropTypes.object
};
