import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getStyles } from '../utils/base';
import styled from 'react-emotion';

const StyledQuote = styled.span(props => props.styles);

export default class Quote extends Component {
  render() {
    const typefaceStyle = this.context.typeface || {};
    return (
      <StyledQuote
        className={this.props.className}
        styles={[
          this.context.styles.components.quote,
          getStyles.call(this),
          typefaceStyle,
          this.props.style
        ]}
      >
        {this.props.children}
      </StyledQuote>
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
