import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getStyles } from '../utils/base';
import Radium from 'radium';

@Radium
export default class Quote extends Component {
  render() {
    const typefaceStyle = this.context.typeface || {};
    return (
      <span className={this.props.className} style={[this.context.styles.components.quote, getStyles.call(this), this.props.style, typefaceStyle]}>
        {this.props.children}
      </span>
    );
  }
}

Quote.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object
};

Quote.contextTypes = {
  styles: PropTypes.object,
  store: PropTypes.object,
  typeface: PropTypes.object
};
