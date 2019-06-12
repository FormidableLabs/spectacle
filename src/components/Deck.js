import React from 'react';

const initialState = { currentSlide: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'next slide':
      return { currentSlide: state.currentSlide + 1 };
    case 'prev slide':
      return { currentSlide: state.currentSlide - 1 };
    default:
      return { ...state };
  }
}

const Deck = props => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return props.children([dispatch, state]);
};

export default Deck;
