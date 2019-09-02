import React from 'react';
import PropTypes from 'prop-types';
import usePresentation, { MSG_GO_TO_SLIDE } from '../../hooks/use-presentation';
import { DeckContext } from '../../hooks/use-deck';
import {
  TransitionPipeContext,
  TransitionPipeProvider
} from '../../hooks/use-transition-pipe';
import { animated, useTransition } from 'react-spring';
import useKeyboardControls from '../../hooks/use-keyboard-controls';

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

const MainDeck = ({ children }) => {
  const {
    state,
    navigateToCurrentUrl,
    keyboardControls,
    registerSlideChangeCallback
  } = React.useContext(DeckContext);

  // TODO - memory leak
  const {
    isReceiver,
    hasConnection,
    startConnection,
    terminateConnection,
    sendMessage
  } = usePresentation();
  React.useEffect(
    () => {
      if (!isReceiver && !hasConnection) {
        startConnection();
      }
      return () => terminateConnection();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const sendMessageForSlideIndex = React.useCallback(
    index => {
      console.log('SENDING ISH', index);
      sendMessage({ type: MSG_GO_TO_SLIDE, payload: { index } });
    },
    [sendMessage]
  );

  // React.useEffect(() => {
  //   const unregister = registerSlideChangeCallback(sendMessageForSlideIndex);
  //   return () => unregister();
  // }, [registerSlideChangeCallback, sendMessageForSlideIndex]);

  React.useEffect(
    () => {
      const unregister = registerSlideChangeCallback(sendMessageForSlideIndex);
      /***
       * This will look at the current query string and navigate to whatever
       * slide is specified, otherwise start at 0. This only runs once per mount
       * of MainDeck, which should be the entire lifecyle of the slideshow. We
       * need sendMessageForSlideIndex to keep the presenter deck in sync.
       */
      navigateToCurrentUrl({
        immediate: true
      });
      return () => unregister();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useKeyboardControls({ keyboardControls, sendMessageForSlideIndex });

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

  return <>{slides}</>;
};

MainDeck.propTypes = {
  children: PropTypes.node.isRequired,
  keyboardControls: PropTypes.oneOf(['arrows', 'space'])
};

MainDeck.defaultProps = {
  keyboardControls: 'arrows'
};

export default function ConnectedMainDeck(props) {
  return (
    <TransitionPipeProvider>
      <MainDeck {...props} />
    </TransitionPipeProvider>
  );
}
