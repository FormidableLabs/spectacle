import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext, ThemeProvider } from 'styled-components';

import useDeck, { DeckContext } from '../../hooks/use-deck';
import isComponentType from '../../utils/is-component-type';
import useUrlRouting from '../../hooks/use-url-routing';
import PresenterDeck from './presenter-deck';
import AudienceDeck from './audience-deck';
import { mergeTheme } from '../../theme';
import { animated, useTransition } from 'react-spring';
import {
  TransitionPipeContext,
  TransitionPipeProvider
} from '../../hooks/use-transition-pipe';
import usePresentation, {
  MSG_SLIDE_STATE_CHANGE
} from '../../hooks/use-presentation';
import useKeyboardControls from '../../hooks/use-keyboard-controls';
import {
  DEFAULT_SLIDE_ELEMENT_INDEX,
  DEFAULT_SLIDE_INDEX
} from '../../utils/constants';
import searchChildrenForAppear from '../../utils/search-children-appear';
import OverviewDeck from './overview-deck';
import { Markdown, Slide } from '../../index';

const AnimatedDeckDiv = styled(animated.div)`
  height: 100vh;
  width: 100vw;
  position: fixed;
`;

const defaultSlideEffect = {
  from: {
    position: 'fixed',
    transform: 'translate(100%, 0%)'
  },
  enter: {
    position: 'fixed',
    transform: 'translate(0, 0%)'
  },
  leave: {
    position: 'fixed',
    transform: 'translate(-100%, 0%)'
  },
  config: { precision: 0 }
};

/**
 * Provides top level state/context provider with useDeck hook
 * Should wrap all the presentation components (slides, etc)
 *
 * Props = {
 *  loop: bool (pass in true if you want slides to loop)
 * transitionEffect: based off of react sprint useTransition
 * }
 *
 * Note: Immediate is a React-Spring property that we pass to the animations
 * essentially it skips animations.
 */

const initialState = {
  currentSlide: DEFAULT_SLIDE_INDEX,
  immediate: false,
  immediateElement: false,
  currentSlideElement: DEFAULT_SLIDE_ELEMENT_INDEX,
  reverseDirection: false,
  presenterMode: false,
  overviewMode: false,
  notes: {},
  resolvedInitialUrl: false
};

const mapMarkdownIntoSlides = (child, index) => {
  if (
    isComponentType(child, 'Markdown') &&
    Boolean(child.props.containsSlides)
  ) {
    return child.props.children.split(/\n\s*---\n/).map((markdown, mdIndex) => (
      <Slide key={`md-slide-${index}-${mdIndex}`}>
        <Markdown>{markdown}</Markdown>
      </Slide>
    ));
  }
  return child;
};

