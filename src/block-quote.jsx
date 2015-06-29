import React from 'react/addons';
import assign from 'object-assign';
import Base from './base';

class BlockQuote extends Base {
  render() {
    return (
      <blockquote style={assign({}, this.context.styles.components.blockquote, this.getStyles())}>
        {this.props.children}
      </blockquote>
    )
  }
}

BlockQuote.contextTypes = {
  styles: React.PropTypes.object
}

export default BlockQuote;