import React from 'react/addons';
import assign from 'object-assign';
import Base from './base';

class Quote extends Base {
  render() {
    return (
      <span style={assign({}, this.context.styles.components.quote, this.getStyles())}>
        {this.props.children}
      </span>
    )
  }
}

Quote.contextTypes = {
  styles: React.PropTypes.object
}

export default Quote;