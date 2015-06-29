import React from 'react/addons';
import assign from 'object-assign';

class Layout extends React.Component {
  render() {
    let styles = {
      display: 'flex',
      flexDirection: 'row'
    };
    return (
      <div style={styles}>
        {this.props.children}
      </div>
    )
  }
}

Layout.contextTypes = {
  styles: React.PropTypes.object
}

export default Layout;