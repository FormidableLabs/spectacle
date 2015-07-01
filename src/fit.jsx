import React from 'react/addons';
import assign from 'object-assign';

class Fit extends React.Component {
  render() {
    return (
      <div className="spectacle-fit">
        {this.props.children}
      </div>
    )
  }
}

export default Fit;