import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react';
import { SPECTACLE_MODES } from '../utils/constants';
import useModes, { modeSearchParamForKey } from './use-modes';

const reportConsoleError = console.error;
const navigationAttempts: string[] = [];

describe('useModes', () => {
  beforeEach(() => {
    navigationAttempts.length = 0;
    window.history.replaceState(null, '', '?slideIndex=0&stepIndex=0');

    // jsdom does not implement navigation, so the window.location updates
    // performed by toggleMode are reported as unimplemented navigations.
    jest.spyOn(console, 'error').mockImplementation((...args: unknown[]) => {
      if (String(args[0]).includes('Not implemented: navigation')) {
        navigationAttempts.push(String(args[0]));
        return;
      }

      reportConsoleError(...args);
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should set the current mode based on the spectacle modes', () => {
    const { result } = renderHook(() => useModes());

    // Default
    expect(result.current.getCurrentMode()).toBe(SPECTACLE_MODES.DEFAULT_MODE);

    // Presenter
    result.current.toggleMode({ newMode: SPECTACLE_MODES.PRESENTER_MODE });
    expect(result.current.getCurrentMode()).toBe(
      SPECTACLE_MODES.PRESENTER_MODE
    );

    // Overview
    result.current.toggleMode({ newMode: SPECTACLE_MODES.OVERVIEW_MODE });
    expect(result.current.getCurrentMode()).toBe(SPECTACLE_MODES.OVERVIEW_MODE);

    // Print
    result.current.toggleMode({ newMode: SPECTACLE_MODES.PRINT_MODE });
    expect(result.current.getCurrentMode()).toBe(SPECTACLE_MODES.PRINT_MODE);

    // Export
    result.current.toggleMode({ newMode: SPECTACLE_MODES.EXPORT_MODE });
    expect(result.current.getCurrentMode()).toBe(SPECTACLE_MODES.EXPORT_MODE);

    // Every toggle updates the search params the deck reloads with.
    expect(navigationAttempts).toHaveLength(4);
  });

  it('should read the current mode from the search params', () => {
    window.history.replaceState(
      null,
      '',
      '?presenterMode=true&slideIndex=0&stepIndex=0'
    );

    const { result } = renderHook(() => useModes());

    expect(result.current.getCurrentMode()).toBe(
      SPECTACLE_MODES.PRESENTER_MODE
    );
  });

  it.each([
    [SPECTACLE_MODES.PRESENTER_MODE, { presenterMode: true }],
    [SPECTACLE_MODES.OVERVIEW_MODE, { overviewMode: true }],
    [SPECTACLE_MODES.PRINT_MODE, { printMode: true }],
    [SPECTACLE_MODES.EXPORT_MODE, { exportMode: true }]
  ])('should map %s to its search param', (mode, expectedSearchParams) => {
    expect(modeSearchParamForKey(mode)).toEqual(expectedSearchParams);
  });
});
