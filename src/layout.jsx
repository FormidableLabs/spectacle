import React, { Component, PropTypes } from "react";
import Radium from "radium";

@Radium
class Layout extends Component {
  render() {
    const styles = {
      display: "flex"
    };
    return (
      <div style={[styles, this.props.style]}>
        {this.props.children}
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
};

export default Layout;
