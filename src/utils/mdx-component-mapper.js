/* eslint-disable react/display-name */
import * as React from 'react';
import {
  CodePane,
  Image,
  OrderedList,
  Quote,
  Heading,
  UnorderedList,
  Text,
  ListItem,
  Link,
  CodeSpan
} from '../';

const mdxComponentMap = {
  p: Text,
  h1: props => <Heading {...props} fontSize="h1" />,
  h2: props => <Heading {...props} fontSize="h2" />,
  h3: props => <Heading {...props} fontSize="h3" />,
  h4: props => <Heading {...props} fontSize="h4" />,
  blockquote: Quote,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  img: Image,
  a: Link,
  codeblock: CodePane,
  code: CodePane,
  inlineCode: CodeSpan
};

export default mdxComponentMap;
