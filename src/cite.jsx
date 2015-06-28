import React from 'react/addons';
import assign from 'object-assign';

class Cite extends React.Component {
  render() {
    return (
      <cite style={assign({}, this.context.styles.cite)}>
        {this.props.children}
      </cite>
    )
  }
}

Cite.contextTypes = {
  styles: React.PropTypes.object
}

export default Cite;