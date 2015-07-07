import React from "react/addons";
import Base from "./base";
import Radium from "radium";

@Radium
class Image extends Base {
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
          styles]} />
    );
  }
}

Image.propTypes = {
  width: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  height: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  display: React.PropTypes.string,
  src: React.PropTypes.string
};

Image.contextTypes = {
  styles: React.PropTypes.object
};

export default Image;
