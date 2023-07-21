import { renderHook, act } from '@testing-library/react';
import { useTimer } from './use-timer';

describe('useTimer', () => {
  jest.useFakeTimers();

  test('should call the handler with correct time delay at the specified period', () => {
    const handler = jest.fn();
    const period = 1313;
    const isActive = true;

    renderHook(() => useTimer(handler, period, isActive));

    act(() => {
      jest.advanceTimersByTime(period);
    });

    expect(handler).toHaveBeenCalledWith(expect.any(Number));
  });

  test('should not call the handler when isActive is false', () => {
    const handler = jest.fn();
    const period = 1500;
    const isActive = false;

    renderHook(() => useTimer(handler, period, isActive));

    act(() => {
      jest.advanceTimersByTime(period);
    });

    expect(handler).not.toHaveBeenCalled();
  });

  test('should clear the interval when the hook unmounts', () => {
    const handler = jest.fn();
    const period = 2000;
    const isActive = true;

    const clearIntervalSpy = jest.spyOn(window, 'clearInterval');

    const { unmount } = renderHook(() => useTimer(handler, period, isActive));

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
    clearIntervalSpy.mockRestore();
  });
});
