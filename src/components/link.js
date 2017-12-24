import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getStyles } from '../utils/base';
import styled from 'react-emotion';

const StyledLink = styled.a(props => props.styles);

export default class Link extends Component {
  render() {
    const typefaceStyle = this.context.typeface || {};
    return (
      <StyledLink
        className={this.props.className}
        href={this.props.href}
        target={this.props.target}
        styles={[
          this.context.styles.components.link,
          getStyles.call(this),
          typefaceStyle,
          this.props.style
        ]}
      >
        {this.props.children}
      </StyledLink>
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
