import React from 'react/addons';
import assign from 'object-assign';

class Heading extends React.Component {
  render() {
    let Tag = "H" + this.props.size;
    return React.createElement(Tag, {
      style: assign({}, this.context.styles.heading["h" + this.props.size])
    }, this.props.children)
  }
}

Heading.contextTypes = {
  styles: React.PropTypes.object
}

export default Heading;