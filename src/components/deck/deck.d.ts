import * as React from 'react';
import { SlideTransition } from '../transitions';
import { TemplateFn } from '../slide/slide';

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

declare const Deck: React.FC<{
  children: React.ReactNode;
  autoPlay?: boolean;
  autoPlayLoop?: boolean;
  autoPlayInterval?: number;
  theme?: Record<string, any>;
  template?: TemplateFn | React.ReactNode;
  printScale?: number;
  transition?: SlideTransition;
}>;

export default Deck;
