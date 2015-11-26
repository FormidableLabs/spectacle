import React, { Component, PropTypes } from "react";
import Radium from "radium";

@Radium
export default class S extends Component {
  render() {
    const { type, style, children } = this.props;
    let styles = {};
    if (type.indexOf("strikethrough") !== -1) {
      styles = Object.assign(styles, {textDecoration: "line-through"});
    }
    if (type.indexOf("underline") !== -1) {
      styles = Object.assign(styles, {textDecoration: "underline"});
    }
    if (type.indexOf("bold") !== -1) {
      styles = Object.assign(styles, {fontWeight: "bold"});
    }
    if (type.indexOf("italic") !== -1) {
      styles = Object.assign(styles, {fontStyle: "italic"});
    }
    return (
      <span style={[styles, this.context.styles.components.s[type], style]}>
        {children}
      </span>
    );
  }
}

S.propTypes = {
  type: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  style: PropTypes.object,
  children: PropTypes.node
};

S.contextTypes = {
  styles: PropTypes.object
};
