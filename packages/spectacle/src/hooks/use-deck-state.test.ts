import { renderHook, act } from '@testing-library/react';
import useDeckState, { DeckView } from './use-deck-state';

describe('useDeckState', () => {
  const initialState: DeckView = {
    slideIndex: 1,
    stepIndex: 1
  };

  /**
   * The INITIALIZE_TO should set the active and pending views
   * to the values provided in the payload.
   */
  it('should handle INITIALIZE_TO action', () => {
    const { result } = renderHook(() => useDeckState(initialState));

    act(() => {
      result.current.initializeTo({ slideIndex: 2, stepIndex: 2 });
    });

    expect(result.current.activeView).toEqual({ slideIndex: 2, stepIndex: 2 });
    expect(result.current.pendingView).toEqual({ slideIndex: 2, stepIndex: 2 });
    expect(result.current.initialized).toBe(true);
  });

  /**
   * The SKIP_TO action should set the pending view slide index to
   * the slide index provided by the payload and set the navigation
   * direction based on a delta of the previous and pending slides.
   */
  it('should handle SKIP_TO action', () => {
    const { result } = renderHook(() => useDeckState(initialState));

    act(() => {
      result.current.skipTo({ slideIndex: 3 });
    });

    expect(result.current.navigationDirection).toBe(1);
    expect(result.current.pendingView.slideIndex).toBe(3);
  });

  it('should handle SKIP_TO action in reverse', () => {
    const { result } = renderHook(() =>
      useDeckState({ slideIndex: 5, stepIndex: 0, slideId: 0 })
    );

    act(() => {
      result.current.skipTo({ slideIndex: 3 });
    });

    expect(result.current.navigationDirection).toBe(-1);
    expect(result.current.pendingView.slideIndex).toBe(3);
  });

  /**
   * The STEP_FORWARD action should increment the pending slide index by 1
   * and have a positive navigation direction.
   */
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

  /**
   * The STEP_FORWARD action should decrement the pending slide index by 1
   * and have a negative navigation direction.
   */
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

  /**
   * The ADVANCE_SLIDE action should increment the pending slide index by 1,
   * reset the step index, and have a positive navigation direction.
   */
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

  /**
   * The REGRESS_SLIDE action should decrement the pending slide index by 1,
   * reset the step index, and have a negative navigation direction.
   */
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

  /**
   * The COMMIT_TRANSITION action should set the active slide view
   * and pending slide view to the payload values.
   */
  it('should handle COMMIT_TRANSITION action', () => {
    const { result } = renderHook(() => useDeckState(initialState));

    act(() => {
      result.current.commitTransition({ slideIndex: 2, stepIndex: 2 });
    });

    expect(result.current.activeView).toEqual({ slideIndex: 2, stepIndex: 2 });
    expect(result.current.pendingView).toEqual({ slideIndex: 2, stepIndex: 2 });
  });

  /**
   * The CANCEL_TRANSITION action should cancel the slide transition
   * by reverting the pending view values to what the current active slide values are.
   */
  it('should handle CANCEL_TRANSITION action', () => {
    const { result } = renderHook(() => useDeckState(initialState));

    act(() => {
      result.current.cancelTransition();
    });

    expect(result.current.pendingView).toEqual(result.current.activeView);
  });
});
