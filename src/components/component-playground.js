import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from "react-live";

import styled, { css } from "styled-components";
import { defaultCode } from "../utils/playground.default-code";

const PlaygroundProvider = styled(LiveProvider)`
  background: ${(props) => (
    props.previewBackgroundColor || "#fff"
  )};
  border-radius: 0 0 6px 6px;
  height: 100%;
  width: 100%;
  border-radius: 6px;
  overflow: hidden;
`;

const PlaygroundPreview = styled(LivePreview)`
  padding: 0.5rem;
`;

const PlaygroundEditor = styled(LiveEditor)`
  padding: 0.5rem;
  margin: 0;

  white-space: pre-wrap;
  box-sizing: border-box;
  vertical-align: baseline;
  outline: none;
  text-shadow: none;
  hyphens: none;
  word-wrap: normal;
  word-break: normal;
  text-align: left;
  word-spacing: normal;
  tab-size: 2;

  color: ${(props) => (
    props.useDarkTheme ? "rgba(233, 237, 237, 1)" : "#000"
  )};

  background: ${(props) => (
    props.useDarkTheme ? "#263238" : "#fff"
  )};
`;

const PlaygroundRow = styled.div`
  display: flex;
  justify-content: stretch;
  align-items: center;
  width: 100%;
`;

const Title = styled.div`
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

const ComponentPlayground = ({
  code = defaultCode,
  previewBackgroundColor,
  scope = {},
  theme = "dark"
}) => {
  const useDarkTheme = theme === "dark";

  return (
    <PlaygroundProvider
      previewBackgroundColor={previewBackgroundColor}
      mountStylesheet={false}
      code={code.trim()}
      scope={{ Component, ...scope }}
      noInline
    >
      <PlaygroundRow>
        <Title>Live Preview</Title>
        <Title useDarkTheme={useDarkTheme}>Source Code</Title>
      </PlaygroundRow>

      <PlaygroundRow>
        <PlaygroundColumn>
          <PlaygroundPreview />
        </PlaygroundColumn>

        <PlaygroundColumn>
          <PlaygroundEditor useDarkTheme={useDarkTheme} />
          <PlaygroundError />
        </PlaygroundColumn>
      </PlaygroundRow>
    </PlaygroundProvider>
  );
};

ComponentPlayground.propTypes = {
  code: PropTypes.string,
  previewBackgroundColor: PropTypes.string,
  scope: PropTypes.object,
  theme: PropTypes.string
};

export default ComponentPlayground;
