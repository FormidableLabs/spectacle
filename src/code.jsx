import React from "react/addons";
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
  children: React.PropTypes.node,
  style: React.PropTypes.object
};

Code.contextTypes = {
  styles: React.PropTypes.object
};

export default Code;
