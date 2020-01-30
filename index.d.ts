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

  export const CodePane: React.FC<{
    children: React.ReactNode;
    autoFillHeight: boolean;
    fontSize?: number;
    language: string;
    theme?: {
      plain: Record<string, string>;
      styles: Array<{ types: Array<string>; style: Record<string, string> }>;
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
  export const ListItem: React.FC<TypographyProps>;
  export const Quote: React.FC<TypographyProps>;
  export const OrderedList: React.FC<TypographyProps>;
  export const UnorderedList: React.FC<TypographyProps>;
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

  export const Image: React.FC<React.ImgHTMLAttributes<{}> &
    StyledSystem.LayoutProps &
    StyledSystem.PositionProps>;

  export const FullSizeImage: React.FC<React.ImgHTMLAttributes<{}> &
    StyledSystem.LayoutProps &
    StyledSystem.PositionProps>;

  export const Notes: React.FC<{
    children: React.ReactNode;
  }>;

  export const Progress: React.FC<{
    color: string;
    size: number;
  }>;

  export const FullScreen: React.FC<{
    color: string;
    size: number;
  }>;

  export const Markdown: React.FC<{
    children: React.ReactNode;
    containsSlides?: boolean;
  }>;

  export const SpectacleLogo: React.FC<{
    size: number;
  }>;

  export const mdxComponentMap: Record<string, JSX.Element>;

  export const isolateNotes: (content: string) => string;
  export const remoteNotes: (content: string) => string;
}
