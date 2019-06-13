import React from 'react';
import DeckContet from '../hooks/useDeck';

const Controls = () => {
  let deckContext = React.useContext(DeckContet);
  return deckContext ? (
    <>
      <button onClick={() => dispatch({ type: 'next slide' })}>Next</button>
      <button onClick={() => dispatch({ type: 'prev slide' })}>Prev</button>
    </>
  ) : (
    <div>boop</div>
  );
};

export default Controls;
