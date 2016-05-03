import React, { Component, PropTypes } from "react";
import { getStyles } from "../utils/base";
import Radium from "radium";

@Radium
export default class TableItem extends Component {
  render() {
    return (
      <td className={this.props.className} style={[this.context.styles.components.tableItem, getStyles.call(this), this.props.style]}>
        {this.props.children}
      </td>
    );
  }
}

TableItem.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string
};

TableItem.contextTypes = {
  styles: PropTypes.object
};
