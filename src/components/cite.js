import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getStyles } from '../utils/base';
import Radium from 'radium';

@Radium
export default class Cite extends Component {
  render() {
    const typefaceStyle = this.context.typeface || {};
    return (
      <cite className={this.props.className} style={[this.context.styles.components.cite, getStyles.call(this), this.props.style, typefaceStyle]}>
        - {this.props.children}
      </cite>
    );
  }
}

Cite.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object
};

Cite.contextTypes = {
  styles: PropTypes.object,
  store: PropTypes.object,
  typeface: PropTypes.object
};
