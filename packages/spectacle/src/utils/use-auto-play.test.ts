import { renderHook } from '@testing-library/react';
import { useAutoPlay } from './use-auto-play';

describe('useAutoPlay()', () => {
  const stepForward = jest.fn();

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
        stepForward
      })
    );

    jest.advanceTimersByTime(2000);
    expect(stepForward).toBeCalledTimes(2);
  });
});
