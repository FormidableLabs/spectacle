import * as React from 'react';
import propTypes from 'prop-types';
import marksy from 'marksy';
import mdxComponentMap from '../utils/mdx-component-mapper';
import indentNormalizer from '../utils/indent-normalizer';
import { CodePane, Slide } from '../index';

const _CodePane = ({ language, code }) => (
  <CodePane language={language}>{code}</CodePane>
);

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
