import * as React from 'react';
import { ulid } from 'ulid';
import { useTransition } from 'react-spring';
import { SlideContext } from '../components/slide/slide';
import sortByKeyComparator from '../utils/sort-by';
import clamp from '../utils/clamp';

const PLACEHOLDER_CLASS_NAME = 'step-placeholder';

/*
 * This hook is used to create components which can 'participate' in a presentation.
 * When a component uses this hook, it passes numSteps, which "reserves" that many steps within the slide progression.
 * Returns the stepId, whether or not the step is active, the relative step
 * number and the DOM placeholder.
 */
export function useSteps(numSteps = 1, { id: userProvidedId, stepIndex } = {}) {
  const [stepId] = React.useState(userProvidedId || ulid);

  const { activeStepIndex, activationThresholds } = React.useContext(
    SlideContext
  );

  let relStep;

  if (activationThresholds === null) {
    // We won't have a set of activation thresholds during the very first render
    // pass for a <Slide> element, so we make sure the stepper isn't activated
    // at all.
    relStep = 0;
  } else {
    // Otherwise, we just need to convert the 'absolute step' to a 'relative
    // step' to provide to the hook consumer.
    const threshold = activationThresholds[stepId];
    relStep = activeStepIndex - threshold;
    relStep = clamp(relStep, -1, numSteps - 1);
  }

  const isActive = relStep >= 0;

  // Animated steppers are visible for a short period of time as they're
  // disappearing, which could cause a "flash of incorrect step". To avoid this,
  // we clamp to the "first visible step" if we're exiting.

  // const visibleStep = (isActive ? relStep : 1);

  // Helpful hints for the developer.
  const placeholderRef = React.useRef();
  React.useEffect(() => {
    if (!placeholderRef.current) {
      console.warn(
        `A placeholder ref does not appear to be present in the DOM for stepper element with id '${stepId}'. (Did you forget to render it?)`
      );
    }
  });

  const placeholderProps = {
    ref: placeholderRef,
    className: PLACEHOLDER_CLASS_NAME,
    style: { display: 'none' },
    'data-step-id': stepId,
    'data-step-count': numSteps
  };

  if (stepIndex !== undefined) {
    placeholderProps['data-step-index'] = stepIndex;
  }

  return {
    stepId,
    isActive,
    step: relStep,
    placeholder: <div {...placeholderProps}></div>
  };
}

// Similar to <Deck>, this is where we go looking for "step placeholder"
// elements. The main difference here is that slide placeholders are 1:1 with
// slides, whereas step placeholders may represent multiple steps. So, the
// keys of 'activationThresholds' represent the IDs of stepper elements, and
// the values represent the _first step at which they should appear_.
export function useCollectSteps() {
  const [stepContainer, setStepContainer] = React.useState();
  const [activationThresholds, setActivationThresholds] = React.useState({});
  const [finalStepIndex, setFinalStepIndex] = React.useState();

  React.useEffect(() => {
    if (!stepContainer) return;
    const placeholderNodes = stepContainer.getElementsByClassName(
      PLACEHOLDER_CLASS_NAME
    );

    const [thresholds, numSteps] = [...placeholderNodes]
      .map((node, index) => {
        let { stepId, stepCount, stepIndex } = node.dataset;

        stepCount = Number(stepCount);
        if (isNaN(stepCount)) {
          stepCount = 1;
        }
        stepIndex = Number(stepIndex);
        if (isNaN(stepIndex)) {
          stepIndex = index;
        }
        return {
          id: stepId,
          count: stepCount,
          index: stepIndex
        };
      })
      .concat()
      .sort(sortByKeyComparator('index'))
      .reduce(
        (memo, el) => {
          const [thresholds, nextThreshold] = memo;
          const { id, count, index } = el;
          thresholds[id] = nextThreshold;
          return [thresholds, nextThreshold + count];
        },
        [{}, 1]
      );

    setActivationThresholds(thresholds);
    setFinalStepIndex(numSteps - 1);
  }, [stepContainer]);

  return {
    setStepContainer,
    activationThresholds,
    finalStepIndex
  };
}
