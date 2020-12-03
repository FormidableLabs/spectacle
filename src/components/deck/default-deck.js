import React, { forwardRef, useCallback, useEffect } from 'react';
import propTypes from 'prop-types';
import Deck from './deck';
import useBroadcastChannel from '../../hooks/use-broadcast-channel';
import useMousetrap from '../../hooks/use-mousetrap';
import { KEYBOARD_SHORTCUTS, SPECTACLE_MODES } from '../../utils/constants';

export default function DefaultDeck({
  overviewMode = false,
  toggleMode,
  ...props
}) {
  const deck = React.useRef();

  const [postMessage] = useBroadcastChannel(
    'spectacle_presenter_bus',
    message => {
      if (message.type !== 'SYNC') return;
      const nextView = message.payload;
      if (deck.current.initialized) {
        deck.current.skipTo(nextView);
      } else {
        deck.current.initializeTo(nextView);
      }
    }
  );

  useEffect(() => {
    postMessage('SYNC_REQUEST');
  }, [postMessage]);

  useMousetrap(
    overviewMode
      ? {
          [KEYBOARD_SHORTCUTS.TAB_FORWARD_OVERVIEW_MODE]: () =>
            deck.current.advanceSlide(),
          [KEYBOARD_SHORTCUTS.TAB_BACKWARD_OVERVIEW_MODE]: () =>
            deck.current.regressSlide({
              stepIndex: 0
            }),
          [KEYBOARD_SHORTCUTS.SELECT_SLIDE_OVERVIEW_MODE]: e =>
            toggleMode(e, SPECTACLE_MODES.DEFAULT_MODE)
        }
      : {},
    []
  );

  const onSlideClick = useCallback(
    (e, slideIndex) => {
      if (overviewMode) {
        deck.current.skipTo({
          slideIndex,
          stepIndex: 0
        });
        toggleMode(e, SPECTACLE_MODES.DEFAULT_MODE);
      }
    },
    [overviewMode, toggleMode]
  );

  return (
    <Deck
      overviewMode={overviewMode}
      onSlideClick={onSlideClick}
      ref={deck}
      {...props}
    />
  );
}

DefaultDeck.propTypes = {
  ...Deck.propTypes,
  overviewMode: propTypes.bool,
  toggleMode: propTypes.func
};
