import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getStyles } from '../utils/base';
import Radium from 'radium';
import isUndefined from 'lodash/isUndefined';

const format = (str) => {
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

@Radium
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
    return (
      <pre className={this.props.className} style={[this.context.styles.components.codePane.pre, getStyles.call(this), this.props.style]}>
        <code
          className={`language-${this.props.lang}`}
          style={this.context.styles.components.codePane.code}
          dangerouslySetInnerHTML={this.createMarkup()}
        />
      </pre>
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
