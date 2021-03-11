/* eslint-disable react/display-name */
import * as React from 'react';
import {
  Appear,
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

const AppearingListItem = props => (
  <Appear>
    <ListItem {...props} />
  </Appear>
);

const mdxComponentMap = {
  p: Text,
  h1: props => <Heading {...props} fontSize="h1" />,
  h2: props => <Heading {...props} fontSize="h2" />,
  h3: props => <Heading {...props} fontSize="h3" />,
  h4: props => <Heading {...props} fontSize="h4" />,
  blockquote: Quote,
  ul: UnorderedList,
  ol: OrderedList,
  li: AppearingListItem,
  img: Image,
  a: Link,
  table: Table,
  tr: TableRow,
  td: TableCell
};

export default mdxComponentMap;
