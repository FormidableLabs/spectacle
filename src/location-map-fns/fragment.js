import { GOTO_FINAL_STEP } from '../hooks/use-deck-state';

// Parse url fragments of the format "<slideIndex>[:<stepIndex>]"
export function mapLocationToState(location) {
  const { hash: fragmentId } = location;

  const nextState = {};

  const match = /^#([^:]+)(:(.+))$/.exec(fragmentId);
  if (!match) {
    return nextState;
  }
  nextState.immediate = true;

  nextState.slideIndex = Number(match[1]);
  if (isNaN(slideIndex)) {
    throw new Error(
      `Invalid slide index in URL fragment identifier: '${fragmentId}'`
    );
  }

  if (match[3] === 'final') {
    nextState.stepIndex = GOTO_FINAL_STEP;
  } else if (match[3] !== undefined) {
    nextState.stepIndex = Number(match[3]);
    if (isNaN(nextState.stepIndex)) {
      throw new Error(
        `Invalid step index in URL fragment identifier: '${fragmentId}'`
      );
    }
  }

  return nextState;
}

// Create url fragments in the format described above
export function mapStateToLocation(state) {
  const { slideIndex, stepIndex } = state;
  if (typeof slideIndex !== 'number') {
    return {};
  }
  let fragmentId = String(slideIndex);
  if (typeof stepIndex === 'number') {
    fragmentId += ':';
    fragmentId += String(stepIndex);
  } else if (stepIndex === GOTO_FINAL_STEP) {
    fragmentId += ':final';
  } else {
    // TODO: should we throw an exception here?
  }
  return {
    hash: fragmentId
  };
}
