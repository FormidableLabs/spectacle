import React, {
  useContext,
  useCallback,
  useState,
  useEffect,
  useMemo
} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled, { css, ThemeContext } from 'styled-components';
import { background, color, space } from 'styled-system';
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

const SlideContainer = styled('div')`
  ${color};
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
  display: flex;
  z-index: 0;

  @media print {
    page-break-before: always;
    height: 100vh;
    width: 100vw;
  }

  &:before {
    ${background};
    content: ' ';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    opacity: ${({ backgroundOpacity }) => backgroundOpacity};
  }
`;

const SlideWrapper = styled('div')(
  color,
  space,
  css`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  `
);

const TemplateWrapper = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`;

const AnimatedDiv = styled(animated.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  background: transparent;
  ${({ tabIndex }) =>
    tabIndex === 0 &&
    css`
      &:focus {
        outline: 2px solid white;
      }
    `}
`;

export default function Slide({
  id: userProvidedId,
  children,
  backgroundColor,
  backgroundImage,
  backgroundOpacity,
  backgroundPosition,
  backgroundRepeat,
  backgroundSize,
  padding,
  textColor,
  template,
  className = ''
}) {
  if (useContext(SlideContext)) {
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
    cancelTransition,
    template: deckTemplate
  } = useContext(DeckContext);
  const handleClick = useCallback(() => {
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

  const [animate, setAnimate] = useState(false);

  // If we've already been to this slide, all its elements should be visible; if
  // we haven't gotten to it yet, none of them should be visible. (This helps us
  // handle slides which are exiting but which are still visible while
  // animated.)
  const infinityDirection = isPassed ? Infinity : -Infinity;
  const internalStepIndex = isActive ? activeView.stepIndex : infinityDirection;

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
    isActive,
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
  useEffect(() => {
    if (!willExit) return;
    if (pendingView.slideId === undefined) {
      setAnimate(false);
      cancelTransition();
    } else {
      const isTransitionToNextSlide =
        activeView.slideIndex === pendingView.slideIndex - 1;
      setAnimate(isTransitionToNextSlide);
    }
  }, [willExit, pendingView, cancelTransition, activeView.slideIndex]);

  useEffect(() => {
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

  const target = useMemo(() => {
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

  const theme = useContext(ThemeContext);
  const scaledWrapperOverrideStyle = useMemo(() => {
    if (
      !wrapperOverrideStyle ||
      Object.entries(wrapperOverrideStyle).length === 0
    ) {
      return {};
    }
    const themeSlidePadding = theme?.space?.[padding] || 0;
    return {
      ...wrapperOverrideStyle,
      width: `calc(${wrapperOverrideStyle.width} - ${themeSlidePadding * 2}px)`,
      height: `calc(${wrapperOverrideStyle.height} - ${themeSlidePadding *
        2}px)`
    };
  }, [wrapperOverrideStyle, theme, padding]);

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
            <AnimatedDiv
              ref={setStepContainer}
              onClick={handleClick}
              tabIndex={
                Object.entries(frameOverrideStyle).length > 0 ? 0 : undefined
              }
              style={{ ...springFrameStyle, ...frameOverrideStyle }}
            >
              <SlideContainer
                className={className}
                backgroundColor={backgroundColor}
                backgroundImage={backgroundImage}
                backgroundOpacity={backgroundOpacity}
                backgroundPosition={backgroundPosition}
                backgroundRepeat={backgroundRepeat}
                backgroundSize={backgroundSize}
                color={textColor}
              >
                <TemplateWrapper style={wrapperOverrideStyle}>
                  {(typeof template === 'function' ||
                    typeof deckTemplate === 'function') &&
                    (template || deckTemplate)({
                      slideNumber: 0,
                      numberOfSlides: 0
                    })}
                </TemplateWrapper>
                <SlideWrapper
                  style={scaledWrapperOverrideStyle}
                  padding={padding}
                >
                  {children}
                </SlideWrapper>
              </SlideContainer>
            </AnimatedDiv>,
            slidePortalNode
          )}
      </SlideContext.Provider>
    </>
  );
}

Slide.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  backgroundColor: PropTypes.string,
  backgroundImage: PropTypes.string,
  backgroundOpacity: PropTypes.number,
  backgroundPosition: PropTypes.string,
  backgroundRepeat: PropTypes.string,
  backgroundSize: PropTypes.string,
  children: PropTypes.node.isRequired,
  padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  textColor: PropTypes.string,
  template: PropTypes.func
};

Slide.defaultProps = {
  textColor: 'primary',
  backgroundColor: 'tertiary',
  backgroundOpacity: 1,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  padding: 2
};
