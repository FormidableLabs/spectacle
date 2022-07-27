import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react';
import { SPECTACLE_MODES } from '../utils/constants';
import useModes from './use-modes';

describe('useModes', () => {
  Object.defineProperty(window, 'location', {
    value: {
      search: 'slideIndex=0&stepIndex=0'
    }
  });
  describe('toggleMode and currentMode', () => {
    it('should set the window.location based on the spectacle modes', () => {
      const { result } = renderHook(() => useModes());

      // Default
      expect(result.current.getCurrentMode()).toBe(
        SPECTACLE_MODES.DEFAULT_MODE
      );

      // Presenter
      result.current.toggleMode({ newMode: SPECTACLE_MODES.PRESENTER_MODE });
      expect(location.search).toMatch(/^presenterMode=true/);
      expect(result.current.getCurrentMode()).toBe(
        SPECTACLE_MODES.PRESENTER_MODE
      );

      // Overview
      result.current.toggleMode({ newMode: SPECTACLE_MODES.OVERVIEW_MODE });
      expect(location.search).toMatch(/^overviewMode/);
      expect(result.current.getCurrentMode()).toBe(
        SPECTACLE_MODES.OVERVIEW_MODE
      );

      // Print
      result.current.toggleMode({ newMode: SPECTACLE_MODES.PRINT_MODE });
      expect(location.search).toMatch(/^printMode=true/);
      expect(result.current.getCurrentMode()).toBe(SPECTACLE_MODES.PRINT_MODE);

      // Export
      result.current.toggleMode({ newMode: SPECTACLE_MODES.EXPORT_MODE });
      expect(location.search).toMatch(/^exportMode=true/);
      expect(result.current.getCurrentMode()).toBe(SPECTACLE_MODES.EXPORT_MODE);
    });
  });
});
