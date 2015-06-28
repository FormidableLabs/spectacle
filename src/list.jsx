import React from 'react/addons';
import assign from 'object-assign';

class List extends React.Component {
  render() {
    return (
      <ul style={assign({}, this.context.styles.list)}>
        {this.props.children}
      </ul>
    )
  }
}

List.contextTypes = {
  styles: React.PropTypes.object
}

export default List;