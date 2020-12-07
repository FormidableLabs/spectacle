import * as React from 'react';
import { merge } from 'merge-anything';
import useActionDispatcher from '../hooks/use-action-dispatcher';

export const GOTO_FINAL_STEP = null;

const initialDeckState = {
  initialized: false,
  pendingView: {
    slideIndex: undefined,
    stepIndex: undefined
  },
  activeView: {
    slideIndex: undefined,
    stepIndex: undefined
  }
};

function deckReducer(state, { type, payload = {} }) {
  switch (type) {
    case 'INITIALIZE_TO':
      return {
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
        pendingView: merge(state.pendingView, {
          stepIndex: state.pendingView.stepIndex + 1
        })
      };
    case 'STEP_BACKWARD':
      return {
        ...state,
        pendingView: merge(state.pendingView, {
          stepIndex: state.pendingView.stepIndex - 1
        })
      };
    case 'ADVANCE_SLIDE':
      return {
        ...state,
        pendingView: merge(state.pendingView, {
          stepIndex: 0,
          slideIndex: state.pendingView.slideIndex + 1
        })
      };
    case 'REGRESS_SLIDE':
      return {
        ...state,
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

export default function useDeckReducer(userProvidedInitialState) {
  const [{ initialized, pendingView, activeView }, dispatch] = React.useReducer(
    deckReducer,
    initialDeckState
  );

  const initializeTo = useActionDispatcher(dispatch, 'INITIALIZE_TO');
  const skipTo = useActionDispatcher(dispatch, 'SKIP_TO');
  const stepForward = useActionDispatcher(dispatch, 'STEP_FORWARD');
  const stepBackward = useActionDispatcher(dispatch, 'STEP_BACKWARD');
  const advanceSlide = useActionDispatcher(dispatch, 'ADVANCE_SLIDE');
  const regressSlide = useActionDispatcher(dispatch, 'REGRESS_SLIDE');
  const commitTransition = useActionDispatcher(dispatch, 'COMMIT_TRANSITION');
  const cancelTransition = useActionDispatcher(dispatch, 'CANCEL_TRANSITION');

  React.useEffect(() => {
    if (initialized) return;
    if (userProvidedInitialState === undefined) return;
    initializeTo(userProvidedInitialState);
  }, [initialized, initializeTo, userProvidedInitialState]);

  return {
    initialized,
    pendingView,
    activeView,

    initializeTo,
    skipTo,
    stepForward,
    stepBackward,
    advanceSlide,
    regressSlide,
    commitTransition,
    cancelTransition
  };
}
