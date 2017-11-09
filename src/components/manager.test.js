import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import Manager from './manager';
import range from 'lodash/range';

const _mockContext = function(slide, routeParams) {
  return {
    styles: {
      global: {
        body: [],
      },
      controls: {},
      progress: {
        pacman: [],
      },
    },
    store: {
      getState: () => ({
        route: {
          params: routeParams,
          slide,
        },
        style: {
          globalStyleSet: [],
        },
        fragment: {
          fragments: []
        }
      }),
      dispatch: () => {},
      subscribe: () => {},
    },
  };
};

class MockSlide extends Component {
  render() {
    return <div>Slide Content</div>;
  }
}

class MockSlideSet extends Component {
  render() {
    return <div>{this.props.children}</div>;
  }
}
MockSlideSet.defaultProps = {
  hasSlideChildren: true,
};
MockSlideSet.propTypes = {
  children: PropTypes.array,
  hasSlideChildren: PropTypes.bool,
};

const _mockChildContext = function() {
  return { styles: () => {} };
};

const origLocalStorage = window.localStorage;

describe('<Manager />', () => {
  beforeAll(() => {
    window.localStorage = { setItem: () => {} };
  });

  afterAll(() => {
    window.localStorage = origLocalStorage;
  });

  test('should render correctly.', () => {
    const wrapper = mount(
      <Manager transition={['zoom', 'slide']} transitionDuration={500}>
        <MockSlide />
        <MockSlide />
      </Manager>,
      { context: _mockContext(0, []), childContextTypes: _mockChildContext() }
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should render the export configuration when specified.', () => {
    const wrapper = mount(
      <Manager>
        <MockSlide />
        <MockSlide />
      </Manager>,
      {
        context: _mockContext(0, ['export']),
        childContextTypes: _mockChildContext(),
      }
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should render the overview configuration when specified.', () => {
    const wrapper = mount(
      <Manager>
        <MockSlide />
        <MockSlide />
      </Manager>,
      {
        context: _mockContext(0, ['overview']),
        childContextTypes: _mockChildContext(),
      }
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should render with slideset slides', () => {
    const wrapper = mount(
      <Manager>
        <MockSlide />
        <MockSlideSet>
          <MockSlide />
          <MockSlide />
        </MockSlideSet>
      </Manager>,
      { context: _mockContext(1, []), childContextTypes: _mockChildContext() }
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should get the next index when using out-of-order viewing', () => {
    const wrapper = mount(
      <Manager>
        {range(0, 10).map(value => <MockSlide key={value} />)}
      </Manager>,
      { context: _mockContext(5, []), childContextTypes: _mockChildContext() }
    );
    const managerInstance = wrapper.instance().getWrappedInstance();
    managerInstance.viewedIndexes = new Set([0, 1, 2, 5, 4, 3]);
    // The next unviwed index should sort the set and figure out the next
    // best slide to go to, since 0 through 5 have been visited, 6 is the best.
    expect(managerInstance._nextUnviewedIndex()).toEqual(6);
  });

  test('should not exceed the maximum number of slides for next index', () => {
    const wrapper = mount(
      <Manager>
        {range(0, 11).map(value => <MockSlide key={value} />)}
      </Manager>,
      { context: _mockContext(10, []), childContextTypes: _mockChildContext() }
    );
    const managerInstance = wrapper.instance().getWrappedInstance();
    managerInstance.viewedIndexes = new Set([0, 1, 2, 5, 4, 3, 6, 9, 10, 7, 8]);
    // Even though we are on index 10, index 10 is still the next best index
    // because there are no more slides in the deck.
    expect(managerInstance._nextUnviewedIndex()).toEqual(10);
  });

  test('should calc a negative offset when routing from a higher index slide to lower', () => {
    const wrapper = mount(
      <Manager>
        <MockSlide />
        <MockSlide goTo={4} />
        <MockSlide />
        <MockSlide goTo={3} />
        <MockSlide />
      </Manager>,
      { context: _mockContext(3, []), childContextTypes: _mockChildContext() }
    );
    const managerInstance = wrapper.instance().getWrappedInstance();
    managerInstance.viewedIndexes = new Set([0, 1, 3]);
    // We are at slide 4 (index 3) which directs us to go to
    // slide 3 (index 2) the delta should be 2 - 3, thus -1.
    expect(managerInstance._getOffset(3)).toEqual(-1);
  });

  test('should calc a positive offset when routing from a lower index slide to higher', () => {
    const wrapper = mount(
      <Manager>
        <MockSlide />
        <MockSlide goTo={4} />
        <MockSlide />
        <MockSlide goTo={3} />
        <MockSlide />
      </Manager>,
      { context: _mockContext(1, []), childContextTypes: _mockChildContext() }
    );
    const managerInstance = wrapper.instance().getWrappedInstance();
    managerInstance.viewedIndexes = new Set([0, 1]);
    // We are at slide 2 (index 1) which directs us to go to
    // slide 4 (index 3) the delta should be 3 - 1, thus 2.
    expect(managerInstance._getOffset(1)).toEqual(2);
  });
});
