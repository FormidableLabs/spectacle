import React, { Component, PropTypes } from "react";
import markdownToReact from "markdown-to-react-components";

import BlockQuote from "./block-quote";
import CodePane from "./code-pane";
import Code from "./code";
import Heading from "./heading";
import Image from "./image";
import Link from "./link";
import List from "./list";
import ListItem from "./list-item";
import Quote from "./quote";
import S from "./s";
import Text from "./text";

const _Heading = (size) => {
  const component = ({ children }) => <Heading size={size}>{children}</Heading>;
  component.propTypes = { children: PropTypes.node };
  return component;
};

const _S = (type) => {
  const component = ({ children }) => <S type={type}>{children}</S>;
  component.propTypes = { children: PropTypes.node };
  return component;
};

const _CombineBlockQuote = ({ children }) => <BlockQuote><Quote>{children}</Quote></BlockQuote>;
_CombineBlockQuote.propTypes = { children: PropTypes.node };

markdownToReact.configure({
  a: Link,
  blockquote: _CombineBlockQuote,
  code: CodePane,
  del: _S("strikethrough"),
  em: _S("italic"),
  h1: _Heading(1),
  h2: _Heading(2),
  h3: _Heading(3),
  h4: _Heading(4),
  h5: _Heading(5),
  h6: _Heading(6),
  img: Image,
  inlineCode: Code,
  li: ListItem,
  p: Text,
  strong: _S("bold"),
  ul: List
});

export default class Markdown extends Component {
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object
  };

  static defaultProps = {
    style: {}
  };

  render() {
    const { style, children } = this.props;
    return (
      <div style={style}>
        { markdownToReact(children).tree }
      </div>
    );
  }
}
