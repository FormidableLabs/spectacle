import React from 'react';
import { mount, shallow } from 'enzyme';
import Fullscreen, { Fullscreen as Component } from './fullscreen';

describe('<Fullscreen />', () => {
  test('should render correctly.', () => {
    const context = { styles: { styles: { fullscreen: {} } } };
    const wrapper = mount(<Fullscreen />, { context });
    expect(wrapper).toMatchSnapshot();
  });

  test('should toggle fullscreen when the button is selected.', () => {
    const context = { styles: { styles: { fullscreen: {} } } };
    const stub = jest.fn();
    Component.prototype.handleToggleFullScreen = stub;
    const wrapper = shallow(<Component />, { context });
    wrapper.find('svg').simulate('click');
    expect(stub).toHaveBeenCalledTimes(1);
  });
});
