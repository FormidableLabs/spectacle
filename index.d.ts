// Type definitions for Spectacle 8.0.0
// Project: Formidable Spectacle
// Definitions by: Kylie Stewart, Urmit Patel, Grant Sander, and Carlos Kelly

declare module 'spectacle' {
  import * as React from 'react';
  import * as StyledSystem from 'styled-system';
  import { ExtendedKeyboardEvent } from 'mousetrap';

  export type SlideTransition = {
    from: Record<string, string | number>;
    leave: Record<string, string | number>;
    enter: Record<string, string | number>;
  };

  export type TemplateFn = (options: {
    numberOfSlides: number;
    currentSlide: number;
  }) => React.ReactNode;

  export function useMousetrap(
    keybinds: Record<string, (e?: ExtendedKeyboardEvent) => void>,
    deps: any[]
  ): void;

  export const Deck: React.FC<{
    children: React.ReactNode;
    autoPlay?: boolean;
    autoPlayLoop?: boolean;
    autoPlayInterval?: number;
    theme?: Record<string, any>;
    template?: TemplateFn | React.ReactNode;
    printScale?: number;
    transition?: SlideTransition;
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
    transition?: SlideTransition;
  }>;

  export const Appear: React.FC<{
    children: React.ReactNode;
    stepIndex?: number;
  }>;

  export const CodePane: React.FC<{
    children: React.ReactNode;
    language: string;
    theme?: Record<string, unknown>;
    stepIndex?: number;
    highlightRanges?: number | number[];
    showLineNumbers?: boolean;
  }>;

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

  type MdComponentProps = { [key: string]: any };

  export const Markdown: React.FC<{
    animateListItems?: boolean;
    children: React.ReactNode;
    componentProps?: MdComponentProps;
  }>;

  export const MarkdownSlide: React.FC<{
    animateListItems?: boolean;
    children: React.ReactNode;
    componentProps?: MdComponentProps;
  }>;

  export const MarkdownSlideSet: React.FC<{
    animateListItems?: boolean;
    children: React.ReactNode;
    componentProps?: MdComponentProps;
  }>;

  export const SpectacleLogo: React.FC<{
    size: number;
  }>;

  export const defaultTheme: {
    colors: Record<string, string>;
    size: Record<string, number>;
    fonts: Record<string, string>;
    fontSizes: Record<string, string>;
    space: number[];
  };

  export const SlideContext: React.Context<{
    immediate: boolean;
    slideId: number;
    isSlideActive: boolean;
    activationThresholds: number;
    activeStepIndex: number;
  }>;

  export const DeckContext: React.Context<{
    deckId: number;
    slideCount: number;
    useAnimations: boolean;
    slidePortalNode: React.ReactNode;
    onSlideClick(e: Event, slideId: number): void;
    theme: Record<string, string | number | number[]>;
    frameOverrideStyle: Record<string, string | number>;
    wrapperOverrideStyle: Record<string, string | number>;
    backdropNode: React.ReactNode;
    notePortalNode: React.ReactNode;
    initialized: boolean;
    passedSlideIds: number[];
    upcomingSlideIds: number[];
    activeView: {
      slideIndex: number;
      stepIndex: number;
    };
    pendingView: {
      slideIndex: number;
      stepIndex: number;
    };
    skipTo(options: { slideIndex: number; stepIndex: number }): void;
    stepForward(): void;
    advanceSlide(): void;
    regressSlide(): void;
    commitTransition(): void;
    cancelTransition(): void;
    template:
      | React.ReactNode
      | ((options: {
          slideNumber: number;
          numberOfSlides: number;
        }) => React.ReactNode);
    transition: SlideTransition;
  }>;

  export const indentNormalizer: (input: string) => string;
  export const fadeTransition: SlideTransition;
  export const slideTransition: SlideTransition;
}
