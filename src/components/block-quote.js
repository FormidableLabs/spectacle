import React, { Component, PropTypes } from "react";
import { getStyles } from "../utils/base";
import Radium from "radium";

@Radium
export default class BlockQuote extends Component {
  render() {
    return (
      <blockquote className={this.props.className} style={[this.context.styles.components.blockquote, getStyles.call(this), this.props.style]}>
        {this.props.children}
      </blockquote>
    );
  }
}

BlockQuote.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object
};

BlockQuote.contextTypes = {
  styles: PropTypes.object,
  store: PropTypes.object
};
