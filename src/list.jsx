import React from 'react/addons';
import assign from 'object-assign';
import Base from './base';
import Radium from 'radium';

@Radium
class List extends Base {
  render() {
    return (
      <ul style={[this.context.styles.components.list, this.getStyles()]}>
        {this.props.children}
      </ul>
    )
  }
}

List.contextTypes = {
  styles: React.PropTypes.object
}

export default List;