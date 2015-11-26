import React, { Component, PropTypes } from "react";
import Radium from "radium";

@Radium
export default class Fit extends Component {
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
  style: PropTypes.object,
  children: PropTypes.node
};
