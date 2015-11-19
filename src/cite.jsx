import React, { PropTypes } from "react";
import Base from "./base";
import Radium from "radium";

@Radium
class Cite extends Base {
  render() {
    return (
      <cite style={[this.context.styles.components.cite, this.getStyles()]}>
        - {this.props.children}
      </cite>
    );
  }
}

Cite.propTypes = {
  children: PropTypes.node
};

Cite.contextTypes = {
  styles: PropTypes.object
};

export default Cite;
