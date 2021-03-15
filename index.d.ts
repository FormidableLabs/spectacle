// Type definitions for Spectacle 7.0.0
// Project: Formidable Spectacle
// Definitions by: Kylie Stewart, Urmit Patel, and Carlos Kelly

declare module 'spectacle' {
  import * as React from 'react';
  import * as StyledSystem from 'styled-system';

  export type TemplateFn = (options: {
    numberOfSlides: number;
    currentSlide: number;
  }) => React.ReactNode;

  export const Deck: React.FC<{
    children: React.ReactNode;
    autoPlay?: boolean;
    autoPlayLoop?: boolean;
    autoPlayInterval?: number;
    theme?: Record<string, any>;
    template?: TemplateFn | React.ReactNode;
    printScale?: number;
  }>;

  export const Slide: React.FC<{
    backgroundColor?: string;
    backgroundImage?: string;
    backgroundOpacity?: number;
    backgroundPosition?: string;
    backgroundRepeat?: string;
    backgroundSize?: string;
    children: React.ReactNode;
    padding?: string | number;
    textColor?: string;
    template?: TemplateFn | React.ReactNode;
  }>;

  export const Appear: React.FC<{
    children: React.ReactNode;
    stepIndex?: number;
  }>;

  export const CodePane: React.FC<{
    children: React.ReactNode;
    language: string;
    theme?: Record<string, unknown> | string;
    stepIndex?: number;
    highlightRanges: number | number[];
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
  export const Link: React.FC<TypographyProps &
    React.AnchorHTMLAttributes<Record<string, unknown>>>;

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

  export const Image: React.FC<React.ImgHTMLAttributes<
    Record<string, unknown>
  > &
    StyledSystem.LayoutProps &
    StyledSystem.PositionProps>;

  export const FullSizeImage: React.FC<React.ImgHTMLAttributes<
    Record<string, unknown>
  > &
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
    animateListItems?: boolean;
    children: React.ReactNode;
  }>;

  export const MarkdownSlide: React.FC<{
    animateListItems?: boolean;
    children: React.ReactNode;
  }>;

  export const MarkdownSlideSet: React.FC<{
    animateListItems?: boolean;
    children: React.ReactNode;
  }>;

  export const SpectacleLogo: React.FC<{
    size: number;
  }>;
}
