import React, { Component, PropTypes } from "react";
import { getStyles } from "../utils/base";
import Radium from "radium";

@Radium
export default class TableHeaderItem extends Component {
  render() {
    return (
      <td className={this.props.className} style={[this.context.styles.components.tableHeaderItem, getStyles.call(this), this.props.style]}>
        {this.props.children}
      </td>
    );
  }
}

TableHeaderItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object
};

TableHeaderItem.contextTypes = {
  styles: PropTypes.object,
  store: PropTypes.object
};
