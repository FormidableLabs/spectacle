import React, {
  useState,
  useEffect,
  forwardRef,
  useMemo,
  useCallback,
  createContext,
  ElementType
} from 'react';
import styled, { CSSObject, ThemeProvider } from 'styled-components';
import { ulid } from 'ulid';
import { useCollectSlides } from '../../hooks/use-slides';
import useAspectRatioFitting from '../../hooks/use-aspect-ratio-fitting';
import useDeckState, {
  DeckStateAndActions,
  DeckView
} from '../../hooks/use-deck-state';
import useMousetrap from '../../hooks/use-mousetrap';
import useLocationSync from '../../hooks/use-location-sync';
import { mergeTheme } from '../../theme';
import * as queryStringMapFns from '../../location-map-fns/query-string';
import {
  overviewFrameStyle,
  overviewWrapperStyle,
  printFrameStyle,
  printWrapperStyle
} from './deck-styles';
import { useAutoPlay } from '../../utils/use-auto-play';
import defaultTheme, {
  SpectacleThemeOverrides
} from '../../theme/default-theme';
import { defaultTransition, SlideTransition } from '../transitions';
import { SwipeEventData } from 'react-swipeable';
import { MarkdownComponentMap } from '../../utils/mdx-component-mapper';

export const DeckContext = createContext<{
  deckId: string | number;
  slideCount: number;
  useAnimations: boolean;
  slidePortalNode: React.ReactNode;
  onSlideClick(e: Event, slideId: SlideId): void;
  onMobileSlide(eventData: SwipeEventData): void;
  theme?: SpectacleThemeOverrides & MarkdownThemeOverrides;
  frameOverrideStyle: React.CSSProperties;
  wrapperOverrideStyle: React.CSSProperties;
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
}>(null);
const noop = () => {};

/**
 * The PDF DPI is 96. We want to scale the slide down because it's a 1:1 px to 1/100th of an inch.
 * However there are some unchangeable margins that make 0.96 too big, so we use 0.959 to prevent overflow.
 */
const DEFAULT_PRINT_SCALE = 0.959;
const DEFAULT_OVERVIEW_SCALE = 0.25;

type PortalProps = {
  fitAspectRatioStyle: CSSObject;
  overviewMode: boolean;
  printMode: boolean;
};
const Portal = styled.div<PortalProps>(
  ({ fitAspectRatioStyle, overviewMode, printMode }) => [
    !printMode && { overflow: 'hidden' },
    !printMode && fitAspectRatioStyle,
    overviewMode && {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      alignContent: 'flex-start',
      transform: 'scale(1)',
      overflowY: 'scroll',
      width: '100%',
      height: '100%'
    },
    printMode && {
      display: 'block'
    }
  ]
);

