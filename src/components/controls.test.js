import React from 'react';
import { mount } from 'enzyme';
import Controls from './controls';

describe('<Controls />', () => {
  test('should render correctly.', () => {
    const context = {
      styles: {
        controls: {
          prev: { background: '#f00' },
          next: { background: '#f0f' },
        },
      },
    };
    const wrapper = mount(
      <Controls
        currentSlideIndex={2}
        totalSlides={5}
        onPrev={() => {}}
        onNext={() => {}}
      />,
      { context }
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should call the next function when the next button is selected', () => {
    const context = { styles: { controls: {} } };
    const nextFunc = jest.fn();
    const wrapper = mount(
      <Controls
        currentSlideIndex={2}
        totalSlides={5}
        onPrev={() => {}}
        onNext={nextFunc}
      />,
      { context }
    );
    wrapper
      .findWhere(node => node.name() === 'button' && node.key() === 'next')
      .simulate('click');
    expect(nextFunc).toHaveBeenCalledTimes(1);
  });

  test('should call the prev function when the previous button is selected', () => {
    const context = { styles: { controls: {} } };
    const prevFunc = jest.fn();
    const wrapper = mount(
      <Controls
        currentSlideIndex={3}
        totalSlides={5}
        onPrev={prevFunc}
        onNext={() => {}}
      />,
      { context }
    );
    wrapper
      .findWhere(node => node.name() === 'button' && node.key() === 'prev')
      .simulate('click');
    expect(prevFunc).toHaveBeenCalledTimes(1);
  });
});
