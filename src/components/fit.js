import React, { Component, PropTypes } from "react";
import Radium from "radium";

@Radium
export default class Fit extends Component {
  render() {
    const styles = {
      flex: 0
    };
    return (
      <div className={this.props.className} style={[styles, this.props.style]}>
        {this.props.children}
      </div>
    );
  }
}

Fit.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string
};
