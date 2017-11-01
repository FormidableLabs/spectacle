import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { defaultCode } from '../utils/playground.default-code';

import FullscreenButton from './fullscreen-button';

import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from 'react-live';

export const PlaygroundProvider = styled(LiveProvider)`
  border-radius: 0 0 6px 6px;
  height: 100%;
  width: 100%;
  border-radius: 6px;
  overflow: hidden;
`;

const PlaygroundPreview = styled(({ className }) => (
  <LivePreview className={className} />
))`
  padding: 0.5rem;
  min-height: 100%;

  background: ${p => p.previewBackgroundColor || '#fff'};
`;

const PlaygroundEditor = styled(LiveEditor)`
  padding: 0.5rem;
  margin: 0;
  min-height: 100%;
  font-size: 1.25vw;
`;

const PlaygroundRow = styled.div`
  display: flex;
  justify-content: stretch;
  align-items: center;
  width: 100%;

  /* NOTE: Comma separation doesn't seem to work here */

  &:-webkit-full-screen { height: 100%; }
  &:-moz-full-screen { height: 100%; }
  &:-ms-fullscreen { height: 100%; }
  &:fullscreen { height: 100%; }

  &:-webkit-full-screen > * { height: 100%; }
  &:-moz-full-screen > * { height: 100%; }
  &:-ms-fullscreen > * { height: 100%; }
  &:fullscreen > * { height: 100%; }
`;

const Title = styled.div`
  position: relative;
  flex: 1;
  background: #ddd;
  border-bottom: 1px solid #999;
  color: #424242;
  display: block;
  font-family: 'Roboto Mono', 'Menlo', 'Andale Mono', monospace;
  font-size: 1.15vw;
  padding: 0.4rem 0;
  text-transform: uppercase;

  &:last-child {
    border-left: 1px solid #999;
  }

  ${props => props.useDarkTheme && css`
    background: #272822;
    border-bottom: 1px solid #000;
    color: #fff;
  `}
`;

const PlaygroundColumn = styled.div`
  flex: 1;
  font-size: 1.25vw;
  margin: 0;
  position: relative;
  height: 60vh;
  overflow-y: scroll;
  &:last-child {
    border-left: 1px solid #999;
  }
`;

const PlaygroundError = styled(LiveError)`
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: left;
  white-space: pre-wrap;
  background: rgba(255, 35, 36, 0.8);
  color: white;
  padding: 0.5rem;
`;

class ComponentPlayground extends Component {
  constructor() {
    super();

    this.onRef = this.onRef.bind(this);
    this.requestFullscreen = this.requestFullscreen.bind(this);
  }

  onKeyUp(evt) {
    evt.stopPropagation();

    // Esc: When entering the editor or an input element the default esc-to-exit might not work anymore
    if (evt.keyCode === 27 && document.fullscreenElement) {
      const exit = (document.exitFullscreen || document.mozCancelFullScreen);

      if (typeof exit === 'function') {
        exit.call(document);
      }
    }
  }

  onKeyDown(evt) {
    evt.stopPropagation();
  }

  onRef(node) {
    this.node = node;
  }

  requestFullscreen() {
    const requestFullscreen = (
      this.node.requestFullscreen ||
      this.node.webkitRequestFullscreen ||
      this.node.mozRequestFullScreen ||
      this.node.mozRequestFullScreen
    );

    if (typeof requestFullscreen === 'function') {
      requestFullscreen.call(this.node);
    }
  }

  render() {
    const {
      code,
      previewBackgroundColor,
      scope = {},
      theme = 'dark'
    } = this.props;

    const useDarkTheme = theme === 'dark';

    if (useDarkTheme) {
      require('../themes/default/prism.dark.css');
    } else {
      require('../themes/default/prism.light.css');
    }

    return (
      <PlaygroundProvider
        className={`react-live-${useDarkTheme ? 'dark' : 'light'}`}
        mountStylesheet={false}
        code={(code || defaultCode).trim()}
        scope={{ Component, ...scope }}
        noInline
      >
        <PlaygroundRow>
          <Title>Live Preview</Title>
          <Title useDarkTheme={useDarkTheme}>
            Source Code
            <FullscreenButton onClick={this.requestFullscreen} />
          </Title>
        </PlaygroundRow>

        <PlaygroundRow
          innerRef={this.onRef}
          onKeyUp={this.onKeyUp}
          onKeyDown={this.onKeyDown}
        >
          <PlaygroundColumn>
            <PlaygroundPreview
              previewBackgroundColor={previewBackgroundColor}
            />
            <PlaygroundError />
          </PlaygroundColumn>

          <PlaygroundColumn>
            <PlaygroundEditor />
          </PlaygroundColumn>
        </PlaygroundRow>
      </PlaygroundProvider>
    );
  }
}

ComponentPlayground.propTypes = {
  code: PropTypes.string,
  previewBackgroundColor: PropTypes.string,
  scope: PropTypes.object,
  theme: PropTypes.string
};

export default ComponentPlayground;
