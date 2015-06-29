import React from 'react/addons';
import assign from 'object-assign';

class S extends React.Component {
  render() {
    return (
      <span style={assign({}, this.context.styles.components.s[this.props.type])}>
        {this.props.children}
      </span>
    )
  }
}

S.contextTypes = {
  styles: React.PropTypes.object
}

export default S;