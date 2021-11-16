import * as React from 'react';
import { ulid } from 'ulid';
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
export function useSteps(
  numSteps = 1,
  {
    id: userProvidedId,
    priority,
    stepIndex
  }: { id?: string | number; priority?: number; stepIndex?: number } = {}
) {
  const [stepId] = React.useState(userProvidedId || ulid);

  const { activeStepIndex, activationThresholds } = React.useContext(
    SlideContext
  );

  let relStep: number;

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

  if (priority !== undefined) {
    placeholderProps['data-priority'] = priority;
  } else if (stepIndex !== undefined) {
    console.warn(
      '`options.stepIndex` option to `useSteps` is deprecated- please use `priority` option instead.'
    );
    placeholderProps['data-priority'] = stepIndex;
  }

  return {
    stepId,
    isActive,
    step: relStep,
    placeholder: <div {...placeholderProps}></div>
  };
}

type StepId = string;
export type ActivationThresholds = Record<StepId, number>;

// Similar to <Deck>, this is where we go looking for "step placeholder"
// elements. The main difference here is that slide placeholders are 1:1 with
// slides, whereas step placeholders may represent multiple steps. So, the
// keys of 'activationThresholds' represent the IDs of stepper elements, and
// the values represent the _first step at which they should appear_.
export function useCollectSteps() {
  const [stepContainer, setStepContainer] = React.useState<HTMLElement>();
  const [activationThresholds, setActivationThresholds] = React.useState<
    ActivationThresholds
  >({});
  const [finalStepIndex, setFinalStepIndex] = React.useState<number>();

  React.useEffect(() => {
    if (!stepContainer) return;
    const placeholderNodes = (stepContainer.getElementsByClassName(
      PLACEHOLDER_CLASS_NAME
    ) as unknown) as Iterable<HTMLElement>;

    const [thresholds, numSteps] = [...placeholderNodes]
      .map((node, index) => {
        const dataset = node.dataset;

        let stepCount = Number(dataset.stepCount);
        if (isNaN(stepCount)) {
          stepCount = 1;
        }
        let priority = Number(dataset.setpriority);
        if (isNaN(priority)) {
          priority = index;
        }
        const id = dataset.stepId as StepId;

        return {
          id,
          count: stepCount,
          priority
        };
      })
      .concat()
      .sort(sortByKeyComparator('priority'))
      .reduce(
        (memo, el) => {
          const [thresholds, nextThreshold] = memo;
          const { id, count } = el;
          thresholds[id] = nextThreshold;
          return [thresholds, nextThreshold + count];
        },
        [{}, 1] as [ActivationThresholds, number]
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
