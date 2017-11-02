import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import FullscreenButton from './fullscreen-button';

import {
  requestFullscreen,
  exitFullscreen,
  getFullscreenElement
} from '../utils/fullscreen';

const StyledFullscreen = styled(FullscreenButton)`
  position: absolute;
  bottom: 10px;
  right: 20px;
  opacity: 0;
  transition: 300ms opacity ease;
  font-size: 30px;
  color: #fff;

  &:hover {
    opacity: 1;
  }
`;

export class Fullscreen extends Component {
  toggleFullscreen() {
    if (!getFullscreenElement()) {
      requestFullscreen(document.documentElement);
    } else {
      exitFullscreen();
    }
  }

  render() {
    return (
      <StyledFullscreen
        onClick={() => this.toggleFullscreen()}
        style={this.context.styles.fullscreen}
        viewBox="0 0 512 512"
      />
    );
  }
}

Fullscreen.contextTypes = {
  styles: PropTypes.object
};

export default Fullscreen;
