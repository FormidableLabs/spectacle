import React from 'react';
import { mount } from 'enzyme';
import Slide from './slide';

const _mockContext = function() {
  return {
    styles: {
      global: {
        body: {
          background: '#eee',
        },
      },
      components: {
        content: {},
      },
    },
    store: {
      getState: () => ({ route: '' }),
    },
  };
};

describe('<Slide />', () => {
  beforeEach(() => {
    window.watchMedia = jest.fn();
    window.matchMedia = jest.fn().mockReturnValue({ matches: [] });
  });

  afterEach(() => {
    window.watchMedia = null;
    window.matchMedia = null;
  });

  test('should render correctly without transitions.', () => {
    const wrapper = mount(
      <Slide>
        <div>Slide Content</div>
      </Slide>,
      { context: _mockContext() }
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should render correctly with transitions.', () => {
    const wrapper = mount(
      <Slide transition={['slide', 'spin']}>
        <div>Slide Content</div>
      </Slide>,
      { context: _mockContext() }
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should return the correct transition keys', () => {
    const wrapper = mount(
      <Slide transitionIn={['slide']} transitionOut={['fade']}>
        <div>Slide Content</div>
      </Slide>,
      { context: _mockContext() }
    );

    expect(wrapper.instance().getTransitionKeys()).toEqual(['slide']);
    wrapper.setState({ reverse: true });
    expect(wrapper.instance().getTransitionKeys()).toEqual(['fade']);
  });
});
