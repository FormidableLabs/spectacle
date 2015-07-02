import React from 'react/addons';
import assign from 'object-assign';
import Base from './base';
import Radium from 'radium';

@Radium
class Code extends Base {
  render() {
    return (
      <code style={[this.context.styles.components.code, this.getStyles()]}>
        {this.props.children}
      </code>
    )
  }
}

Code.contextTypes = {
  styles: React.PropTypes.object
}

export default Code;