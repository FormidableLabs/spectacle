import React, { PropTypes } from "react";
import Base from "./base";
import Radium from "radium";

@Radium
export default class ListItem extends Base {
  render() {
    return (
      <li style={[this.context.styles.components.listItem, this.getStyles(), this.props.style]}>
        {this.props.children}
      </li>
    );
  }
}

ListItem.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
};

ListItem.contextTypes = {
  styles: PropTypes.object
};
