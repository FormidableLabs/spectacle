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
  console.log(props.children);
  return <>{props.children}</>;
};

export default Deck;
