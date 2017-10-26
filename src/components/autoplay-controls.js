import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const AutoplayButton = styled.button(({ styles }) => [
  {
    opacity: 0,
    cursor: 'pointer',
    transition: '300ms opacity ease',
    ':hover': {
      opacity: 1
    }
  },
  styles.context
]);

export default class AutoplayControls extends Component {
  render() {
    const pauseBtn = (
      <AutoplayButton
        type="button"
        key="pause"
        onClick={this.props.onPause}
        styles={{
          context: this.context.styles.autoplay.pause
        }}
      >
        <svg
          style={this.context.styles.autoplay.pauseIcon}
          xmlns="http://www.w3.org/2000/svg"
          width="30px"
          height="30px"
          viewBox="0 0 30 30"
        >
          <path d="M23.5,4V26h-6V4ZM6.5,26h6V4h-6Z"/>
        </svg>
      </AutoplayButton>
    );

    const playBtn = (
      <AutoplayButton
        type="button"
        key="play"
        onClick={this.props.onPlay}
        styles={{
          context: this.context.styles.autoplay.play
        }}
      >
        <svg
          style={this.context.styles.autoplay.playIcon}
          xmlns="http://www.w3.org/2000/svg"
          width="30px"
          height="30px"
          viewBox="0 0 30 30"
        >
          <path d="M26,15,6,25V5Z"/>
        </svg>
      </AutoplayButton>
    );

    return this.props.autoplaying ? pauseBtn : playBtn;
  }
}

AutoplayControls.propTypes = {
  autoplaying: PropTypes.bool,
  onPause: PropTypes.func,
  onPlay: PropTypes.func,
};

AutoplayControls.contextTypes = {
  styles: PropTypes.object
};