export const DeckInternal = forwardRef<DeckRef, DeckInternalProps>(
  (
    {
      id: userProvidedId,
      className = '',
      backdropStyle: userProvidedBackdropStyle,
      overviewMode = false,
      printMode = false,
      exportMode = false,
      overviewScale = DEFAULT_OVERVIEW_SCALE,
      printScale = DEFAULT_PRINT_SCALE,
      template,
      theme: {
        Backdrop: UserProvidedBackdropComponent,
        backdropStyle: themeProvidedBackdropStyle = {
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh'
        },
        suppressBackdropFallback: themeSuppressBackdropFallback,
        ...restTheme
      } = {},

      onSlideClick = noop,
      onMobileSlide = noop,

      disableInteractivity = false,
      notePortalNode,
      useAnimations = true,
      children,
      onActiveStateChange: onActiveStateChangeExternal = noop,
      initialState: initialDeckState = {
        slideIndex: 0,
        stepIndex: 0
      },
      suppressBackdropFallback = false,
      autoPlay = false,
      autoPlayLoop = false,
      autoPlayInterval = 1000,
      transition = defaultTransition
    },
    ref
  ) => {
    const [deckId] = useState(userProvidedId || ulid);
    const {
      width: nativeSlideWidth = defaultTheme.size.width,
      height: nativeSlideHeight = defaultTheme.size.height
    } = restTheme.size || {};

    const {
      initialized,
      pendingView,
      activeView,

      initializeTo,
      skipTo,
      stepForward,
      stepBackward,
      advanceSlide,
      regressSlide,
      commitTransition,
      cancelTransition
    } = useDeckState(initialDeckState);

    const [
      setPlaceholderContainer,
      slideIds,
      slideIdsInitialized
    ] = useCollectSlides();

    // It really is much easier to just expose methods to the outside world that
    // drive the presentation through its state rather than trying to implement a
    // declarative API.
    React.useImperativeHandle(
      ref,
      () => ({
        initialized,
        activeView,
        initializeTo,
        skipTo,
        stepForward,
        stepBackward,
        advanceSlide,
        regressSlide,
        numberOfSlides: slideIds.length
      }),
      [
        initialized,
        activeView,
        initializeTo,
        skipTo,
        stepForward,
        stepBackward,
        advanceSlide,
        regressSlide,
        slideIds
      ]
    );

    useMousetrap(
      disableInteractivity
        ? {}
        : {
            left: () => stepBackward(),
            right: () => stepForward()
          },
      []
    );

    const [syncLocation, onActiveStateChange] = useLocationSync({
      disableInteractivity,
      setState: skipTo,
      ...queryStringMapFns
    });

    useEffect(() => {
      if (!initialized) return;
      onActiveStateChange(activeView);
      onActiveStateChangeExternal(activeView);
    }, [
      initialized,
      activeView,
      onActiveStateChange,
      onActiveStateChangeExternal
    ]);

    useEffect(() => {
      const initialView = syncLocation({
        slideIndex: 0,
        stepIndex: 0
      });
      initializeTo(initialView);
    }, [initializeTo, syncLocation]);

    useAutoPlay({
      enabled: autoPlay,
      loop: autoPlayLoop,
      interval: autoPlayInterval,
      navigation: {
        skipTo,
        stepForward,
        isFinalSlide: activeView.slideIndex === slideIds.length - 1
      }
    });

    const handleSlideClick = useCallback(
      (e, slideId) => {
        const slideIndex = slideIds.indexOf(slideId);
        onSlideClick(e, slideIndex);
      },
      [onSlideClick, slideIds]
    );

    const activeSlideId = slideIds[activeView.slideIndex];
    const pendingSlideId = slideIds[pendingView.slideIndex];

    const [passed, upcoming] = useMemo(() => {
      const p = new Set<SlideId>();
      const u = new Set<SlideId>();
      let foundActive = false;
      for (const slideId of slideIds) {
        if (foundActive) {
          u.add(slideId);
        } else if (slideId === activeSlideId) {
          foundActive = true;
        } else {
          p.add(slideId);
        }
      }
      return [p, u] as const;
    }, [slideIds, activeSlideId]);

    const fullyInitialized = initialized && slideIdsInitialized;

    // Slides don't actually render their content to their position in the DOM-
    // they render to this `portalNode` element. The only thing they actually
    // render to their "natural" DOM location is a placeholder node which we use
    // below to enumerate them.
    //
    // The main reason for this is so that we can be absolutely sure that no
    // intermediate areas of the tree end up breaking styling, while still
    // allowing users to organize their slides via component nesting:
    //
    //     const ContentSlides = () => (
    //       <>
    //         <Slide>First Slide</Slide>
    //         <p>This text will never appear, because it's not part of a Slide.<p>
    //         <Slide>Second Slide</Slide>
    //       </>
    //     );
    //
    //     const Presentation = () => (
    //       <Deck>
    //         <Slide>Title Slide</Slide>
    //         <ContentSlides />
    //         <Slide>Conclusion Slide</Slide>
    //       </Deck>
    //     );
    const [slidePortalNode, setSlidePortalNode] = React.useState<
      HTMLDivElement
    >();

    const [backdropRef, fitAspectRatioStyle] = useAspectRatioFitting({
      targetWidth: nativeSlideWidth,
      targetHeight: nativeSlideHeight
    });

    const frameStyle = useMemo(() => {
      const options = {
        printScale,
        overviewScale,
        nativeSlideWidth,
        nativeSlideHeight
      };
      if (overviewMode) {
        return overviewFrameStyle(options);
      } else if (printMode) {
        return printFrameStyle(options);
      }
      return {};
    }, [
      nativeSlideHeight,
      nativeSlideWidth,
      overviewMode,
      overviewScale,
      printMode,
      printScale
    ]);

    const wrapperStyle = useMemo(() => {
      if (overviewMode) {
        return overviewWrapperStyle({ overviewScale });
      } else if (printMode) {
        return printWrapperStyle({ printScale });
      }
      return {};
    }, [overviewMode, overviewScale, printMode, printScale]);

    // Try to be intelligent about the backdrop background color: we have to use
    // inline styles, which will take precedence over all other styles. So, we do
    // as much as we can here to detect if a backdrop color has been provided, or
    // if the user has provided a custom backdrop component (in which case they're
    // responsible for styling it properly.) If we don't detect an appropriate
    // case, then we apply the inline style.
    //
    // Yes, this is slightly awkward, but IMO adding an additional `<div>` element
    // would be even more awkward.
    let useFallbackBackdropStyle = true;
    const backdropStyle = themeProvidedBackdropStyle;
    let BackdropComponent = 'div' as React.ElementType;
    if (userProvidedBackdropStyle) {
      Object.assign(backdropStyle, userProvidedBackdropStyle);
      if (backdropStyle['background'] || backdropStyle['backgroundColor']) {
        useFallbackBackdropStyle = false;
      }
    }
    if (UserProvidedBackdropComponent) {
      BackdropComponent = UserProvidedBackdropComponent;
      useFallbackBackdropStyle = false;
    }
    if (
      useFallbackBackdropStyle &&
      !suppressBackdropFallback &&
      !themeSuppressBackdropFallback
    ) {
      backdropStyle['backgroundColor'] = 'black';
    }

    return (
      <ThemeProvider
        theme={mergeTheme({
          theme: restTheme,
          printMode: printMode && !exportMode
        })}
      >
        <BackdropComponent
          ref={backdropRef}
          className={className}
          style={{
            ...backdropStyle,
            overflow: 'hidden'
          }}
        >
          <Portal
            ref={setSlidePortalNode}
            overviewMode={overviewMode}
            printMode={printMode}
            fitAspectRatioStyle={fitAspectRatioStyle}
          />
          <DeckContext.Provider
            value={{
              deckId,
              slideCount: slideIds.length,
              useAnimations,
              slidePortalNode,
              onSlideClick: handleSlideClick,
              onMobileSlide: onMobileSlide,
              theme: restTheme,

              frameOverrideStyle: frameStyle,
              wrapperOverrideStyle: wrapperStyle,

              backdropNode: backdropRef.current,
              notePortalNode,
              initialized: fullyInitialized,
              passedSlideIds: passed,
              upcomingSlideIds: upcoming,
              activeView: {
                ...activeView,
                slideId: activeSlideId
              },
              pendingView: {
                ...pendingView,
                slideId: pendingSlideId
              },
              skipTo,
              stepForward,
              advanceSlide,
              regressSlide,
              commitTransition,
              cancelTransition,
              transition,
              template
            }}
          >
            <div ref={setPlaceholderContainer} style={{ display: 'none' }}>
              {children}
            </div>
          </DeckContext.Provider>
        </BackdropComponent>
      </ThemeProvider>
    );
  }
);

