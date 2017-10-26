import React from 'react';
import { mount } from 'enzyme';
import Fullscreen from './fullscreen';

describe('<Fullscreen />', () => {
  test('should render correctly.', () => {
    const context = { styles: { styles: { fullscreen: {} } } };
    const wrapper = mount(<Fullscreen />, { context });
    expect(wrapper).toMatchSnapshot();
  });

  test('should toggle fullscreen when the button is selected.', () => {
    const context = { styles: { styles: { fullscreen: {} } } };
    const wrapper = mount(<Fullscreen />, { context });
    const stub = jest.fn();
    wrapper.instance().handleToggleFullScreen = stub;
    wrapper.update();
    wrapper.find('svg').simulate('click');
    expect(stub).toHaveBeenCalledTimes(1);
  });
});
