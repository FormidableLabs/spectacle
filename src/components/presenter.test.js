import React from 'react';
import { mount } from 'enzyme';
import Presenter from './presenter';

const _mockRoute = function(slide) {
  return { params: [], slide };
};

const _mockContext = function() {
  return {
    store: {
      getState: () => ({ route: '' }),
    },
  };
};

const _mockSlides = function() {
  const Slide = () => <div>Slide Content</div>;
  return [<Slide key={0} />, <Slide key={1} />, <Slide key={2} />];
};

const _mockSlidesWithNotes = function() {
  const notes = 'These are my slide notes!!';
  const Slide = () => <div>Slide Content</div>;
  return [
    <Slide key={0} />,
    <Slide key={1} notes={notes} />,
    <Slide key={2} />,
  ];
};

const mockDateFn = jest.fn();
mockDateFn.mockReturnValue('November 07, 2016 11:04:08');

const _mockSlideReference = function() {
  return [
    { id: 0, rootIndex: 0 },
    { id: 1, rootIndex: 1 },
    { id: 2, rootIndex: 2 },
  ];
};

describe('<Presenter />', () => {
  beforeAll(() => {
    global.Date.now = mockDateFn;
  });

  test('should render correctly', () => {
    const wrapper = mount(
      <Presenter
        dispatch={() => {}}
        slides={_mockSlides()}
        slideIndex={1}
        slideReference={_mockSlideReference()}
        hash={1}
        route={_mockRoute(1)}
        lastSlide={0}
      />,
      { context: _mockContext() }
    );

    wrapper.instance().componentWillMount = jest.fn();
    expect(wrapper).toMatchSnapshot();
  });

  test('should render with notes when slides have them.', () => {
    const wrapper = mount(
      <Presenter
        dispatch={() => {}}
        slides={_mockSlidesWithNotes()}
        slideIndex={1}
        slideReference={_mockSlideReference()}
        hash={1}
        route={_mockRoute(1)}
        lastSlide={0}
      />,
      { context: _mockContext() }
    );

    wrapper.instance().componentWillMount = jest.fn();
    expect(wrapper).toMatchSnapshot();
  });

  test('should render timer when set in params.', () => {
    const wrapper = mount(
      <Presenter
        dispatch={() => {}}
        slides={_mockSlidesWithNotes()}
        slideIndex={1}
        slideReference={_mockSlideReference()}
        hash={1}
        route={_mockRoute(1)}
        lastSlide={0}
        timer
      />,
      { context: _mockContext() }
    );
    wrapper.instance().componentWillMount = jest.fn();
    expect(wrapper).toMatchSnapshot();
  });
});
