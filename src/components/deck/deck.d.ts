import React, { RefAttributes } from 'react';
import { SwipeEventData } from 'react-swipeable';
import { SlideTransition } from '../transitions';
import { DeckStateAndActions, DeckView } from '../../hooks/use-deck-state';

export type SlideId = string | number;

export type TemplateFn = (options: {
  slideNumber: number;
  numberOfSlides: number;
}) => React.ReactNode;

export const DeckContext: React.Context<{
  deckId: number;
  slideCount: number;
  useAnimations: boolean;
  slidePortalNode: React.ReactNode;
  onSlideClick(e: Event, slideId: SlideId): void;
  onMobileSlide(eventData: SwipeEventData): void;
  theme: Record<string, string | number | number[]>;
  frameOverrideStyle: Record<string, string | number>;
  wrapperOverrideStyle: Record<string, string | number>;
  backdropNode: React.ReactNode;
  notePortalNode: React.ReactNode;
  initialized: boolean;
  passedSlideIds: Set<SlideId>;
  upcomingSlideIds: Set<SlideId>;
  activeView: {
    slideId: SlideId;
    slideIndex: number;
    stepIndex: number;
  };
  pendingView: {
    slideId: SlideId;
    slideIndex: number;
    stepIndex: number;
  };
  skipTo(options: { slideIndex: number; stepIndex: number }): void;
  stepForward(): void;
  advanceSlide(): void;
  regressSlide(): void;
  commitTransition(newView?: { stepIndex: number }): void;
  cancelTransition(): void;
  template: TemplateFn | React.ReactNode;
  transition: SlideTransition;
}>;

export type DeckRef = DeckStateAndActions & { numberOfSlides: number };

export type DeckProps = {
  children: React.ReactNode;
  autoPlay?: boolean;
  autoPlayLoop?: boolean;
  autoPlayInterval?: number;
  theme?: Record<string, any>;
  template?: TemplateFn | React.ReactNode;
  printScale?: number;
  transition?: SlideTransition;
};

declare const Deck: React.FC<DeckProps & RefAttributes<DeckRef>>;

export const DeckInternal: React.FC<DeckProps &
  RefAttributes<DeckRef> & {
    printMode?: boolean;
    exportMode?: boolean;
    overviewMode?: boolean;
    onSlideClick(e: Event, slideId: SlideId): void;
    onMobileSlide(eventData: SwipeEventData): void;
    disableInteractivity?: boolean;
    useAnimations?: boolean;
    notePortalNode?: HTMLDivElement;
    backdropStyle?: Partial<CSSStyleDeclaration>;
    onActiveStateChange?: (activeView: DeckView) => void;
  }>;

export default Deck;
