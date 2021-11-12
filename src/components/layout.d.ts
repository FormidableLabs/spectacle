import * as React from 'react';
import * as StyledSystem from 'styled-system';

type BoxProps = {
  children?: React.ReactNode;
} & StyledSystem.ColorProps &
  StyledSystem.SpaceProps &
  StyledSystem.LayoutProps &
  StyledSystem.PositionProps &
  StyledSystem.BorderProps;

export const Box: React.FC<BoxProps>;
export const FlexBox: React.FC<BoxProps & StyledSystem.FlexboxProps>;
export const Grid: React.FC<{
  children: React.ReactNode;
} & StyledSystem.LayoutProps &
  StyledSystem.GridProps &
  StyledSystem.PositionProps>;
