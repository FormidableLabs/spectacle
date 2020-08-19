import * as React from 'react';
import Deck from './deck';
import useBroadcastChannel from '../../hooks/use-broadcast-channel';

export default function DefaultDeck(props) {
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

  React.useEffect(() => {
    postMessage('SYNC_REQUEST');
  }, [postMessage]);

  return <Deck ref={deck} {...props} />;
}

DefaultDeck.propTypes = Deck.propTypes;
