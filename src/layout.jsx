import React from 'react/addons';
import assign from 'object-assign';
import Radium from 'radium';

@Radium
class Layout extends React.Component {
  render() {
    let styles = {
      display: 'flex'
    };
    return (
      <div style={[styles]}>
        {this.props.children}
      </div>
    )
  }
}

export default Layout;