import { useReducer, useMemo, useEffect } from 'react';
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
  activeView: DeckView;
  pendingView: DeckView;
};

const initialDeckState: DeckState = {
  initialized: false,
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

// If payload is null, we don't want to merge because it nulls out the whole
// object.
const mergeView = (view: DeckView, payload: Partial<DeckView>) =>
  payload ? merge(view, payload) : view;

function deckReducer(state: DeckState, { type, payload = {} }: ReducerActions) {
  switch (type) {
    case 'INITIALIZE_TO':
      return {
        activeView: mergeView(state.activeView, payload),
        pendingView: mergeView(state.pendingView, payload),
        initialized: true
      };
    case 'SKIP_TO':
      return {
        ...state,
        pendingView: mergeView(state.pendingView, payload)
      };
    case 'STEP_FORWARD':
      return {
        ...state,
        pendingView: mergeView(state.pendingView, {
          stepIndex: state.pendingView.stepIndex + 1
        })
      };
    case 'STEP_BACKWARD':
      return {
        ...state,
        pendingView: mergeView(state.pendingView, {
          stepIndex: state.pendingView.stepIndex - 1
        })
      };
    case 'ADVANCE_SLIDE':
      return {
        ...state,
        pendingView: mergeView(state.pendingView, {
          stepIndex: 0,
          slideIndex: state.pendingView.slideIndex + 1
        })
      };
    case 'REGRESS_SLIDE':
      return {
        ...state,
        pendingView: mergeView(state.pendingView, {
          stepIndex: payload?.stepIndex ?? GOTO_FINAL_STEP,
          slideIndex: state.pendingView.slideIndex - 1
        })
      };
    case 'COMMIT_TRANSITION':
      const pendingView = mergeView(state.pendingView, payload);
      return {
        ...state,
        pendingView,
        activeView: mergeView(state.activeView, pendingView)
      };
    case 'CANCEL_TRANSITION':
      return {
        ...state,
        pendingView: mergeView(state.pendingView, state.activeView)
      };
    default:
      return state;
  }
}

export default function useDeckState(userProvidedInitialState: DeckView) {
  const [{ initialized, pendingView, activeView }, dispatch] = useReducer(
    deckReducer,
    initialDeckState
  );
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

  useEffect(() => {
    if (initialized) return;
    if (userProvidedInitialState === undefined) return;
    actions.initializeTo(userProvidedInitialState);
  }, [initialized, actions, userProvidedInitialState]);

  return {
    initialized,
    pendingView,
    activeView,
    ...actions
  };
}

export type DeckStateAndActions = ReturnType<typeof useDeckState>;
