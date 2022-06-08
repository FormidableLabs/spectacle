import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import ReactDOM from 'react-dom';
import styled, { css, ThemeContext } from 'styled-components';
import {
  background,
  BackgroundProps,
  color,
  ColorProps,
  space,
  SpaceProps
} from 'styled-system';
import { DeckContext, SlideId, TemplateFn } from '../deck/deck';
import { animated, useSpring } from 'react-spring';
import { useSlide } from '../../hooks/use-slides';
import { ActivationThresholds, useCollectSteps } from '../../hooks/use-steps';
import { GOTO_FINAL_STEP } from '../../hooks/use-deck-state';
import { useSwipeable } from 'react-swipeable';
import { SlideTransition } from '../transitions';
import TemplateWrapper from '../template-wrapper';
import { TwoColumn } from './layouts';

const noop = () => {};

export type SlideContextType = {
  immediate: boolean;
  slideId: SlideId;
  isSlideActive: boolean;
  activationThresholds: ActivationThresholds;
  activeStepIndex: number;
};

export const SlideContext = createContext<SlideContextType>(null as any);
SlideContext.displayName = 'SlideContext';

type SlideContainerProps = BackgroundProps &
  ColorProps & { backgroundOpacity: number };

const SlideContainer = styled.div<SlideContainerProps>`
  ${color};
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
  display: flex;
  z-index: 0;

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

const SlideWrapper = styled.div<ColorProps & SpaceProps>(
  color,
  space,
  css`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  `
);

export const AnimatedDiv = styled(animated.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  background: transparent;

  ${({ tabIndex }) =>
    tabIndex === 0 &&
    css`
      outline: 2px solid white;
    `}
`;

const Slide = (props: SlideProps): JSX.Element => {
  const {
    id: userProvidedId,
    children,
    backgroundColor = 'tertiary',
    backgroundImage,
    backgroundOpacity = 1,
    backgroundPosition = 'center',
    backgroundRepeat = 'no-repeat',
    backgroundSize = 'cover',
    padding = 2,
    textColor = 'primary',
    template: slideTemplate,
    transition: slideTransition = {},
    className = ''
  } = props;
  if (useContext(SlideContext)) {
    throw new Error(`Slide components may not be nested within each other.`);
  }

  const slideHasTemplate = slideTemplate !== undefined;
  const { slideId, placeholder } = useSlide(slideHasTemplate, userProvidedId);
  const { setStepContainer, activationThresholds, finalStepIndex } =
    useCollectSteps();
  const {
    onSlideClick = noop,
    onMobileSlide,
    useAnimations,
    slidePortalNode,
    frameOverrideStyle = {},
    wrapperOverrideStyle = {},
    passedSlideIds,
    upcomingSlideIds,
    activeView,
    pendingView,
    advanceSlide,
    regressSlide,
    commitTransition,
    cancelTransition,
    transition,
    template: deckTemplate,
    slideCount,
    backgroundImage: deckBackgroundImage,
    inOverviewMode,
    inPrintMode
  } = useContext(DeckContext);

  const handleClick = useCallback(
    (e) => {
      onSlideClick(e, slideId);
    },
    [onSlideClick, slideId]
  );

  const mergedTransition = useMemo(() => {
    const result = { ...transition };
    'from' in slideTransition && (result.from = slideTransition.from);
    'enter' in slideTransition && (result.enter = slideTransition.enter);
    'leave' in slideTransition && (result.leave = slideTransition.leave);
    return result;
  }, [slideTransition, transition]);

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

  const [hover, setHover] = useState(false);
  const onHoverChange = useCallback(() => {
    setHover(!hover);
  }, [hover]);

  useEffect(() => {
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
      return [mergedTransition.leave, { display: 'none' }];
    }
    if (isActive) {
      return {
        ...mergedTransition.enter,
        display: 'unset'
      };
    }
    if (isUpcoming) {
      return {
        ...mergedTransition.from,
        display: 'none'
      };
    }
    return {
      display: 'none'
    };
  }, [
    isPassed,
    isActive,
    isUpcoming,
    mergedTransition.leave,
    mergedTransition.enter,
    mergedTransition.from
  ]);

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
      height: `calc(${wrapperOverrideStyle.height} - ${
        themeSlidePadding * 2
      }px)`
    };
  }, [wrapperOverrideStyle, theme, padding]);

  const template = slideHasTemplate ? slideTemplate : deckTemplate;
  const templateElement =
    typeof template === 'function'
      ? template({
          slideNumber: activeView.slideIndex + 1,
          numberOfSlides: slideCount
        })
      : template;

  const swipeHandler = useSwipeable({
    onSwiped: (eventData) => onMobileSlide(eventData)
  });
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
              tabIndex={inOverviewMode && isActive ? 0 : undefined}
              style={{
                ...(inOverviewMode || inPrintMode ? {} : springFrameStyle),
                ...frameOverrideStyle,
                ...(inOverviewMode &&
                  hover && {
                    outline: '2px solid white'
                  })
              }}
              onMouseEnter={onHoverChange}
              onMouseLeave={onHoverChange}
            >
              <SlideContainer
                className={className}
                backgroundColor={backgroundColor}
                backgroundImage={backgroundImage || deckBackgroundImage}
                backgroundOpacity={backgroundOpacity}
                backgroundPosition={backgroundPosition}
                backgroundRepeat={backgroundRepeat}
                backgroundSize={backgroundSize}
                color={textColor}
                {...swipeHandler}
              >
                {((slideHasTemplate && isActive) ||
                  inOverviewMode ||
                  inPrintMode) && (
                  <TemplateWrapper style={wrapperOverrideStyle}>
                    {templateElement}
                  </TemplateWrapper>
                )}
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
};

const TwoColumnSlide = ({
  left,
  right,
  ...rest
}: Omit<SlideProps, 'children'> & Parameters<typeof TwoColumn>[0]) => (
  <Slide {...rest}>
    <TwoColumn {...{ left, right }} />
  </Slide>
);
Slide.TwoColumn = TwoColumnSlide;

export default Slide;

type SlideProps = {
  id?: SlideId;
  className?: string;

  backgroundColor?: string;
  backgroundImage?: string;
  backgroundOpacity?: number;
  backgroundPosition?: string;
  backgroundRepeat?: string;
  backgroundSize?: string;
  children: ReactNode;
  padding?: string | number;
  textColor?: string;
  template?: TemplateFn | ReactNode;
  transition?: SlideTransition;
};
