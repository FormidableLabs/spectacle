import React from "react/addons";
import Base from "./base";
import Radium from "radium";

@Radium
class Quote extends Base {
  render() {
    return (
      <span style={[this.context.styles.components.quote, this.getStyles()]}>
        {this.props.children}
      </span>
    );
  }
}

Quote.propTypes = {
  children: React.PropTypes.node
};

Quote.contextTypes = {
  styles: React.PropTypes.object
};

export default Quote;
