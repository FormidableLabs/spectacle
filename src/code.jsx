import React from 'react/addons';
import assign from 'object-assign';

class Code extends React.Component {
  render() {
    return (
      <code style={assign({}, this.context.styles.code)}>
        {this.props.children}
      </code>
    )
  }
}

Code.contextTypes = {
  styles: React.PropTypes.object
}

export default Code;