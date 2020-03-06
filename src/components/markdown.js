import * as React from 'react';
import propTypes from 'prop-types';
import marksy from 'marksy';
import mdxComponentMap from '../utils/mdx-component-mapper';
import indentNormalizer from '../utils/indent-normalizer';
import { CodePane } from '../index';

const _CodePane = ({ language, code }) => (
  <CodePane autoFillHeight language={language}>
    {code}
  </CodePane>
);

_CodePane.propTypes = {
  code: propTypes.string.isRequired,
  language: propTypes.string.isRequired
};

const compile = marksy({
  createElement: React.createElement,
  elements: {
    ...mdxComponentMap,
    codeblock: _CodePane,
    code: _CodePane
  }
});

const Markdown = props => {
  return <>{compile(indentNormalizer(props.children)).tree}</>;
};

Markdown.propTypes = {
  children: propTypes.string.isRequired,
  containsSlides: propTypes.bool
};

export default Markdown;
