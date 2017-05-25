import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getStyles } from '../utils/base';
import Radium from 'radium';

@Radium
export default class TableItem extends Component {
  render() {
    const typefaceStyle = this.context.typeface || {};
    return (
      <td className={this.props.className} style={[this.context.styles.components.tableItem, getStyles.call(this), this.props.style, typefaceStyle]}>
        {this.props.children}
      </td>
    );
  }
}

TableItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object
};

TableItem.contextTypes = {
  styles: PropTypes.object,
  store: PropTypes.object,
  typeface: PropTypes.object
};
