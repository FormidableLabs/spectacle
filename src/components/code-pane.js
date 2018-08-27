import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getStyles } from '../utils/base';
import styled from 'react-emotion';

import '../utils/prism-import';
import { Editor } from 'react-live';

const StyledWrapper = styled.div(props => props.styles);
const StyledEditor = styled(({ syntaxStyles: _, prismTheme: __, ...rest }) => (
  <Editor {...rest} />
))`
  && {
    ${props => props.syntaxStyles} &.builtin-prism-theme {
      ${props => props.prismTheme};
    }
  }
`;

export default class CodePane extends Component {
  handleEditorEvent(evt) {
    evt.stopPropagation();
  }

  render() {
    const useDarkTheme = this.props.theme === 'dark';
    const externalPrismTheme = this.props.theme === 'external';
    const className = `language-${this.props.lang} ${
      externalPrismTheme ? '' : 'builtin-prism-theme'
    } ${this.props.className}`;

    const wrapperStyles = [
      this.context.styles.components.codePane,
      getStyles.call(this),
      this.props.style
    ];

    return (
      <StyledWrapper className={this.props.className} styles={wrapperStyles}>
        <StyledEditor
          className={className}
          code={this.props.source}
          language={this.props.lang}
          contentEditable={this.props.contentEditable}
          syntaxStyles={this.context.styles.components.syntax}
          prismTheme={
            this.context.styles.prism[useDarkTheme ? 'dark' : 'light']
          }
          onKeyDown={this.handleEditorEvent}
          onKeyUp={this.handleEditorEvent}
          onClick={this.handleEditorEvent}
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
  theme: PropTypes.oneOf(['dark', 'light', 'external'])
};

CodePane.defaultProps = {
  className: '',
  contentEditable: false,
  lang: 'markup',
  source: '',
  theme: 'dark'
};
