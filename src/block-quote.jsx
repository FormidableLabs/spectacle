import React from "react/addons";
import Base from "./base";
import Radium from "radium";

@Radium
class BlockQuote extends Base {
  render() {
    return (
      <blockquote style={[this.context.styles.components.blockquote, this.getStyles(), this.props.style]}>
        {this.props.children}
      </blockquote>
    );
  }
}

BlockQuote.propTypes = {
  children: React.PropTypes.node,
  style: React.PropTypes.object
};

BlockQuote.contextTypes = {
  styles: React.PropTypes.object
};

export default BlockQuote;
