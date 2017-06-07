import React from 'react';
import { mount } from 'enzyme';
import Notes from './notes';

const mockContext = function(
  currentSlide,
  parentSlide,
  updateNotes = () => {}
) {
  return {
    updateNotes,
    slideHash: parentSlide,
    store: {
      getState: () => ({
        route: {
          slide: currentSlide
        }
      })
    }
  };
};

describe('<Notes />', () => {
  test('should render correctly', () => {
    const wrapper = mount(
      <Notes><ul><li>First</li><li>Second</li></ul></Notes>,
      { context: mockContext(1, '2') }
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should update notes on matching slide', () => {
    const updateNotes = jest.fn();
    const children = <ul><li>First</li><li>Second</li></ul>;
    const vDom = <Notes>{children}</Notes>;

    mount(vDom, { context: mockContext('1', 2, updateNotes) });
    expect(updateNotes.mock.calls.length).toEqual(0);

    mount(vDom, { context: mockContext('2', 2, updateNotes) });
    expect(updateNotes.mock.calls.length).toEqual(1);
    expect(updateNotes.mock.calls[0]).toEqual([children]);

    mount(vDom, { context: mockContext('hurz', 'hurz', updateNotes) });
    expect(updateNotes.mock.calls.length).toEqual(2);
    expect(updateNotes.mock.calls[0]).toEqual([children]);
  });
});
