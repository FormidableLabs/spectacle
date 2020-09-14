import React, { forwardRef, useEffect } from 'react';
import propTypes from 'prop-types';
import Deck from './deck';
import useBroadcastChannel from '../../hooks/use-broadcast-channel';

export default function DefaultDeck({ overviewMode = false, ...props }) {
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

  return <Deck overviewMode={overviewMode} ref={deck} {...props} />;
}

DefaultDeck.propTypes = { ...Deck.propTypes, overviewMode: propTypes.bool };
