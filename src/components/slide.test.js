import React from 'react';
import { mount } from 'enzyme';
import Slide from './slide';
import Appear from './appear';

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
      getState: () => ({ route: { params: '', slide: 0 } }),
      subscribe: () => {},
      dispatch: () => {}
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

  test('should call optional callback when slide becomes active', () => {
    const spy = jest.fn();
    mount(
      <Slide onActive={spy} slideIndex={5}>
        <div>Slide Content</div>
      </Slide>,
      { context: _mockContext() }
    );
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toBeCalledWith(5);
  });

  test('should create <Appear /> fragments with their appearance in order', () => {
    const spy = jest.fn();
    mount(
      <Slide slideIndex={4} dispatch={spy} hash={4}>
        <Appear order={2} fragment={{ fragments: [] }}>
          <div className="second">This shows second</div>
        </Appear>
        <Appear order={3} fragment={{ fragments: [] }}>
          <div className="third">This shows third</div>
        </Appear>
        <Appear order={1} fragment={{ fragments: [] }}>
          <div className="first">This shows first</div>
        </Appear>
      </Slide>,
      { context: _mockContext() }
    );
    expect(spy).toHaveBeenCalledTimes(3);
    expect(spy.mock.calls).toEqual([
      [{
        payload: { slide: 4, id: '4-0', visible: false, className: 'fragment first' },
        type: 'ADD_FRAGMENT'
      }],
      [{
        payload: { slide: 4, id: '4-1', visible: false, className: 'fragment second' },
        type: 'ADD_FRAGMENT'
      }],
      [{
        payload: { slide: 4, id: '4-2', visible: false, className: 'fragment third' },
        type: 'ADD_FRAGMENT'
      }]
    ]);
  });

  test('should order <Appear /> fragments without an order first', () => {
    const spy = jest.fn();
    mount(
      <Slide slideIndex={7} dispatch={spy} hash={7}>
        <Appear order={1} fragment={{ fragments: [] }}>
          <div className="first">This shows second</div>
        </Appear>
        <Appear fragment={{ fragments: [] }}>
          <div className="no-order">This shows third</div>
        </Appear>
        <Appear order={2} fragment={{ fragments: [] }}>
          <div className="second">This shows first</div>
        </Appear>
      </Slide>,
      { context: _mockContext() }
    );
    expect(spy).toHaveBeenCalledTimes(3);
    expect(spy.mock.calls).toEqual([
      [{
        payload: { slide: 7, id: '7-0', visible: false, className: 'fragment no-order' },
        type: 'ADD_FRAGMENT'
      }],
      [{
        payload: { slide: 7, id: '7-1', visible: false, className: 'fragment first' },
        type: 'ADD_FRAGMENT'
      }],
      [{
        payload: { slide: 7, id: '7-2', visible: false, className: 'fragment second' },
        type: 'ADD_FRAGMENT'
      }]
    ]);
  });
});
