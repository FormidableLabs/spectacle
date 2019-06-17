import React from 'react';
import useDeck, { DeckContext } from '../hooks/useDeck';

/**
 * Provides top level state/context provider with useDeck hook
 * Should wrap all the presentation components (slides, etc)
 *
 * Props = {
 * loop: bool (pass in true if you want slides to loop)
 * }
 */

const initialState = { currentSlide: 0 };

const Deck = props => {
  // Check for slides and then number slides.
  const Slides = Array.isArray(props.children)
    ? props.children
        .filter(x => x.props.mdxType === 'Slide')
        .map((x, i) => ({ ...x, props: { ...x.props, slideNum: i } }))
    : props.children;

  // Initialise useDeck hook and get state and dispatch off of it
  const [state, dispatch] = useDeck(
    initialState,
    Slides.length,
    props.loop ? true : false
  );

  return (
    <DeckContext.Provider value={[state, dispatch, Slides.length]}>
      {Slides}
    </DeckContext.Provider>
  );
};

export default Deck;
