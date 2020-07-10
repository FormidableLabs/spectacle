import { useImmerReducer } from 'use-immer';
import merge from 'deepmerge';
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

function deckImmerReducer(draft, { type, payload }) {
  switch (type) {
    case 'INITIALIZE_TO':
      merge(draft.activeView, payload);
      merge(draft.pendingView, payload);
      draft.initialized = true;
      break;
    case 'SKIP_TO':
      merge(draft.pendingView, payload);
      break;
    case 'STEP_FORWARD':
      draft.pendingView.stepIndex += 1;
      break;
    case 'STEP_BACKWARD':
      draft.pendingView.stepIndex -= 1;
      break;
    case 'ADVANCE_SLIDE':
      draft.pendingView.slideIndex += 1;
      draft.pendingView.stepIndex = 0;
      break;
    case 'REGRESS_SLIDE':
      draft.pendingView.slideIndex -= 1;
      draft.pendingView.stepIndex = GOTO_FINAL_STEP;
      break;
    case 'COMMIT_TRANSITION':
      merge(draft.pendingView, payload);
      merge(draft.activeView, draft.pendingView);
      break;
    case 'CANCEL_TRANSITION':
      merge(draft.pendingView, draft.activeView);
      break;
  }
}

export default function useDeckReducer(userProvidedInitialState) {
  const [{ initialized, pendingView, activeView }, dispatch] = useImmerReducer(
    deckImmerReducer,
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
