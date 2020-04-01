import styled from 'styled-components';
import { color, typography, space, compose, system } from 'styled-system';

const decoration = system({ textDecoration: true });

const Text = styled('div')(compose(color, typography, space));
Text.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  padding: 0,
  margin: 0
};

const CodeSpan = styled('code')(compose(color, typography, space));
CodeSpan.defaultProps = {
  fontFamily: 'monospace',
  fontSize: 'text'
};

const Link = styled('a')(compose(color, typography, space, decoration));
Link.defaultProps = {
  ...Text.defaultProps,
  textDecoration: 'underline',
  color: 'quaternary'
};

const Heading = styled(Text)({});
Heading.defaultProps = {
  color: 'secondary',
  fontFamily: 'header',
  fontSize: 'h1',
  fontWeight: 'bold',
  textAlign: 'center',
  margin: 1
};

const Quote = styled(Text)`
  border-left: 1px solid
    ${({ theme, borderColor }) => borderColor || theme.colors.secondary};

  div {
    margin: 0;
  }
`;
Quote.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  fontStyle: 'italic',
  padding: '16px 0 16px 8px',
  margin: 0
};

const OrderedList = styled('ol')(compose(color, typography, space));
OrderedList.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  margin: 0
};

const UnorderedList = styled('ul')(compose(color, typography, space));
UnorderedList.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  margin: 0
};

const ListItem = styled('li')(compose(color, typography, space));

ListItem.defaultProps = {
  margin: 0
};

export {
  Text,
  Heading,
  Quote,
  OrderedList,
  UnorderedList,
  ListItem,
  Link,
  CodeSpan
};
