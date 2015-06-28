import React from 'react/addons';
import assign from 'object-assign';

class ListItem extends React.Component {
  render() {
    return (
      <li style={assign({}, this.context.styles.listItem)}>
        {this.props.children}
      </li>
    )
  }
}

ListItem.contextTypes = {
  styles: React.PropTypes.object
}

export default ListItem;