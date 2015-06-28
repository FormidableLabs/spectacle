import React from 'react/addons';
import assign from 'object-assign';

class BlockQuote extends React.Component {
  render() {
    return (
      <blockquote style={assign({}, this.context.styles.blockquote)}>
        {this.props.children}
      </blockquote>
    )
  }
}

BlockQuote.contextTypes = {
  styles: React.PropTypes.object
}

export default BlockQuote;