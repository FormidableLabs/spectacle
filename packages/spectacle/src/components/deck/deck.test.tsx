import Deck from './index';
import Slide from '../slide/slide';
import { act, render } from '@testing-library/react';
import { CSSObject } from 'styled-components';
import { Stepper } from '../appear';

describe('<Deck />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should allow for backdrop color overrides from theme prop', () => {
    const deckWithStyle = (
      backdropStyle: CSSObject,
      Backdrop?: React.ElementType
    ) => (
      <Deck className="backdrop" theme={{ backdropStyle, Backdrop }}>
        <Slide>Hi</Slide>
      </Deck>
    );
    let { container, rerender } = render(deckWithStyle({ padding: 16 }));

    expect(container.querySelector('.backdrop')).toHaveStyle({
      backgroundColor: 'black'
    });

    rerender(deckWithStyle({ backgroundColor: 'blue' }));
    expect(container.querySelector('.backdrop')).toHaveStyle({
      backgroundColor: 'blue'
    });

    rerender(deckWithStyle({ background: 'red' }));
    expect(container.querySelector('.backdrop')).toHaveStyle({
      backgroundColor: 'red'
    });

    rerender(deckWithStyle({}, 'section'));
    expect(container.querySelector('.backdrop')).not.toHaveStyle({
      backgroundColor: 'black'
    });
  });

  it('should automatically advance with autoPlay=true', () => {
    const slideNumberTracker = jest.fn();
    const stepperActiveTracker = jest.fn();
    const autoPlayInterval = 5000;

    const deckWithExtraProps = (
      props: Partial<React.ComponentProps<typeof Deck>>
    ) => (
      <Deck
        autoPlay
        autoPlayInterval={autoPlayInterval}
        {...props}
        template={({ slideNumber }) => {
          slideNumberTracker(slideNumber);
          return null;
        }}
      >
        <Slide>Slide 1</Slide>
        <Slide>Slide 2</Slide>
        <Slide>
          Slide 3
          <Stepper values={[1]}>
            {(_value, _step, isActive) => {
              stepperActiveTracker(isActive);
              return null;
            }}
          </Stepper>
        </Slide>
      </Deck>
    );

    const { rerender } = render(deckWithExtraProps({ autoPlayLoop: false }));

    expect(slideNumberTracker).toHaveBeenLastCalledWith(1);
    expect(stepperActiveTracker).toHaveBeenLastCalledWith(false);

    act(() => {
      jest.advanceTimersByTime(autoPlayInterval);
    });

    // autoPlay advanced to the next slide
    expect(slideNumberTracker).toHaveBeenLastCalledWith(2);

    act(() => {
      jest.advanceTimersByTime(autoPlayInterval);
    });

    // autoPlay advanced to the final slide
    expect(stepperActiveTracker).toHaveBeenLastCalledWith(false);
    expect(slideNumberTracker).toHaveBeenLastCalledWith(3);

    act(() => {
      jest.advanceTimersByTime(autoPlayInterval);
    });

    // autoPlay activated the stepper on the third slide
    expect(stepperActiveTracker).toHaveBeenLastCalledWith(true);
    expect(slideNumberTracker).toHaveBeenLastCalledWith(3);

    act(() => {
      jest.advanceTimersByTime(autoPlayInterval);
    });

    // autoPlay stalled at the end as there are no more steps
    expect(stepperActiveTracker).toHaveBeenLastCalledWith(true);
    expect(slideNumberTracker).toHaveBeenLastCalledWith(3);

    // Rerender with looping activated
    rerender(deckWithExtraProps({ autoPlayLoop: true }));

    act(() => {
      jest.advanceTimersByTime(autoPlayInterval);
    });

    // autoPlay looped around to the first slide
    expect(stepperActiveTracker).toHaveBeenLastCalledWith(false);
    expect(slideNumberTracker).toHaveBeenLastCalledWith(1);

    // Skipping ahead to the last step on the last slide
    act(() => {
      jest.advanceTimersByTime(autoPlayInterval);
    });
    act(() => {
      jest.advanceTimersByTime(autoPlayInterval);
    });
    act(() => {
      jest.advanceTimersByTime(autoPlayInterval);
    });

    // autoPlay brought us to the third slide with the stepper activated
    expect(stepperActiveTracker).toHaveBeenLastCalledWith(true);
    expect(slideNumberTracker).toHaveBeenLastCalledWith(3);

    act(() => {
      jest.advanceTimersByTime(autoPlayInterval);
    });

    // autoPlay looped around to the first slide
    expect(stepperActiveTracker).toHaveBeenLastCalledWith(false);
    expect(slideNumberTracker).toHaveBeenLastCalledWith(1);
  });
});
