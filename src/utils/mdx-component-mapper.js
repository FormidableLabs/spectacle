import * as React from 'react';
import {
  CodePane,
  Image,
  OrderedList,
  Quote,
  Heading,
  UnorderedList,
  Text,
  ListItem
} from '../components';

const LeftAlignedHeading = props => <Heading {...props} textAlign="left" />;

const mdxComponentMap = {
  p: Text,
  h1: LeftAlignedHeading,
  h2: LeftAlignedHeading,
  h3: LeftAlignedHeading,
  blockquote: Quote,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  img: Image,
  codeblock: CodePane,
  code: CodePane
};

export default mdxComponentMap;
