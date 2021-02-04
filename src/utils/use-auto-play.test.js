import { renderHook } from '@testing-library/react-hooks';
import { useAutoPlay } from './use-auto-play';

describe('useAutoPlay()', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should call the step forward function twice for 2 seconds.', () => {
    const stepForward = jest.fn();
    renderHook(() =>
      useAutoPlay({
        enabled: true,
        interval: 1000,
        navigation: {
          stepForward
        }
      })
    );

    jest.runTimersToTime(2000);
    expect(stepForward).toBeCalledTimes(2);
  });

  test('should call the skip to function on the final slide and when loop is enabled.', () => {
    const stepForward = jest.fn();
    const skipTo = jest.fn();
    renderHook(() =>
      useAutoPlay({
        enabled: true,
        interval: 1000,
        loop: true,
        navigation: {
          stepForward,
          skipTo,
          isFinalSlide: true
        }
      })
    );

    jest.runTimersToTime(1000);
    expect(skipTo).toBeCalledTimes(1);
  });
});
