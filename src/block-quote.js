import React, { PropTypes } from "react";
import Base from "./base";
import Radium from "radium";

@Radium
export default class BlockQuote extends Base {
  render() {
    return (
      <blockquote style={[this.context.styles.components.blockquote, this.getStyles(), this.props.style]}>
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
