import React from 'react';
import useDeck, { DeckContext } from '../hooks/useDeck';

/**
 * Provides top level state/context provider with useDeck hook
 * Should wrap all the presentation components (slides, etc)
 */

const initialState = { currentSlide: 0 };

const Deck = props => {

    
  const Slides = Array.isArray(props.children)
    ? props.children
        .filter(x => x.props.mdxType === 'Slide')
        .map((x, i) => ({ ...x, props: { ...x.props, slideNo: i } }))
    : props.children;

  const [state, dispatch] = useDeck(initialState, Slides.length, true);

  return (
    <DeckContext.Provider value={[state, dispatch, Slides.length]}>
      {props.children[0]}
      {Slides}
    </DeckContext.Provider>
  );
};

export default Deck;
