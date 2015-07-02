import React from 'react/addons';
import assign from 'object-assign';
import Base from './base';
import Radium from 'radium';

@Radium
class Quote extends Base {
  render() {
    return (
      <span style={[this.context.styles.components.quote, this.getStyles()]}>
        {this.props.children}
      </span>
    )
  }
}

Quote.contextTypes = {
  styles: React.PropTypes.object
}

export default Quote;