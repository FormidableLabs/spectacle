import React, { PropTypes } from "react";
import Base from "./base";
import Radium from "radium";

@Radium
export default class Image extends Base {
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
          this.getStyles(),
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
