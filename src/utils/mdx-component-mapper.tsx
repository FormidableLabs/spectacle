/* eslint-disable react/display-name */
import * as React from 'react';
import {
  Heading,
  Image,
  Link,
  ListItem,
  OrderedList,
  Quote,
  Table,
  TableCell,
  TableRow,
  Text,
  UnorderedList
} from '../';

export type MarkdownComponentMap = Record<
  | 'p'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'blockquote'
  | 'ul'
  | 'ol'
  | 'li'
  | 'img'
  | 'a'
  | 'table'
  | 'tr'
  | 'td',
  React.ElementType
>;

const mdxComponentMap: MarkdownComponentMap = {
  p: Text,
  h1: (props) => <Heading {...props} fontSize="h1" />,
  h2: (props) => <Heading {...props} fontSize="h2" />,
  h3: (props) => <Heading {...props} fontSize="h3" />,
  h4: (props) => <Heading {...props} fontSize="h4" />,
  blockquote: Quote,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  img: Image,
  a: Link,
  table: Table,
  tr: TableRow,
  td: TableCell
};

export default mdxComponentMap;