const Deck = ({
  children,
  loop,
  keyboardControls,
  animationsWhenGoingBack,
  ...rest
}) => {
  if (React.Children.count(children) === 0) {
    throw new Error('Spectacle must have at least one slide to run.');
  }

  const filteredChildren = React.Children.map(children, mapMarkdownIntoSlides)
    .flat(1)
    .filter(child => isComponentType(child, 'Slide'));

  const numberOfSlides = filteredChildren.length;

  if (numberOfSlides === 0) {
    throw new Error('Spectacle must have at least one slide to run.');
  }

  const slideElementMap = React.useMemo(() => {
    const map = {};
    filteredChildren.filter((slide, index) => {
      map[index] = searchChildrenForAppear(slide.props.children);
    });
    return map;
  }, [filteredChildren]);

  // Initialise useDeck hook and get state and dispatch off of it
  const { state, dispatch } = useDeck({ ...initialState, numberOfSlides });
  const themeContext = React.useContext(ThemeContext);

  React.useLayoutEffect(() => {
    document.body.style.margin = '0';
    document.body.style.background = '#000';
    document.body.style.color =
      themeContext.colors[rest.textColor] ||
      rest.textColor ||
      themeContext.colors.primary;
  }, [rest.backgroundColor, rest.textColor, themeContext.colors]);

  const {
    startConnection,
    terminateConnection,
    sendMessage,
    errors,
    addMessageHandler,
    isReceiver,
    isController
  } = usePresentation();

  React.useEffect(() => {
    if (errors && errors.length > 0) {
      console.log('presentation errors', errors);
    }
  }, [errors]);

  const onUrlChange = React.useCallback(
    update => {
      if (isController) {
        sendMessage({
          type: MSG_SLIDE_STATE_CHANGE,
          payload: update
        });
      }
    },
    [sendMessage, isController]
  );

  const { navigateToNext, navigateToPrevious, goToSlide } = useUrlRouting({
    dispatch,
    currentSlide: state.currentSlide,
    currentSlideElement: state.currentSlideElement,
    currentPresenterMode: state.presenterMode,
    slideElementMap,
    loop,
    animationsWhenGoingBack,
    onUrlChange
  });

  useKeyboardControls({
    keyboardControls,
    navigateToNext,
    navigateToPrevious
  });

  const { runTransition } = React.useContext(TransitionPipeContext);
  const userTransitionEffect =
    filteredChildren[state.currentSlide].props.transitionEffect || {};
  const transitionRef = React.useRef(null);

  React.useEffect(() => {
    if (!transitionRef.current) {
      return;
    }
    runTransition(transitionRef.current);
  }, [transitionRef, state.currentSlide, runTransition]);

  const transitions = useTransition(state.currentSlide, p => p, {
    ref: transitionRef,
    enter: () => userTransitionEffect.enter || defaultSlideEffect.enter,
    leave: userTransitionEffect.leave || defaultSlideEffect.leave,
    from: userTransitionEffect.from || defaultSlideEffect.from,
    unique: true,
    immediate: state.immediate
  });

  let content = null;
  if (state.resolvedInitialUrl) {
    if (state.overviewMode) {
      const staticSlides = filteredChildren.map((slide, index) =>
        React.cloneElement(slide, {
          slideNum: index,
          template: rest.template
        })
      );
      content = (
        <OverviewDeck goToSlide={goToSlide}>{staticSlides}</OverviewDeck>
      );
    } else if (state.presenterMode) {
      const staticSlides = filteredChildren.map((slide, index) =>
        React.cloneElement(slide, {
          slideNum: index,
          template: rest.template
        })
      );
      content = (
        <PresenterDeck
          isController={isController}
          isReceiver={isReceiver}
          startConnection={startConnection}
          terminateConnection={terminateConnection}
        >
          {staticSlides}
        </PresenterDeck>
      );
    } else {
      const animatedSlides = transitions.map(({ item, props, key }) => (
        <AnimatedDeckDiv style={props} key={key}>
          {React.cloneElement(filteredChildren[item], {
            slideNum: item,
            numberOfSlides,
            template: rest.template
          })}
        </AnimatedDeckDiv>
      ));

      content = (
        <AudienceDeck addMessageHandler={addMessageHandler}>
          {animatedSlides}
        </AudienceDeck>
      );
    }
  }

  return (
    <>
      <DeckContext.Provider
        value={{
          state,
          dispatch,
          numberOfSlides,
          keyboardControls,
          animationsWhenGoingBack,
          slideElementMap,
          goToSlide
        }}
      >
        {content}
      </DeckContext.Provider>
    </>
  );
};

Deck.propTypes = {
  animationsWhenGoingBack: PropTypes.bool.isRequired,
  backgroundColor: PropTypes.string,
  children: PropTypes.node.isRequired,
  keyboardControls: PropTypes.oneOf(['arrows', 'space']),
  loop: PropTypes.bool.isRequired,
  template: PropTypes.func,
  textColor: PropTypes.string,
  theme: PropTypes.object
};

const ConnectedDeck = props => (
  <ThemeProvider theme={mergeTheme(props.theme)}>
    <TransitionPipeProvider>
      <Deck {...props} />
    </TransitionPipeProvider>
  </ThemeProvider>
);

ConnectedDeck.propTypes = Deck.propTypes;
ConnectedDeck.defaultProps = {
  loop: false,
  keyboardControls: 'arrows',
  animationsWhenGoingBack: false
};

export default ConnectedDeck;
