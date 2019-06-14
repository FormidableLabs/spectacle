import React from 'react';
import useDeck, { DeckContext } from '../hooks/useDeck';

/**
 * Provides top level state/context provider with useDeck hook
 * Should wrap all the presentation components (slides, etc)
 * Limit responsibility of this component / the contents of its state to what's necessary
 *    E.g. current slide, but not animation progress
 */

// TODO: Do we need `prop-types`?

const initialState = { currentSlide: 0 };

const Deck = props => {
  const [state, dispatch] = useDeck(initialState);
  const Slides =
    typeof props.children === 'Array'
      ? props.children
          .filter(x => x.props.mdxType === 'Slide')
          .map((x, i) => ({ ...x, props: { ...x.props, slideNo: i } }))
      : props.children;

  return (
    <DeckContext.Provider value={[state, dispatch]}>
      {props.children[0]}
      {Slides}
    </DeckContext.Provider>
  );
};

export default Deck;
