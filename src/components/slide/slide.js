/* eslint-disable react/prop-types */
import * as React from 'react';
import ReactDOM from 'react-dom';
import { DeckContext } from '../deck/deck';
import { useSpring, animated } from 'react-spring';
import { useSlide } from '../../hooks/use-slides';
import { useCollectSteps } from '../../hooks/use-steps';
import { GOTO_FINAL_STEP } from '../../hooks/use-deck-state';

const noop = () => {};

export const SlideContext = React.createContext();

const STAGE_RIGHT = 'translateX(-100%)';
const CENTER_STAGE = 'translateX(0%)';
const STAGE_LEFT = 'translateX(100%)';

export default function Slide({
  id: userProvidedId,
  children,
  style: userProvidedSlideStyle = {},
  className = '',
  namedWrapper
}) {
  if (React.useContext(SlideContext)) {
    throw new Error(`Slide components may not be nested within each other.`);
  }

  const { slideId, placeholder } = useSlide(userProvidedId);

  const {
    setStepContainer,
    activationThresholds,
    finalStepIndex
  } = useCollectSteps(slideId);

  const {
    onSlideClick = noop,
    useAnimations,
    slidePortalNode,
    theme: { SlideWrapper: ThemeSlideWrapperComponent, ...restTheme } = {},
    frameOverrideStyle = {},
    wrapperOverrideStyle = {},

    initialized: deckInitialized,
    passedSlideIds,
    upcomingSlideIds,
    activeView,
    pendingView,
    advanceSlide,
    regressSlide,
    commitTransition,
    cancelTransition
  } = React.useContext(DeckContext);

  const handleClick = React.useCallback(() => {
    onSlideClick(slideId);
  }, [onSlideClick, slideId]);

  const isActive = activeView.slideId === slideId;
  const isPending = pendingView.slideId === slideId;
  const isPassed = passedSlideIds.has(slideId);
  const isUpcoming = upcomingSlideIds.has(slideId);

  const willEnter = !isActive && isPending;
  const willExit = isActive && !isPending;

  const slideWillChange = activeView.slideIndex !== pendingView.slideIndex;
  const stepWillChange = activeView.stepIndex !== pendingView.stepIndex;

  const [animate, setAnimate] = React.useState(false);

  // If we've already been to this slide, all its elements should be visible; if
  // we haven't gotten to it yet, none of them should be visible. (This helps us
  // handle slides which are exiting but which are still visible while
  // animated.)
  const internalStepIndex = isActive
    ? activeView.stepIndex
    : isPassed
    ? Infinity
    : -Infinity;

  React.useEffect(() => {
    if (!isActive) return;
    if (!stepWillChange) return;
    if (slideWillChange) return;

    if (pendingView.stepIndex < 0) {
      setAnimate(false);
      regressSlide();
    } else if (pendingView.stepIndex > finalStepIndex) {
      setAnimate(true);
      advanceSlide();
    } else if (pendingView.stepIndex === GOTO_FINAL_STEP) {
      setAnimate(false);
      commitTransition({
        stepIndex: finalStepIndex
      });
    } else {
      const isSingleForwardStep =
        activeView.stepIndex === pendingView.stepIndex - 1;
      // the step is happening within this slide
      setAnimate(isSingleForwardStep);
      commitTransition();
    }
  }, [
    stepWillChange,
    slideWillChange,
    activeView,
    pendingView,
    finalStepIndex,
    regressSlide,
    advanceSlide,
    commitTransition
  ]);

  // Bounds checking for slides in the presentation.
  React.useEffect(() => {
    if (!willExit) return;
    if (pendingView.slideId === undefined) {
      setAnimate(false);
      cancelTransition();
    } else {
      const isTransitionToNextSlide =
        activeView.slideIndex === pendingView.slideIndex - 1;
      setAnimate(isTransitionToNextSlide);
    }
  }, [willExit, pendingView, cancelTransition]);

  React.useEffect(() => {
    if (!willEnter) return;
    if (finalStepIndex === undefined) return;

    if (pendingView.stepIndex < 0) {
      setAnimate(false);
      commitTransition({
        stepIndex: 0
      });
    } else if (pendingView.stepIndex === GOTO_FINAL_STEP) {
      // Because <Slide> elements enumerate their own steps, nobody else
      // actually knows how many steps are in a slide. So other slides put a
      // value of GOTO_FINAL_STEP in the step index to indicate that the slide
      // should fill in the correct finalStepIndex before we commit the change.
      setAnimate(false);
      commitTransition({
        stepIndex: finalStepIndex
      });
    } else if (pendingView.stepIndex > finalStepIndex) {
      setAnimate(false);
      commitTransition({
        stepIndex: finalStepIndex
      });
    } else {
      const isTransitionFromPreviousSlide =
        activeView.slideIndex === pendingView.slideIndex - 1;
      setAnimate(isTransitionFromPreviousSlide);
      commitTransition();
    }
  }, [willEnter, activeView, pendingView, finalStepIndex, commitTransition]);

  const target = React.useMemo(() => {
    if (isPassed) {
      return [{ transform: STAGE_RIGHT }, { display: 'none' }];
    }
    if (isActive) {
      return {
        transform: CENTER_STAGE,
        display: 'unset'
      };
    }
    if (isUpcoming) {
      return {
        transform: STAGE_LEFT,
        display: 'none'
      };
    }
    return {
      display: 'none'
    };
  }, [isPassed, isActive, isUpcoming]);

  const immediate = !animate || !useAnimations;

  const springFrameStyle = useSpring({
    to: target,
    immediate
  });

  let SlideWrapperComponent = 'div';
  if (namedWrapper && namedWrapper in restTheme) {
    SlideWrapperComponent = restTheme[namedWrapper];
  } else if (ThemeSlideWrapperComponent) {
    SlideWrapperComponent = ThemeSlideWrapperComponent;
  }

  return (
    <>
      {placeholder}
      <SlideContext.Provider
        value={{
          immediate,
          slideId,
          isSlideActive: isActive,
          activationThresholds,
          activeStepIndex: internalStepIndex
        }}
      >
        {slidePortalNode &&
          ReactDOM.createPortal(
            <animated.div
              ref={setStepContainer}
              onClick={handleClick}
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                background: 'white',
                ...springFrameStyle,
                ...frameOverrideStyle
              }}
            >
              <SlideWrapperComponent
                className={className}
                style={{
                  ...userProvidedSlideStyle,
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  ...wrapperOverrideStyle,
                  overflow: 'scroll'
                }}
              >
                {children}
              </SlideWrapperComponent>
            </animated.div>,
            slidePortalNode
          )}
      </SlideContext.Provider>
    </>
  );
}
