import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getStyles } from '../utils/base';
import Radium from 'radium';

@Radium
export default class S extends Component {
  render() {
    const { type, style, children } = this.props;
    let styles = {};
    if (type.indexOf('strikethrough') !== -1) {
      styles = { ...styles, textDecoration: 'line-through' };
    }
    if (type.indexOf('underline') !== -1) {
      styles = { ...styles, textDecoration: 'underline' };
    }
    if (type.indexOf('bold') !== -1) {
      styles = { ...styles, fontWeight: 'bold' };
    }
    if (type.indexOf('italic') !== -1) {
      styles = { ...styles, fontStyle: 'italic' };
    }
    return (
      <span className={this.props.className} style={[styles, this.context.styles.components.s[type], getStyles.call(this), style]}>
        {children}
      </span>
    );
  }
}

S.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ])
};

S.contextTypes = {
  styles: PropTypes.object,
  store: PropTypes.object
};
