import * as React from 'react';
import * as StyledSystem from 'styled-system';

type TypographyProps = {
  children: React.ReactNode;
} & StyledSystem.ColorProps &
  StyledSystem.TypographyProps &
  StyledSystem.SpaceProps;

type ListStyleProps = {
  listStyleType?: CSSStyleRule['style']['listStyleType'];
};

export const Text: React.FC<TypographyProps>;
export const CodeSpan: React.FC<TypographyProps>;
export const Heading: React.FC<TypographyProps>;
export const ListItem: React.FC<TypographyProps>;
export const Quote: React.FC<TypographyProps>;
export const OrderedList: React.FC<TypographyProps & ListStyleProps>;
export const UnorderedList: React.FC<TypographyProps & ListStyleProps>;
export const Link: React.FC<TypographyProps &
  React.AnchorHTMLAttributes<Record<string, unknown>>>;
