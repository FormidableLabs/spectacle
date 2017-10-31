import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getStyles } from '../utils/base';
import styled from 'react-emotion';

import '../utils/prismImport';
import { Editor } from 'react-live';

const StyledWrapper = styled.div(props => props.styles);
const StyledEditor = styled(Editor)(props => props.styles);

export default class CodePane extends Component {
  render() {
    const useDarkTheme = this.props.theme === 'dark';

    if (useDarkTheme) {
      require('../themes/default/prism.dark.css');
    } else {
      require('../themes/default/prism.light.css');
    }

    const wrapperStyles = [
      this.context.styles.components.codePane.wrapper,
      getStyles.call(this),
      this.props.style
    ];

    return (
      <StyledWrapper
        className={`react-live react-live-${useDarkTheme ? 'dark' : 'light'} ${this.props.className}`}
        styles={wrapperStyles}
      >
        <StyledEditor
          code={this.props.source}
          language={this.props.lang}
          contentEditable={this.props.contentEditable}
          styles={this.context.styles.components.codePane.editor}
        />
      </StyledWrapper>
    );
  }
}

CodePane.contextTypes = {
  styles: PropTypes.object,
  store: PropTypes.object
};

CodePane.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  contentEditable: PropTypes.bool,
  lang: PropTypes.string,
  source: PropTypes.string,
  style: PropTypes.object,
  theme: PropTypes.string,
};

CodePane.defaultProps = {
  theme: 'dark',
  className: '',
  contentEditable: false,
  lang: 'markup',
  source: '',
};
