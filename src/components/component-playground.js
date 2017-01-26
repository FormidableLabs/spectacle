import React, { Component, PropTypes } from "react";
import { render } from "react-dom";
import Playground from "component-playground";
import styled from "styled-components";
import "../themes/default/playground.css";
import "../themes/default/codemirror.css";
import { defaultCode } from "../utils/playground.default-code";

const ComponentPlaygroundContainer = styled.div`
  background: ${(props) => (
    props.previewBackgroundColor || "#fff"
  )};
  border-radius: 0 0 6px 6px;
  height: 100%;
  width: 100%;
`;

const ComponentPlayground = ({
  code,
  previewBackgroundColor,
  theme = "dark"
}) => {
  const useDarkTheme = theme === "dark";

  if (useDarkTheme) {
    require("../themes/default/dark.codemirror.css");
  } else {
    require("../themes/default/light.codemirror.css");
  }

  return (
    <ComponentPlaygroundContainer
      className={`theme-${theme}`}
      previewBackgroundColor={previewBackgroundColor}
    >
      <Playground
        codeText={(code || defaultCode).trim()}
        scope={{ React, Component, render }}
        noRender={false}
        theme={useDarkTheme ? "material" : "elegant"}
      />
    </ComponentPlaygroundContainer>
  );
};

ComponentPlayground.propTypes = {
  code: PropTypes.string,
  previewBackgroundColor: PropTypes.string,
  theme: PropTypes.string
};

export default ComponentPlayground;
