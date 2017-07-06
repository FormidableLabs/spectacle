import React, { Component } from 'react';
import PropTypes from 'prop-types';
import marksy from 'marksy';

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
  <BlockQuote><Quote>{children}</Quote></BlockQuote>
);
_CombineBlockQuote.propTypes = { children: PropTypes.node };

const compile = marksy({
  elements: {
    a: Link,
    blockquote: _CombineBlockQuote,
    code: CodePane,
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
    td: TableItem,
  }
});

export default class Markdown extends Component {
  static propTypes = {
    children: PropTypes.node,
    source: PropTypes.string,
    style: PropTypes.object
  };

  static defaultProps = {
    style: {},
  };

  render() {
    const { style, children, source } = this.props;
    if (source) {
      return (
        <div style={style}>
          {compile(source).tree}
        </div>
      );
    }
    return (
      <div style={style}>
        {compile(children).tree}
      </div>
    );
  }
}
