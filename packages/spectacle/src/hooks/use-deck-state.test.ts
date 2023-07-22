import { renderHook, act } from '@testing-library/react';
import useDeckState, { DeckView } from './use-deck-state';

describe('useDeckState', () => {
  const initialState: DeckView = {
    slideIndex: 1,
    stepIndex: 1
  };

  it('should handle INITIALIZE_TO action', () => {
    const { result } = renderHook(() => useDeckState(initialState));

    act(() => {
      result.current.initializeTo({ slideIndex: 2, stepIndex: 2 });
    });

    expect(result.current.activeView).toEqual({ slideIndex: 2, stepIndex: 2 });
    expect(result.current.pendingView).toEqual({ slideIndex: 2, stepIndex: 2 });
    expect(result.current.initialized).toBe(true);
  });

  it('should handle SKIP_TO action', () => {
    const { result } = renderHook(() => useDeckState(initialState));

    act(() => {
      result.current.skipTo({ slideIndex: 3 });
    });

    expect(result.current.pendingView.slideIndex).toBe(3);
  });

  it('should handle STEP_FORWARD action', () => {
    const { result } = renderHook(() => useDeckState(initialState));

    act(() => {
      result.current.stepForward();
    });

    expect(result.current.pendingView.stepIndex).toBe(
      initialState.stepIndex + 1
    );
    expect(result.current.navigationDirection).toBe(1);
  });

  it('should handle STEP_BACKWARD action', () => {
    const { result } = renderHook(() => useDeckState(initialState));

    act(() => {
      result.current.stepBackward();
    });

    expect(result.current.pendingView.stepIndex).toBe(
      initialState.stepIndex - 1
    );
    expect(result.current.navigationDirection).toBe(-1);
  });

  it('should handle ADVANCE_SLIDE action', () => {
    const { result } = renderHook(() => useDeckState(initialState));

    act(() => {
      result.current.advanceSlide();
    });

    expect(result.current.pendingView.slideIndex).toBe(
      initialState.slideIndex + 1
    );
    expect(result.current.pendingView.stepIndex).toBe(0);
    expect(result.current.navigationDirection).toBe(1);
  });

  it('should handle REGRESS_SLIDE action', () => {
    const { result } = renderHook(() => useDeckState(initialState));

    act(() => {
      result.current.regressSlide({ stepIndex: 0 });
    });

    expect(result.current.pendingView.slideIndex).toBe(
      initialState.slideIndex - 1
    );
    expect(result.current.pendingView.stepIndex).toBe(0);
    expect(result.current.navigationDirection).toBe(-1);
  });

  it('should handle COMMIT_TRANSITION action', () => {
    const { result } = renderHook(() => useDeckState(initialState));

    act(() => {
      result.current.commitTransition({ slideIndex: 2, stepIndex: 2 });
    });

    expect(result.current.activeView).toEqual({ slideIndex: 2, stepIndex: 2 });
    expect(result.current.pendingView).toEqual({ slideIndex: 2, stepIndex: 2 });
  });

  it('should handle CANCEL_TRANSITION action', () => {
    const { result } = renderHook(() => useDeckState(initialState));

    act(() => {
      result.current.cancelTransition();
    });

    expect(result.current.pendingView).toEqual(result.current.activeView);
  });
});
