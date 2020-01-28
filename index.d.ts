// Type definitions for Spectacle 6.0.0
// Project: Formidable Spectacle
// Definitions by: Kylie Stewart and Carlos Kelly

declare module 'spectacle' {
  import * as React from 'react';
  import * as StyledSystem from 'styled-system';

  export type TemplateFn = (options: {
    numberOfSlides: number;
    currentSlide: number;
  }) => React.ReactNode;

  export const Deck: React.FC<{
    children: React.ReactNode;
    animationsWhileGoingBack?: boolean;
    backgroundColor?: string;
    keyboardControls?: 'arrows' | 'space';
    loop?: boolean;
    theme?: Record<string, any>;
    textColor?: string;
    template?: TemplateFn;
  }>;

  export const Slide: React.FC<{
    backgroundColor?: string;
    children: React.ReactNode;
    scaleRatio?: number;
    textColor?: string;
    template?: TemplateFn;
  }>;

  export const Appear: React.FC<{
    children: React.ReactNode;
    elementNum: number;
    transitionEffect: {
      to: Record<string, number | string>;
      from: Record<string, number | string>;
    };
  }>;

  type TypographyProps = {
    children: React.ReactNode;
  } & StyledSystem.ColorProps &
    StyledSystem.TypographyProps &
    StyledSystem.SpaceProps;

  export const Text: React.FC<TypographyProps>;
  export const CodeSpan: React.FC<TypographyProps>;
  export const Heading: React.FC<TypographyProps>;
  export const Link: React.FC<TypographyProps & React.AnchorHTMLAttributes<{}>>;

  type BoxProps = {
    children: React.ReactNode;
  } & StyledSystem.ColorProps &
    StyledSystem.SpaceProps &
    StyledSystem.LayoutProps &
    StyledSystem.PositionProps &
    StyledSystem.BorderProps;

  export const Box: React.FC<BoxProps>;
  export const FlexBox: React.FC<BoxProps & StyledSystem.FlexProps>;
  export const Grid: React.FC<{
    children: React.ReactNode;
  } & StyledSystem.LayoutProps &
    StyledSystem.GridProps &
    StyledSystem.PositionProps>;
}
