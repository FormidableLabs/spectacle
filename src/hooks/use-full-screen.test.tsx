import { useToggleFullScreen } from './use-full-screen';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

const oldDocumentFullscreenElement = document.fullscreenElement;
const setHasFullScreenElement = (hasElement: boolean) => {
  Object.defineProperty(document, 'fullscreenElement', {
    value: hasElement,
    writable: true
  });
};

describe('useToggleFullScreen', () => {
  afterEach(() => {
    Object.defineProperty(document, 'fullscreenElement', {
      value: oldDocumentFullscreenElement
    });
  });

  it('calls document.documentElement.requestFullscreen when not fullscreen', () => {
    setHasFullScreenElement(false);

    document.documentElement.requestFullscreen = jest.fn();
    const TestComponent = () => {
      const toggleFullScreen = useToggleFullScreen();
      return (
        <button
          data-testid="toggle fullscreen button"
          onClick={() => toggleFullScreen()}
        ></button>
      );
    };

    const { getByTestId } = render(<TestComponent />);
    fireEvent.click(getByTestId('toggle fullscreen button'));

    expect(document.documentElement.requestFullscreen).toHaveBeenCalled();
  });

  it('calls document.exitFullscreen when in fullscreen', () => {
    setHasFullScreenElement(true);

    document.exitFullscreen = jest.fn();
    const TestComponent = () => {
      const toggleFullScreen = useToggleFullScreen();
      return (
        <button
          data-testid="toggle fullscreen button"
          onClick={() => toggleFullScreen()}
        ></button>
      );
    };
    const { getByTestId } = render(<TestComponent />);
    fireEvent.click(getByTestId('toggle fullscreen button'));

    expect(document.exitFullscreen).toHaveBeenCalled();
  });
});
