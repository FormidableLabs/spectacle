import React, { Component, PropTypes } from "react";
import { getStyles } from "../utils/base";
import Radium from "radium";

@Radium
export default class Code extends Component {
  render() {
    return (
      <code className={this.props.className} style={[this.context.styles.components.code, getStyles.call(this), this.props.style]}>
        {this.props.children}
      </code>
    );
  }
}

Code.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string
};

Code.contextTypes = {
  styles: PropTypes.object
};
