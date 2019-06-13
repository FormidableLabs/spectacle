import React from 'react';
import useDeck, { DeckContext } from '../hooks/useDeck';

const initialState = { currentSlide: 0 };

const Deck = props => {
  return (
    <DeckContext.Provider value={useDeck(initialState)}>
      {props.children}
    </DeckContext.Provider>
  );
};

export default Deck;
