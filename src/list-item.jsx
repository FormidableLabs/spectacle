import React from 'react/addons';
import assign from 'object-assign';
import Base from './base';

class ListItem extends Base {
  render() {
    return (
      <li style={assign({}, this.context.styles.components.listItem, this.getStyles())}>
        {this.props.children}
      </li>
    )
  }
}

ListItem.contextTypes = {
  styles: React.PropTypes.object
}

export default ListItem;