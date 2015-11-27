import React, { Component, PropTypes } from "react";
import Radium from "radium";
import { styleBase } from "../utils/base";

@Radium
export default class Quote extends Component {
  render() {
    return (
      <span style={[this.context.styles.components.quote, styleBase(this.props, this.context), this.props.style]}>
        {this.props.children}
      </span>
    );
  }
}

Quote.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
};

Quote.contextTypes = {
  styles: PropTypes.object
};
