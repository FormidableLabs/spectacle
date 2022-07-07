import { renderHook } from '@testing-library/react';
import { useAutoPlay } from './use-auto-play';

describe('useAutoPlay()', () => {
  const stepForward = jest.fn();
  const skipTo = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should call the step forward function twice for 2 seconds.', () => {
    renderHook(() =>
      useAutoPlay({
        enabled: true,
        interval: 1000,
        navigation: {
          stepForward,
          skipTo,
          isFinalSlide: false
        }
      })
    );

    jest.advanceTimersByTime(2000);
    expect(stepForward).toBeCalledTimes(2);
  });

  test('should call the skip to function on the final slide and when loop is enabled.', () => {
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

    jest.advanceTimersByTime(1000);
    expect(skipTo).toBeCalledTimes(1);
  });
});
