import Progress from './progress';
import React from 'react';
import { mount } from 'enzyme';

const _mockSlideIndexReference = function() {
  return [{ id: 0 }, { id: 1 }, { id: 'last' }];
};

describe('<Progress />', () => {
  test('should render PacMan correctly', () => {
    const context = { styles: { progress: { pacman: [] } } };
    const wrapper = mount(
      <Progress
        type="pacman"
        items={_mockSlideIndexReference()}
        currentSlideIndex={2}
      />,
      { context }
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should render the number style correctly', () => {
    const context = { styles: { progress: { number: [] } } };
    const wrapper = mount(
      <Progress
        type="number"
        items={_mockSlideIndexReference()}
        currentSlideIndex={1}
      />,
      { context }
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should render the bar style correctly', () => {
    const context = { styles: { progress: { bar: [] } } };
    const wrapper = mount(
      <Progress
        type="bar"
        items={_mockSlideIndexReference()}
        currentSlideIndex={1}
      />,
      { context }
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should render nothing when none is provided.', () => {
    const context = { styles: { progress: {} } };
    const wrapper = mount(
      <Progress
        type="none"
        items={_mockSlideIndexReference()}
        currentSlideIndex={3}
      />,
      { context }
    );
    expect(wrapper).toMatchSnapshot();
  });
});
