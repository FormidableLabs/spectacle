import styled from 'styled-components';
import {
  color,
  typography,
  space,
  compose,
  system,
  ColorProps,
  TypographyProps,
  SpaceProps,
  BorderProps
} from 'styled-system';
import { FC } from 'react';

const decoration = system({ textDecoration: true });
type DecorationProps = Pick<CSSStyleDeclaration, 'textDecoration'>;

type CommonProps = ColorProps & TypographyProps & SpaceProps;

const Text = styled('div')(compose(color, typography, space)) as FC<
  CommonProps
>;
Text.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  padding: 0,
  margin: 0
};

const CodeSpan = styled('code')(compose(color, typography, space)) as FC<
  CommonProps
>;
CodeSpan.defaultProps = {
  fontFamily: 'monospace',
  fontSize: 'text'
};

const Link = styled('a')(compose(color, typography, space, decoration)) as FC<
  CommonProps & DecorationProps
>;
Link.defaultProps = {
  fontFamily: 'text',
  fontSize: 'text',
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

const Quote = styled(
  Text as FC<CommonProps & Pick<BorderProps, 'borderColor'>>
)`
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

const listStyle = system({
  listStyleType: true
});
type ListStyleProps = Pick<CSSStyleDeclaration, 'listStyleType'>;

const OrderedList = styled('ol')(
  compose(color, typography, space, listStyle)
) as FC<CommonProps & ListStyleProps>;
OrderedList.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  margin: 0
};

const UnorderedList = styled('ul')(
  compose(color, typography, space, listStyle)
) as FC<CommonProps & ListStyleProps>;
UnorderedList.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  margin: 0
};

const ListItem = styled('li')(compose(color, typography, space)) as FC<
  CommonProps
>;
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
