import React, { Component, PropTypes } from "react";
import Radium from "radium";
import { styleBase } from "../utils/base";

@Radium
export default class BlockQuote extends Component {
  render() {
    return (
      <blockquote style={[this.context.styles.components.blockquote, styleBase(this.props, this.context), this.props.style]}>
        {this.props.children}
      </blockquote>
    );
  }
}

BlockQuote.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
};

BlockQuote.contextTypes = {
  styles: PropTypes.object
};
