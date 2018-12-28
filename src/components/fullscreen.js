import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import FullscreenButton from './fullscreen-button';

import { toggleFullscreen, isFullscreen } from '../utils/fullscreen';

const StyledFullscreen = styled(FullscreenButton)`
  position: absolute;
  bottom: 10px;
  right: 20px;
  width: 45px;
  height: 45px;
  font-size: 30px;
  color: #fff;
  transition: 300ms transform ease;
  transform: scale(1);

  &:hover,
  &:focus {
    transform: ${props => (props.isFullscreen ? 'scale(0.75)' : 'scale(1.25)')};
  }

  &:active {
    transform: ${props => (props.isFullscreen ? 'scale(0.90)' : 'scale(1.10)')};
  }
`;

export class Fullscreen extends Component {
  render() {
    return (
      <StyledFullscreen
        isFullscreen={isFullscreen()}
        onClick={this.props.onClick}
        styles={this.context.styles.fullscreen}
      />
    );
  }
}

Fullscreen.contextTypes = {
  styles: PropTypes.object
};

Fullscreen.propTypes = {
  controlColor: PropTypes.string,
  onClick: PropTypes.func
};

Fullscreen.defaultProps = {
  onClick: toggleFullscreen
};

export default Fullscreen;
