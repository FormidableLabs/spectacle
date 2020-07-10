import { GOTO_FINAL_STEP } from '../hooks/use-deck-state';
import { parse as parseQS, stringify as stringifyQS } from 'query-string';

export function mapLocationToState(location) {
  const { search: queryString } = location;

  const { slideIndex: rawSlideIndex, stepIndex: rawStepIndex } = parseQS(
    queryString
  );

  const nextState = {};

  if (rawSlideIndex === undefined) {
    return nextState;
  }

  nextState.slideIndex = Number(rawSlideIndex);
  if (isNaN(nextState.slideIndex)) {
    throw new Error(
      `Invalid slide index in URL query string: '${queryString}'`
    );
  }

  if (rawStepIndex === 'final') {
    nextState.stepIndex = GOTO_FINAL_STEP;
  } else if (rawStepIndex !== undefined) {
    nextState.stepIndex = Number(rawStepIndex);
    if (isNaN(nextState.stepIndex)) {
      throw new Error(
        `Invalid step index in URL query string: '${queryString}'`
      );
    }
  }

  return nextState;
}

export function mapStateToLocation(state) {
  const { slideIndex, stepIndex } = state;
  const query = {};
  if (typeof slideIndex !== 'number') {
    return query;
  }
  query.slideIndex = slideIndex;
  if (typeof stepIndex === 'number') {
    query.stepIndex = stepIndex;
  } else if (stepIndex === GOTO_FINAL_STEP) {
    query.stepIndex = 'final';
  }
  return {
    search: '?' + stringifyQS(query)
  };
}
