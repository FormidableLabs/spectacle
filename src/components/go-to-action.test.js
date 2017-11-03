import React from 'react';
import { mount } from 'enzyme';
import GoToAction from './go-to-action';

describe('<GoToAction />', () => {
  test('should call the context function with the slide prop when it has a child', () => {
    const stub = jest.fn();
    const context = {
      styles: { components: { goToAction: {} } },
      goToSlide: stub
    };
    const wrapper = mount(
      <GoToAction slide={2}>Slide 2</GoToAction>, { context }
    );
    wrapper.simulate('click');
    expect(stub).toHaveBeenCalledTimes(1);
    expect(stub).toHaveBeenCalledWith(2);
  });

  test('should call the context function when providing a custom component', () => {
    const stub = jest.fn();
    const context = {
      styles: { components: { goToAction: {} } },
      goToSlide: stub
    };
    const wrapper = mount(
      <GoToAction
        render={goToSlide => (
          <button id="inner-btn" onClick={() => goToSlide('wait-what')}>
            WAIT WUT
          </button>
        )}
      />, { context }
    );
    wrapper.find('button#inner-btn').simulate('click');
    expect(stub).toHaveBeenCalledTimes(1);
    expect(stub).toHaveBeenCalledWith('wait-what');
  });

  test('should just render a div when no props are provided', () => {
    const context = {
      styles: { components: { goToAction: {} } },
      goToSlide: () => {}
    };
    const wrapper = mount(
      <GoToAction />, { context }
    );
    expect(wrapper).toMatchSnapshot();
  });
});
