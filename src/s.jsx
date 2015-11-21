import React, { Component, PropTypes } from "react";
import Radium from "radium";

@Radium
class S extends Component {
  render() {
    let styles = {};
    if (this.props.type.indexOf("strikethrough") !== -1) {
      styles = Object.assign(styles, {textDecoration: "line-through"});
    }
    if (this.props.type.indexOf("underline") !== -1) {
      styles = Object.assign(styles, {textDecoration: "underline"});
    }
    if (this.props.type.indexOf("bold") !== -1) {
      styles = Object.assign(styles, {fontWeight: "bold"});
    }
    if (this.props.type.indexOf("italic") !== -1) {
      styles = Object.assign(styles, {fontStyle: "italic"});
    }
    return (
      <span style={[styles, this.context.styles.components.s[this.props.type], this.props.style]}>
        {this.props.children}
      </span>
    );
  }
}

S.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  type: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ])
};

S.contextTypes = {
  styles: PropTypes.object
};

export default S;
