import React, { Component, PropTypes } from "react";
import Radium from "radium";
import { styleBase, propTypesBase } from "../utils/base";

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

List.propTypes = Object.assign({}, propTypesBase, {
  style: PropTypes.object,
  children: PropTypes.node
});

List.contextTypes = {
  styles: PropTypes.object
};
