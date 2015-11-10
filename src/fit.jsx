import React from "react";
import Radium from "radium";

@Radium
class Fit extends React.Component {
  render() {
    const styles = {
      flex: 0
    };
    return (
      <div style={[styles, this.props.style]}>
        {this.props.children}
      </div>
    );
  }
}

Fit.propTypes = {
  children: React.PropTypes.node,
  style: React.PropTypes.object
};

export default Fit;
