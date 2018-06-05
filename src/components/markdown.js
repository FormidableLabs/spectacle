import React, { createElement, Component } from 'react';
import PropTypes from 'prop-types';
import { getStyles } from '../utils/base';
import marksy from 'marksy';
import styled from 'react-emotion';

import BlockQuote from './block-quote';
import CodePane from './code-pane';
import Code from './code';
import Heading from './heading';
import Image from './image';
import Link from './link';
import List from './list';
import ListItem from './list-item';
import Quote from './quote';
import S from './s';
import Text from './text';

import Table from './table';
import TableHeader from './table-header';
import TableRow from './table-row';
import TableHeaderItem from './table-header-item';
import TableBody from './table-body';
import TableItem from './table-item';

const Container = styled.div(props => props.styles);

const _Heading = size => {
  const component = ({ children }) => <Heading size={size}>{children}</Heading>;
  component.propTypes = { children: PropTypes.node };
  return component;
};

const _S = type => {
  const component = ({ children }) => <S type={type}>{children}</S>;
  component.propTypes = { children: PropTypes.node };
  return component;
};

const _CombineBlockQuote = ({ children }) => (
  <BlockQuote>
    <Quote>{children}</Quote>
  </BlockQuote>
);
_CombineBlockQuote.propTypes = { children: PropTypes.node };

const _CodePane = ({ language, code }) => (
  <CodePane lang={language} source={code} />
);
_CodePane.propTypes = { code: PropTypes.string, language: PropTypes.string };

const compile = marksy({
  createElement,
  elements: {
    a: Link,
    blockquote: _CombineBlockQuote,
    code: _CodePane,
    del: _S('strikethrough'),
    em: _S('italic'),
    h1: _Heading(1),
    h2: _Heading(2),
    h3: _Heading(3),
    h4: _Heading(4),
    h5: _Heading(5),
    h6: _Heading(6),
    img: Image,
    codespan: Code,
    li: ListItem,
    p: Text,
    strong: _S('bold'),
    ul: List,
    table: Table,
    thead: TableHeader,
    th: TableHeaderItem,
    tbody: TableBody,
    tr: TableRow,
    td: TableItem
  }
});

export default class Markdown extends Component {
  static propTypes = {
    children: PropTypes.node,
    source: PropTypes.string,
    style: PropTypes.object
  };

  static contextTypes = {
    styles: PropTypes.object,
    store: PropTypes.object,
    typeface: PropTypes.object
  };

  static defaultProps = {
    style: {}
  };

  render() {
    const { style, children, source } = this.props;
    const styleComputed = [getStyles.call(this), style];

    if (source) {
      return (
        <Container styles={styleComputed}>{compile(source).tree}</Container>
      );
    }
    return (
      <Container styles={styleComputed}>{compile(children).tree}</Container>
    );
  }
}
