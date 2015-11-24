import React, { Component, PropTypes } from "react";
import { styleBase } from "../utils/base";
import Radium from "radium";

@Radium
export default class List extends Component {
  render() {
    return (
      <ul style={[this.context.styles.components.list, styleBase(this.props, this.context), this.props.style]}>
        {this.props.children}
      </ul>
    );
  }
}

List.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
};

List.contextTypes = {
  styles: PropTypes.object
};
