import React, { PropTypes } from "react";
import Base from "./base";
import Radium from "radium";

@Radium
class Quote extends Base {
  render() {
    return (
      <span style={[this.context.styles.components.quote, this.getStyles(), this.props.style]}>
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

export default Quote;
