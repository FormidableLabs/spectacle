import React, { Component, PropTypes } from "react";
import Radium from "radium";

@Radium
export default class Fill extends Component {
  render() {
    const styles = {
      flex: 1
    };
    return (
      <div style={[styles, this.props.style]}>
        {this.props.children}
      </div>
    );
  }
}

Fill.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
};
