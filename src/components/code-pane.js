import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getStyles } from '../utils/base';
import isUndefined from 'lodash/isUndefined';
import styled from 'react-emotion';

const format = (str) => {
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

const StyledPre = styled.pre(props => props.styles);
const StyledCode = styled.code(props => props.styles);

export default class CodePane extends Component {
  componentDidMount() {
    return window.Prism && window.Prism.highlightAll();
  }
  createMarkup() {
    const { source, children } = this.props;
    const code = (isUndefined(source) || source === '') ? children : source;
    return {
      __html: format(code)
    };
  }
  render() {
    const preStyles = [
      this.context.styles.components.codePane.pre,
      getStyles.call(this),
      this.props.style
    ];
    return (
      <StyledPre
        className={this.props.className}
        styles={preStyles}
      >
        <StyledCode
          className={`language-${this.props.lang}`}
          styles={this.context.styles.components.codePane.code}
          dangerouslySetInnerHTML={this.createMarkup()}
        />
      </StyledPre>
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
  lang: PropTypes.string,
  source: PropTypes.string,
  style: PropTypes.object
};

CodePane.defaultProps = {
  lang: 'markup',
  source: ''
};
