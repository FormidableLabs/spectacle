import React from 'react/addons';
import assign from 'object-assign';

class Appear extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    }
  }
  render() {
    let styles = {
      opacity: this.state.active ? 1 : 0
    }
    return (
      <div style={styles}>
        {this.props.children}
      </div>
    )
  }
}

export default Appear;