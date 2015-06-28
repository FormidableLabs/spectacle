import React from 'react/addons';
import assign from 'object-assign';

class Image extends React.Component {
  render() {
    return <img src="" style={assign({}, this.context.styles.image)}/>
  }
}

Image.contextTypes = {
  styles: React.PropTypes.object
}

export default Image;