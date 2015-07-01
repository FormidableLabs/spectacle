import React from 'react/addons';
import assign from 'object-assign';

class Layout extends React.Component {
  render() {
    return (
      <div className="spectacle-layout">
        {this.props.children}
      </div>
    )
  }
}

export default Layout;