import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getStyles } from '../utils/base';
import Radium from 'radium';

@Radium
export default class ListItem extends Component {
  render() {
    const typefaceStyle = this.context.typeface || {};
    return (
      <li className={this.props.className} style={[this.context.styles.components.listItem, getStyles.call(this), this.props.style, typefaceStyle]}>
        {this.props.children}
      </li>
    );
  }
}

ListItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object
};

ListItem.contextTypes = {
  styles: PropTypes.object,
  store: PropTypes.object,
  typeface: PropTypes.object
};
