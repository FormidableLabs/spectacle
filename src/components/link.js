import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getStyles } from '../utils/base';
import Radium from 'radium';

@Radium
export default class Link extends Component {
  render() {
    const typefaceStyle = this.context.typeface || {};
    return (
      <a className={this.props.className} href={this.props.href} target={this.props.target} style={[this.context.styles.components.link, getStyles.call(this), this.props.style, typefaceStyle]}>
        {this.props.children}
      </a>
    );
  }
}

Link.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  href: PropTypes.string,
  style: PropTypes.object,
  target: PropTypes.string
};

Link.contextTypes = {
  styles: PropTypes.object,
  store: PropTypes.object,
  typeface: PropTypes.object
};
