import React, { Component, PropTypes } from "react";
import Radium from "radium";
import { styleBase } from "../utils/base";

@Radium
export default class Code extends Component {
  render() {
    return (
      <code style={[this.context.styles.components.code, styleBase(this.props, this.context), this.props.style]}>
        {this.props.children}
      </code>
    );
  }
}

Code.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
};

Code.contextTypes = {
  styles: PropTypes.object
};
