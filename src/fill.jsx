import React from 'react/addons';
import assign from 'object-assign';

class Fill extends React.Component {
  render() {
    return (
      <div className="spectacle-fill">
        {this.props.children}
      </div>
    )
  }
}

export default Fill;