export const Deck = DeckInternal as React.FC<
  DeckProps & React.RefAttributes<DeckRef>
>;

Deck.displayName = 'Deck';

export type TemplateFn = (options: {
  slideNumber: number;
  numberOfSlides: number;
}) => React.ReactNode;
export type SlideId = string | number;
type MarkdownThemeOverrides = {
  markdownComponentMap?: MarkdownComponentMap;
};
type BackdropOverrides = {
  Backdrop?: ElementType;
  backdropStyle?: CSSObject;
  suppressBackdropFallback?: boolean;
};

export type DeckRef = Omit<
  DeckStateAndActions,
  'pendingView' | 'commitTransition' | 'cancelTransition'
> & {
  numberOfSlides: number;
};
export type DeckProps = {
  id?: string | number;
  className?: string;
  children: React.ReactNode;
  autoPlay?: boolean;
  autoPlayLoop?: boolean;
  autoPlayInterval?: number;
  theme?: SpectacleThemeOverrides & MarkdownThemeOverrides & BackdropOverrides;
  template?: TemplateFn | React.ReactNode;
  printScale?: number;
  overviewScale?: number;
  transition?: SlideTransition;
  suppressBackdropFallback?: boolean;
};
/**
 * These types are only used internally,
 * and are not officially part of the public API
 */
export type DeckInternalProps = DeckProps & {
  initialState?: DeckView;
  printMode?: boolean;
  exportMode?: boolean;
  overviewMode?: boolean;
  onSlideClick?(e: Event, slideId: SlideId): void;
  onMobileSlide?(eventData: SwipeEventData): void;
  disableInteractivity?: boolean;
  useAnimations?: boolean;
  notePortalNode?: HTMLDivElement;
  backdropStyle?: Partial<CSSStyleDeclaration>;
  onActiveStateChange?: (activeView: DeckView) => void;
};

export default Deck;
