import React, { PropTypes } from "react";
import Base from "./base";
import Radium from "radium";

@Radium
class Code extends Base {
  render() {
    return (
      <code style={[this.context.styles.components.code, this.getStyles(), this.props.style]}>
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

export default Code;
