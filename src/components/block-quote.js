import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getStyles } from '../utils/base';
import styled from 'react-emotion';

const StyledBlockQuote = styled.blockquote(props => props.styles);

export default class BlockQuote extends Component {
  render() {
    const styles = [
      this.context.styles.components.blockquote,
      getStyles.call(this),
      this.context.typeface || {},
      this.props.style
    ];
    return (
      <StyledBlockQuote className={this.props.className} styles={styles}>
        {this.props.children}
      </StyledBlockQuote>
    );
  }
}

BlockQuote.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object
};

BlockQuote.contextTypes = {
  styles: PropTypes.object,
  store: PropTypes.object,
  typeface: PropTypes.object
};
