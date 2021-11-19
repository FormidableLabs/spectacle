import { GOTO_FINAL_STEP } from '../hooks/use-deck-state';
import {
  parse as parseQS,
  ParsedQuery,
  stringify as stringifyQS
} from 'query-string';

type SlideState = {
  slideIndex?: number;
  stepIndex?: number | typeof GOTO_FINAL_STEP;
};

export function mapLocationToState(
  location: Pick<Location, 'search'>
): SlideState {
  const { search: queryString } = location;

  const { slideIndex: rawSlideIndex, stepIndex: rawStepIndex } =
    parseQS(queryString);

  const nextState: SlideState = {};

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

export function mapStateToLocation(state: SlideState) {
  const { slideIndex, stepIndex } = state;
  const query: ParsedQuery = {};
  if (typeof slideIndex !== 'number') {
    return query;
  }
  query.slideIndex = String(slideIndex);
  if (typeof stepIndex === 'number') {
    query.stepIndex = String(stepIndex);
  } else if (stepIndex === GOTO_FINAL_STEP) {
    query.stepIndex = 'final';
  }
  return {
    search: '?' + stringifyQS(query)
  };
}
