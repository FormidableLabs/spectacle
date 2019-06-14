import React from 'react';
import { DeckContext } from '../hooks/useDeck';

/**
 * Controls navigation through deck
 * Provided as its own component to easily allow people to add their own alternative
 */

const Controls = () => {
  const [state, dispatch] = React.useContext(DeckContext);

  return (
    <>
      <button onClick={() => dispatch({ type: 'prev slide' })}>Prev</button>
      <button onClick={() => dispatch({ type: 'next slide' })}>Next</button>
    </>
  );
};

export default Controls;
