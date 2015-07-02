import React from 'react/addons';
import assign from 'object-assign';
import Base from './base';
import Radium from 'radium';

@Radium
class Image extends Base {
  render() {
    let styles = {
      width: this.props.width || "",
      height: this.props.height || "",
      display: this.props.display || ""
    };
    return (
      <img src={this.props.src} style={[this.context.styles.components.image, this.getStyles()]} />
    );
  }
}

Image.contextTypes = {
  styles: React.PropTypes.object
}

export default Image;