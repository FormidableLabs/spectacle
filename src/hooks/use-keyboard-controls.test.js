import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as detectPlatform from '../utils/detect-platform';
import * as toggleFullScreen from './use-full-screen';

import useKeboardControls from './use-keyboard-controls';

Enzyme.configure({ adapter: new Adapter() });

const navigateToNextMock = jest.fn().mockImplementation(() => {});
const navigateToPrevMock = jest.fn();
const toggleModeMock = jest.fn();

describe('useKeyboardControls', () => {
  describe('slide navigation with keybaord', () => {
    it('calls navigateToNext with immediate === false when ArrowRight pressed once', done => {
      const map = {};
      window.addEventListener = jest.fn((event, callback) => {
        map[event] = callback;
      });
      const TestComponent = () => {
        useKeboardControls({
          keyboardControls: 'arrows',
          navigateToNext: navigateToNextMock,
          navigateToPrevious: navigateToPrevMock,
          toggleMode: toggleModeMock
        });
        return <div data-testid="target">Target</div>;
      };
      mount(<TestComponent />);
      map.keydown({ key: 'ArrowRight' });
      // async cause of debounce
      setTimeout(() => {
        expect(navigateToNextMock.mock.calls).toEqual([[{ immediate: false }]]);
        done();
      }, 300);
    });
    it('calls navigateToNext with immediate === true when ArrowRight pressed twice', done => {
      const map = {};
      window.addEventListener = jest.fn((event, callback) => {
        map[event] = callback;
      });
      const TestComponent = () => {
        useKeboardControls({
          keyboardControls: 'arrows',
          navigateToNext: navigateToNextMock,
          navigateToPrevious: navigateToPrevMock,
          toggleMode: toggleModeMock
        });
        return <div data-testid="target">Target</div>;
      };
      mount(<TestComponent />);
      map.keydown({ key: 'ArrowRight' });
      map.keydown({ key: 'ArrowRight' });
      // async cause of debounce
      setTimeout(() => {
        expect(navigateToNextMock.mock.calls).toEqual([[{ immediate: true }]]);
        done();
      }, 300);
    });
    it('calls navigateToNext with immediate === false when spacebar pressed', done => {
      const map = {};
      window.addEventListener = jest.fn((event, callback) => {
        map[event] = callback;
      });
      const TestComponent = () => {
        useKeboardControls({
          keyboardControls: 'space',
          navigateToNext: navigateToNextMock,
          navigateToPrevious: navigateToPrevMock,
          toggleMode: toggleModeMock
        });
        return <div data-testid="target">Target</div>;
      };
      mount(<TestComponent />);
      map.keydown({ code: 'Space', preventDefault: jest.fn() });
      // async cause of debounce
      setTimeout(() => {
        expect(navigateToNextMock.mock.calls).toEqual([[{ immediate: false }]]);
        done();
      }, 300);
    });
    it('calls navigateToPrevious ArrowLeft pressed', () => {
      const map = {};
      window.addEventListener = jest.fn((event, callback) => {
        map[event] = callback;
      });
      const TestComponent = () => {
        useKeboardControls({
          keyboardControls: 'arrows',
          navigateToNext: navigateToNextMock,
          navigateToPrevious: navigateToPrevMock,
          toggleMode: toggleModeMock
        });
        return <div data-testid="target">Target</div>;
      };
      mount(<TestComponent />);
      map.keydown({ key: 'ArrowLeft' });
      expect(navigateToPrevMock).toBeCalled();
    });
  });
  describe('it toggles view modes on mac', () => {
    beforeEach(() => {
      detectPlatform.isMacOS = jest.fn().mockReturnValue(true);
      detectPlatform.isWindows = jest.fn().mockReturnValue(false);
    });
    it('calls toggleMode with overViewMode when Alt + o is pressed', () => {
      const map = {};
      window.addEventListener = jest.fn((event, callback) => {
        map[event] = callback;
      });
      const TestComponent = () => {
        useKeboardControls({
          keyboardControls: 'arrows',
          navigateToNext: navigateToNextMock,
          navigateToPrevious: navigateToPrevMock,
          toggleMode: toggleModeMock
        });
        return <div data-testid="target">Target</div>;
      };
      mount(<TestComponent />);
      map.keydown({ key: 'ø', altKey: true });
      expect(toggleModeMock).toBeCalledWith('overviewMode');
    });
    it('calls toggleMode with presenterMode when Alt + n is pressed', () => {
      const map = {};
      window.addEventListener = jest.fn((event, callback) => {
        map[event] = callback;
      });
      const TestComponent = () => {
        useKeboardControls({
          keyboardControls: 'arrows',
          navigateToNext: navigateToNextMock,
          navigateToPrevious: navigateToPrevMock,
          toggleMode: toggleModeMock
        });
        return <div data-testid="target">Target</div>;
      };
      mount(<TestComponent />);
      map.keydown({ key: 'π', altKey: true });
      expect(toggleModeMock).toBeCalledWith('presenterMode');
    });
    it('calls toggleFullScreenMode when Alt + f is pressed', () => {
      const toggleFullScreenMock = jest.fn();
      toggleFullScreen.useToggleFullScreen = jest
        .fn()
        .mockReturnValue(toggleFullScreenMock);
      const map = {};
      window.addEventListener = jest.fn((event, callback) => {
        map[event] = callback;
      });
      const TestComponent = () => {
        useKeboardControls({
          keyboardControls: 'arrows',
          navigateToNext: navigateToNextMock,
          navigateToPrevious: navigateToPrevMock,
          toggleMode: toggleModeMock
        });
        return <div data-testid="target">Target</div>;
      };
      mount(<TestComponent />);
      map.keydown({ key: 'ƒ', altKey: true });
      expect(toggleFullScreenMock).toBeCalled();
    });
  });
  describe('it toggles view modes on windows', () => {
    beforeEach(() => {
      detectPlatform.isMacOS = jest.fn().mockReturnValue(false);
      detectPlatform.isWindows = jest.fn().mockReturnValue(true);
    });
    it('calls toggleMode with overViewMode when Alt + Shift + O is pressed', () => {
      const map = {};
      window.addEventListener = jest.fn((event, callback) => {
        map[event] = callback;
      });
      const TestComponent = () => {
        useKeboardControls({
          keyboardControls: 'arrows',
          navigateToNext: navigateToNextMock,
          navigateToPrevious: navigateToPrevMock,
          toggleMode: toggleModeMock
        });
        return <div data-testid="target">Target</div>;
      };
      mount(<TestComponent />);
      map.keydown({ key: 'O', altKey: true, shiftKey: true });
      expect(toggleModeMock).toBeCalledWith('overviewMode');
    });
    it('calls toggleMode with presenterMode when Alt + Shift + P is pressed', () => {
      const map = {};
      window.addEventListener = jest.fn((event, callback) => {
        map[event] = callback;
      });
      const TestComponent = () => {
        useKeboardControls({
          keyboardControls: 'arrows',
          navigateToNext: navigateToNextMock,
          navigateToPrevious: navigateToPrevMock,
          toggleMode: toggleModeMock
        });
        return <div data-testid="target">Target</div>;
      };
      mount(<TestComponent />);
      map.keydown({ key: 'P', altKey: true, shiftKey: true });
      expect(toggleModeMock).toBeCalledWith('presenterMode');
    });
    it('calls toggleFullScreenMode when Alt + Shift + F is pressed', () => {
      const toggleFullScreenMock = jest.fn();
      toggleFullScreen.useToggleFullScreen = jest
        .fn()
        .mockReturnValue(toggleFullScreenMock);
      const map = {};
      window.addEventListener = jest.fn((event, callback) => {
        map[event] = callback;
      });
      const TestComponent = () => {
        useKeboardControls({
          keyboardControls: 'arrows',
          navigateToNext: navigateToNextMock,
          navigateToPrevious: navigateToPrevMock,
          toggleMode: toggleModeMock
        });
        return <div data-testid="target">Target</div>;
      };
      mount(<TestComponent />);
      map.keydown({ key: 'F', altKey: true, shiftKey: true });
      expect(toggleFullScreenMock).toBeCalled();
    });
  });
});
