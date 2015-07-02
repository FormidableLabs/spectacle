import React from 'react/addons';
import assign from 'object-assign';
import Radium from 'radium';

@Radium
class Fill extends React.Component {
  render() {
    let styles = {
      flex: 1
    };
    return (
      <div style={[styles]}>
        {this.props.children}
      </div>
    )
  }
}

export default Fill;