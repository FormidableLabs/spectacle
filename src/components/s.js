import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getStyles } from '../utils/base';
import styled from 'react-emotion';

const textDecoration = type => {
  if (type.indexOf('strikethrough') !== -1) {
    return 'line-through';
  } else if (type.indexOf('underline') !== -1) {
    return 'underline';
  }
  return 'none';
};

const StyledS = styled.span(({ type, styles }) => [
  {
    textDecoration: textDecoration(type),
    fontWeight: type.indexOf('bold') !== -1 ? 'bold' : 'normal',
    fontStyle: type.indexOf('italic') !== -1 ? 'italic' : 'normal'
  },
  styles.context,
  styles.base,
  styles.user
]);

export default class S extends Component {
  render() {
    const { type, style, children } = this.props;
    return (
      <StyledS
        className={this.props.className}
        type={type}
        styles={{
          context: this.context.styles.components.s[type],
          base: getStyles.call(this),
          user: style
        }}
      >
        {children}
      </StyledS>
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
