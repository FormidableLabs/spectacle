import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getStyles } from '../utils/base';
import Radium from 'radium';

const format = (str) => {
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

@Radium
export default class Code extends Component {
  createMarkup() {
    return {
      __html: format(this.props.children)
    };
  }
  render() {
    return (
      <code
        className={this.props.className}
        style={[this.context.styles.components.code, getStyles.call(this), this.props.style]}
        dangerouslySetInnerHTML={this.createMarkup()}
      />
    );
  }
}

Code.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object
};

Code.contextTypes = {
  styles: PropTypes.object,
  store: PropTypes.object
};
