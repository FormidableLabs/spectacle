import React from 'react';
import PropTypes from 'prop-types';
import { DeckContext } from '../../hooks/use-deck';

const AudienceDeck = props => {
  const { addMessageHandler } = props;

  const {
    // dispatch,
  } = React.useContext(DeckContext);

  const onMessageReceived = React.useCallback(message => {
    console.log('MESSAGE:', message);
    // TODO
    // dispatch(message);
  }, []);

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
