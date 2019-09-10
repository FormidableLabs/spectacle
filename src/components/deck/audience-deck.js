import React from 'react';
import PropTypes from 'prop-types';
import { DeckContext } from '../../hooks/use-deck';
import { MSG_SLIDE_STATE_CHANGE } from '../../hooks/use-presentation';

const AudienceDeck = props => {
  const { addMessageHandler } = props;

  const { dispatch } = React.useContext(DeckContext);

  const onMessageReceived = React.useCallback(
    message => {
      // The PresentationDeck will send messages to
      // keep the AudienceDeck in sync.
      console.log('RECEIVED MESSAGE:', message);
      if (message.type === MSG_SLIDE_STATE_CHANGE) {
        dispatch({
          type: 'GO_TO_SLIDE',
          payload: message.payload
        });
      }
    },
    [dispatch]
  );

  React.useEffect(() => {
    addMessageHandler(onMessageReceived);
  }, [addMessageHandler, onMessageReceived]);

  return <>{props.children}</>;
};

AudienceDeck.propTypes = {
  addMessageHandler: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default AudienceDeck;
