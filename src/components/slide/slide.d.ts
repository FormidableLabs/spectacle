import * as React from 'react';
import { SlideTransition } from '../transitions';

export type TemplateFn = (options: {
  numberOfSlides: number;
  currentSlide: number;
}) => React.ReactNode;

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

export const SlideContext: React.Context<{
  immediate: boolean;
  slideId: number;
  isSlideActive: boolean;
  activationThresholds: number;
  activeStepIndex: number;
}>;
