/* eslint-disable react/prop-types */
import * as React from 'react';
import styled, { ThemeContext, ThemeProvider, css } from 'styled-components';
import { ulid } from 'ulid';
import { useCollectSlides } from '../../hooks/use-slides';
import useAspectRatioFitting from '../../hooks/use-aspect-ratio-fitting';
import useDeckState from '../../hooks/use-deck-state';
import useMousetrap from '../../hooks/use-mousetrap';
import useLocationSync from '../../hooks/use-location-sync';
import { mergeTheme } from '../../theme';
import * as queryStringMapFns from '../../location-map-fns/query-string';
import { boxShadow } from 'styled-system';

export const DeckContext = React.createContext();
const noop = () => {};

const Portal = styled('div')(({ fitAspectRatioStyle, overviewMode }) => [
  { overflow: 'hidden' },
  fitAspectRatioStyle,
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
  }
]);

const Deck = React.forwardRef(
  (
    {
      id: userProvidedId,
      className = '',
      backdropStyle: userProvidedBackdropStyle,
      overviewMode = false,
      overviewScale = 0.25,
      template,
      theme: {
        slideDimensions: [nativeSlideWidth, nativeSlideHeight] = [1366, 768],
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

      disableInteractivity = false,
      notePortalNode,
      useAnimations = true,
      children,
      onActiveStateChange: onActiveStateChangeExternal = noop,
      initialState: initialDeckState = {
        slideIndex: 0,
        stepIndex: 0
      },
      suppressBackdropFallback = false
    },
    ref
  ) => {
    const [deckId] = React.useState(userProvidedId || ulid);

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

    React.useEffect(() => {
      if (!initialized) return;
      onActiveStateChange(activeView);
      onActiveStateChangeExternal(activeView);
    }, [
      initialized,
      activeView,
      onActiveStateChange,
      onActiveStateChangeExternal
    ]);

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
        regressSlide
      }),
      [
        initialized,
        activeView,
        initializeTo,
        skipTo,
        stepForward,
        stepBackward,
        advanceSlide,
        regressSlide
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

    React.useEffect(() => {
      const initialView = syncLocation({
        slideIndex: 0,
        stepIndex: 0
      });
      initializeTo(initialView);
    }, [initializeTo, syncLocation]);

    const [
      setPlaceholderContainer,
      slideIds,
      slideIdsInitialized
    ] = useCollectSlides();

    const handleSlideClick = React.useCallback(
      slideId => {
        const slideIndex = slideIds.indexOf(slideId);
        onSlideClick(slideIndex);
      },
      [onSlideClick, slideIds]
    );

    const activeSlideId = slideIds[activeView.slideIndex];
    const pendingSlideId = slideIds[pendingView.slideIndex];

    const [passed, upcoming] = React.useMemo(() => {
      const p = new Set();
      const u = new Set();
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
      return [p, u];
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
    const [slidePortalNode, setSlidePortalNode] = React.useState();

    const [backdropRef, fitAspectRatioStyle] = useAspectRatioFitting({
      targetWidth: nativeSlideWidth,
      targetHeight: nativeSlideHeight
    });

    const overviewFrameStyle = React.useMemo(
      () => ({
        margin: '1rem',
        width: `${overviewScale * 100}%`,
        height: `${overviewScale * 100}%`,
        display: 'block',
        transform: 'none',
        position: 'relative'
      }),
      [overviewScale]
    );

    const overviewWrapperStyle = React.useMemo(
      () => ({
        width: `${100 / overviewScale}%`,
        height: `${100 / overviewScale}%`,
        transform: `scale(${overviewScale})`,
        transformOrigin: '0px 0px',
        position: 'absolute'
      }),
      [overviewScale]
    );

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
    let BackdropComponent = 'div';
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
      <ThemeProvider theme={mergeTheme(restTheme)}>
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
            fitAspectRatioStyle={fitAspectRatioStyle}
          />
          <DeckContext.Provider
            value={{
              deckId,
              slideCount: slideIds.length,
              useAnimations,
              slidePortalNode,
              onSlideClick: handleSlideClick,
              theme: restTheme,

              frameOverrideStyle: overviewMode ? overviewFrameStyle : {},
              wrapperOverrideStyle: overviewMode ? overviewWrapperStyle : {},

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
              advanceSlide,
              regressSlide,
              commitTransition,
              cancelTransition,
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

Deck.name = Deck.displayName = 'Deck';

export default Deck;
