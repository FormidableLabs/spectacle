import React, { PropTypes } from "react";
import Base from "./base";
import Radium from "radium";

@Radium
export default class List extends Base {
  render() {
    return (
      <ul style={[this.context.styles.components.list, this.getStyles(), this.props.style]}>
        {this.props.children}
      </ul>
    );
  }
}

List.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
};

List.contextTypes = {
  styles: PropTypes.object
};
