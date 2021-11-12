export type SlideTransition = {
  from: Record<string, string | number>;
  leave: Record<string, string | number>;
  enter: Record<string, string | number>;
};

export const fadeTransition: SlideTransition;
export const slideTransition: SlideTransition;
export const defaultTransition: SlideTransition;
