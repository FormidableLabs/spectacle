import React, { Component } from 'react';
import { mount } from 'enzyme';
import SlideSet from './slide-set';

const _mockContext = function() {
  return {};
};

class MockSlide extends Component {
  render() {
    return <div>Slide Content</div>;
  }
}

describe('<SlideSet />', () => {
  test('should render correctly', () => {
    const wrapper = mount(
      <SlideSet>
        <MockSlide />
        <MockSlide />
      </SlideSet>,
      { context: _mockContext() }
    );
    expect(wrapper).toMatchSnapshot();
  });
});
