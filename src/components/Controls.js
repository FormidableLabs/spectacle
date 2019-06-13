import React from 'react';
import { DeckContext } from '../hooks/useDeck';

const Controls = () => {
  const [state, dispatch] = React.useContext(DeckContext);

  return (
    <>
      <button onClick={() => dispatch({ type: 'next slide' })}>Next</button>
      <button onClick={() => dispatch({ type: 'prev slide' })}>Prev</button>
    </>
  );
};

export default Controls;
