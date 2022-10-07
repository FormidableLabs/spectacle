import { useReducer, useMemo } from 'react';
import { merge } from 'merge-anything';
import { SlideId } from '../components/deck/deck';

export const GOTO_FINAL_STEP = null as unknown as number;

export type DeckView = {
  slideId?: SlideId;
  slideIndex: number;
  stepIndex: number;
};
export type DeckState = {
  initialized: boolean;
  navigationDirection: number;
  activeView: DeckView;
  pendingView: DeckView;
};

const initialDeckState: DeckState = {
  initialized: false,
  navigationDirection: 0,
  pendingView: {
    slideIndex: 0,
    stepIndex: 0
  },
  activeView: {
    slideIndex: 0,
    stepIndex: 0
  }
};

type ReducerActions =
  | { type: 'INITIALIZE_TO'; payload: Partial<DeckView> }
  | { type: 'SKIP_TO'; payload: Partial<DeckView> }
  | { type: 'STEP_FORWARD'; payload?: undefined }
  | { type: 'STEP_BACKWARD'; payload?: undefined }
  | { type: 'ADVANCE_SLIDE'; payload?: undefined }
  | { type: 'REGRESS_SLIDE'; payload?: Pick<DeckView, 'stepIndex'> }
  | { type: 'COMMIT_TRANSITION'; payload?: DeckView }
  | { type: 'CANCEL_TRANSITION'; payload?: undefined };

function deckReducer(state: DeckState, { type, payload = {} }: ReducerActions) {
  switch (type) {
    case 'INITIALIZE_TO':
      return {
        navigationDirection: 0,
        activeView: merge(state.activeView, payload),
        pendingView: merge(state.pendingView, payload),
        initialized: true
      };
    case 'SKIP_TO':
      return {
        ...state,
        pendingView: merge(state.pendingView, payload)
      };
    case 'STEP_FORWARD':
      return {
        ...state,
        navigationDirection: 1,
        pendingView: merge(state.pendingView, {
          stepIndex: state.pendingView.stepIndex + 1
        })
      };
    case 'STEP_BACKWARD':
      return {
        ...state,
        navigationDirection: -1,
        pendingView: merge(state.pendingView, {
          stepIndex: state.pendingView.stepIndex - 1
        })
      };
    case 'ADVANCE_SLIDE':
      return {
        ...state,
        navigationDirection: 1,
        pendingView: merge(state.pendingView, {
          stepIndex: 0,
          slideIndex: state.pendingView.slideIndex + 1
        })
      };
    case 'REGRESS_SLIDE':
      return {
        ...state,
        navigationDirection: -1,
        pendingView: merge(state.pendingView, {
          stepIndex: payload?.stepIndex ?? GOTO_FINAL_STEP,
          slideIndex: state.pendingView.slideIndex - 1
        })
      };
    case 'COMMIT_TRANSITION':
      const pendingView = merge(state.pendingView, payload);
      return {
        ...state,
        pendingView,
        activeView: merge(state.activeView, pendingView)
      };
    case 'CANCEL_TRANSITION':
      return {
        ...state,
        pendingView: merge(state.pendingView, state.activeView)
      };
    default:
      return state;
  }
}

export default function useDeckState(userProvidedInitialState: DeckView) {
  const [
    { initialized, navigationDirection, pendingView, activeView },
    dispatch
  ] = useReducer(deckReducer, {
    ...initialDeckState,
    ...userProvidedInitialState
  });
  const actions = useMemo(
    () => ({
      initializeTo: (payload: Partial<DeckView>) =>
        dispatch({ type: 'INITIALIZE_TO', payload }),
      skipTo: (payload: Partial<DeckView>) =>
        dispatch({ type: 'SKIP_TO', payload }),
      stepForward: () => dispatch({ type: 'STEP_FORWARD' }),
      stepBackward: () => dispatch({ type: 'STEP_BACKWARD' }),
      advanceSlide: () => dispatch({ type: 'ADVANCE_SLIDE' }),
      regressSlide: (payload?: Pick<DeckView, 'stepIndex'>) =>
        dispatch({ type: 'REGRESS_SLIDE', payload }),
      commitTransition: (payload?: DeckView) =>
        dispatch({ type: 'COMMIT_TRANSITION', payload }),
      cancelTransition: () => dispatch({ type: 'CANCEL_TRANSITION' })
    }),
    [dispatch]
  );

  return {
    initialized,
    navigationDirection,
    pendingView,
    activeView,
    ...actions
  };
}

export type DeckStateAndActions = ReturnType<typeof useDeckState>;
