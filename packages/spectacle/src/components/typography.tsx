import styled, { CSSObject } from 'styled-components';
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
import { FC, PropsWithChildren } from 'react';
export { FitText } from './typography/fit-text';

const decoration = system({ textDecoration: true });
type DecorationProps = Pick<CSSObject, 'textDecoration'>;

export type CommonTypographyProps = ColorProps & TypographyProps & SpaceProps;

const Text = styled.div<CommonTypographyProps>(
  compose(color, typography, space)
);
Text.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  padding: 0,
  margin: 0
};

const CodeSpan = styled.code<CommonTypographyProps>(
  compose(color, typography, space)
);
CodeSpan.defaultProps = {
  fontFamily: 'monospace',
  fontSize: 'text'
};

const Link = styled.a<CommonTypographyProps & DecorationProps>(
  compose(color, typography, space, decoration)
);
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
  Text as FC<
    PropsWithChildren<CommonTypographyProps & Pick<BorderProps, 'borderColor'>>
  >
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
type ListStyleProps = Pick<CSSObject, 'listStyleType'>;

const OrderedList = styled.ol<CommonTypographyProps & ListStyleProps>(
  compose(color, typography, space, listStyle)
);
OrderedList.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  margin: 0
};

const UnorderedList = styled.ul<CommonTypographyProps & ListStyleProps>(
  compose(color, typography, space, listStyle)
);
UnorderedList.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  margin: 0
};

const ListItem = styled.li<CommonTypographyProps>(
  compose(color, typography, space)
);
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
