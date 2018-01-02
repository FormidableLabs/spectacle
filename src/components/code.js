import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getStyles } from '../utils/base';
import styled from 'react-emotion';

const format = (str) => {
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

const StyledCode = styled.code(props => props.styles);

export default class Code extends Component {
  createMarkup() {
    return {
      __html: Array.isArray(this.props.children) ? this.props.children.map(format) : format(this.props.children)
    };
  }
  render() {
    const styles = [
      this.context.styles.components.code,
      getStyles.call(this),
      this.props.style
    ];
    return (
      <StyledCode
        className={this.props.className}
        styles={styles}
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
