import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { defaultCode } from '../utils/playground.default-code';

import FullscreenButton from './fullscreen-button';

import {
  requestFullscreen,
  exitFullscreen,
  getFullscreenElement
} from '../utils/fullscreen';

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

const PlaygroundEditor = styled(({ syntaxStyles: _, prismTheme: __, ...rest }) => <LiveEditor {...rest} />)`
  && {
    ${props => props.syntaxStyles}
    min-height: 100%;
    font-size: 1.25vw;

    &.builtin-prism-theme {
      ${props => props.prismTheme}
    }
  }
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

  > button {
    position: absolute;
    right: 1em;
    margin-top: -0.1em;
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

const STORAGE_KEY = 'spectacle-playground';

class ComponentPlayground extends Component {
  constructor() {
    super(...arguments);
    this.onRef = this.onRef.bind(this);
    this.onEditorChange = this.onEditorChange.bind(this);
    this.requestFullscreen = this.requestFullscreen.bind(this);
    this.syncCode = this.syncCode.bind(this);

    this.state = {
      code: (this.props.code || defaultCode).trim()
    };
  }

  componentDidMount() {
    localStorage.setItem(STORAGE_KEY, this.state.code);
    window.addEventListener('storage', this.syncCode);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.code !== this.props.code) {
      const code = (this.props.code || defaultCode).trim();
      this.setState({ code });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('storage', this.syncCode);
  }

  onKeyUp(evt) {
    evt.stopPropagation();

    // Esc: When entering the editor or an input element the default esc-to-exit might not work anymore
    if (evt.keyCode === 27 && getFullscreenElement()) {
      exitFullscreen();
    }
  }

  onKeyDown(evt) {
    evt.stopPropagation();
  }

  onRef(node) {
    this.node = node;
  }

  onEditorChange(code) {
    this.setState({ code });
    localStorage.setItem(STORAGE_KEY, code);
  }

  requestFullscreen() {
    requestFullscreen(this.node);
  }

  syncCode({ key, newValue }) {
    if (key === STORAGE_KEY) {
      this.setState({ code: newValue });
    }
  }

  render() {
    const {
      previewBackgroundColor,
      scope = {},
      theme = 'dark',
      transformCode
    } = this.props;

    const useDarkTheme = theme === 'dark';
    const externalPrismTheme = this.props.theme === 'external';
    const className = `language-jsx ${externalPrismTheme ? '' : 'builtin-prism-theme'}`;

    return (
      <PlaygroundProvider
        mountStylesheet={false}
        code={this.state.code}
        scope={{ Component, ...scope }}
        transformCode={transformCode}
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
            <PlaygroundEditor
              className={className}
              syntaxStyles={this.context.styles.components.syntax}
              prismTheme={this.context.styles.prism[useDarkTheme ? 'dark' : 'light']}
              onChange={this.onEditorChange}
            />
          </PlaygroundColumn>
        </PlaygroundRow>
      </PlaygroundProvider>
    );
  }
}

ComponentPlayground.contextTypes = {
  styles: PropTypes.object,
  store: PropTypes.object
};

ComponentPlayground.propTypes = {
  code: PropTypes.string,
  previewBackgroundColor: PropTypes.string,
  scope: PropTypes.object,
  theme: PropTypes.oneOf(['dark', 'light', 'external']),
  transformCode: PropTypes.func,
};

ComponentPlayground.defaultProps = {
  theme: 'dark',
};

export default ComponentPlayground;
