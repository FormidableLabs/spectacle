import React from 'react/addons';
import assign from 'object-assign';

class Text extends React.Component {
  render() {
    return (
      <p style={assign({}, this.context.styles.text)}>
        {this.props.children}
      </p>
    )
  }
}

Text.contextTypes = {
  styles: React.PropTypes.object
}

export default Text;