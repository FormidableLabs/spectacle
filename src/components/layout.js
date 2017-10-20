import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const StyledLayout = styled.div(props => [
  { display: 'flex' },
  props.styles
]);

export default class Layout extends Component {
  render() {
    return (
      <StyledLayout styles={this.props.style}>
        {this.props.children}
      </StyledLayout>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
};
