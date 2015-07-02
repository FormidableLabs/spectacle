import React from 'react/addons';
import assign from 'object-assign';
import Radium from 'radium';

@Radium
class Fit extends React.Component {
  render() {
    let styles = {
      flex: 0
    };
    return (
      <div style={[styles]}>
        {this.props.children}
      </div>
    )
  }
}

export default Fit;