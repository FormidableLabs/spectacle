import React from 'react';
/**
 * Performs logic operations for all of the deck domain level.
 * Note: Immediate is a React-Spring property that we pass to the animations
 * essentially it skips animations.
 */

export const DeckContext = React.createContext();

function useDeck(initialState) {
  function reducer(state, action) {
    switch (action.type) {
      case 'GO_TO_SLIDE': {
        const newState = {
          ...state,
          currentSlideElement: action.payload.slideElementNumber,
          currentSlide: action.payload.slideNumber,
          immediate: action.payload.immediate,
          immediateElement: false,
          reverseDirection: action.payload.reverseDirection,
          presenterMode: action.payload.presenterMode,
          overviewMode: action.payload.overviewMode,
          exportMode: action.payload.exportMode,
          printMode: action.payload.printMode,
          resolvedInitialUrl: true
        };
        return newState;
      }
      case 'SET_NOTES': {
        return {
          ...state,
          notes: {
            ...state.notes,
            [action.payload.slideNumber]: action.payload.notes
          }
        };
      }
      case 'TOGGLE_MODE': {
        return { ...state, [action.payload.mode]: !state[action.payload.mode] };
      }
      default:
        return { ...state };
    }
  }

  const [state, dispatch] = React.useReducer(reducer, initialState);

  // derived state
  const currentNotes = React.useMemo(() => state.notes[state.currentSlide], [
    state.currentSlide,
    state.notes
  ]);

  const allState = React.useMemo(
    () => ({
      ...state,
      currentNotes
    }),
    [currentNotes, state]
  );

  return { state: allState, dispatch };
}

export default useDeck;
