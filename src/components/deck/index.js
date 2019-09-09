import React from 'react';
import PropTypes from 'prop-types';
import { ThemeContext, ThemeProvider } from 'styled-components';

import useDeck, { DeckContext } from '../../hooks/use-deck';
import isComponentType from '../../utils/is-component-type';
import useUrlRouting from '../../hooks/use-url-routing';
import PresenterDeck from './presenter-deck';
import AudienceDeck from './audience-deck';
import defaultTheme from '../../theme/default-theme';
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

const defaultSlideEffect = {
  from: {
    width: '100%',
    position: 'absolute',
    transform: 'translate(100%, 0%)'
  },
  enter: {
    width: '100%',
    position: 'absolute',
    transform: 'translate(0, 0%)'
  },
  leave: {
    width: '100%',
    position: 'absolute',
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
  notes: {},
  resolvedInitialUrl: false
};

const Deck = ({
  children,
  loop,
  keyboardControls,
  animationsWhenGoingBack,
  ...rest
}) => {
  // Check for slides and then number slides.
  const filteredChildren = Array.isArray(children)
    ? children.filter(x => isComponentType(x, 'Slide'))
    : console.error('No children passed') || [];

  const slideElementMap = React.useMemo(() => {
    const map = {};
    filteredChildren.filter((slide, index) => {
      let count = 0;
      if (Array.isArray(slide.props.children)) {
        count = slide.props.children.reduce((memo, current) => {
          if (isComponentType(current, 'SlideElementWrapper')) {
            memo += 1;
          }
          return memo;
        }, 0);
      } else if (
        slide.props.children &&
        isComponentType(slide.props.children, 'SlideElementWrapper')
      ) {
        count = 1;
      }

      map[index] = count;
    });
    return map;
  }, [filteredChildren]);

  // Initialise useDeck hook and get state and dispatch off of it
  const { state, dispatch } = useDeck(initialState);
  const themeContext = React.useContext(ThemeContext);

  React.useLayoutEffect(() => {
    document.body.style.margin = '0';
    document.body.style.background =
      themeContext.colors[rest.backgroundColor] ||
      rest.backgroundColor ||
      themeContext.colors.tertiary;
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

  const { navigateToNext, navigateToPrevious } = useUrlRouting({
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
    children[state.currentSlide].props.transitionEffect || {};
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

  const slides = transitions.map(({ item, props, key }) => (
    <animated.div style={props} key={key}>
      {React.cloneElement(children[item], {
        slideNum: item
      })}
    </animated.div>
  ));

  let content = null;
  if (state.resolvedInitialUrl) {
    if (state.presenterMode) {
      content = (
        <PresenterDeck
          isController={isController}
          isReceiver={isReceiver}
          startConnection={startConnection}
          terminateConnection={terminateConnection}
        >
          {filteredChildren}
        </PresenterDeck>
      );
    } else {
      content = (
        <AudienceDeck addMessageHandler={addMessageHandler}>
          {slides}
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
          numberOfSlides: filteredChildren.length,
          keyboardControls,
          animationsWhenGoingBack,
          slideElementMap
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
  textColor: PropTypes.string,
  theme: PropTypes.object
};

const ConnectedDeck = props => (
  <ThemeProvider theme={defaultTheme}>
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
