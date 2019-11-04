import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { useToggleFullScreen } from './use-full-screen';

Enzyme.configure({ adapter: new Adapter() });

describe('useToggleFullScreen', () => {
  it('calls document.documentElement.requestFullscreen when not fullscreen', () => {
    document.documentElement.requestFullscreen = jest.fn();
    document.fullscreenElement = false;
    const TestComponent = () => {
      const toggleFullScreen = useToggleFullScreen();
      return (
        <button
          data-testid="toggle fullscreen button"
          onClick={() => toggleFullScreen()}
        ></button>
      );
    };
    const component = shallow(<TestComponent />);
    component
      .find('[data-testid="toggle fullscreen button"]')
      .simulate('click');
    expect(document.documentElement.requestFullscreen).toHaveBeenCalled();
  });
  it('calls document.exitFullscreen when in fullscreen', () => {
    document.exitFullscreen = jest.fn();
    document.fullscreenElement = true;
    const TestComponent = () => {
      const toggleFullScreen = useToggleFullScreen();
      return (
        <button
          data-testid="toggle fullscreen button"
          onClick={() => toggleFullScreen()}
        ></button>
      );
    };
    const component = shallow(<TestComponent />);
    component
      .find('[data-testid="toggle fullscreen button"]')
      .simulate('click');
    expect(document.exitFullscreen).toHaveBeenCalled();
  });
});
