import * as React from 'react';
import * as StyledSystem from 'styled-system';

export const Image: React.FC<React.ImgHTMLAttributes<Record<string, unknown>> &
  StyledSystem.LayoutProps &
  StyledSystem.PositionProps>;

export const FullSizeImage: React.FC<React.ImgHTMLAttributes<
  Record<string, unknown>
> &
  StyledSystem.LayoutProps &
  StyledSystem.PositionProps>;
