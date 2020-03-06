import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { DeckContext } from './use-deck';

import useSlide from './use-slide';

Enzyme.configure({ adapter: new Adapter() });

describe('useSlide', () => {
  it('if currentSlide === slideNum then isActiveSlide == true', () => {
    const isActiveSlideCallback = jest.fn();
    const TestComponent = () => {
      const {
        state: { isActiveSlide }
      } = useSlide(1);
      React.useEffect(() => isActiveSlideCallback(isActiveSlide), [
        isActiveSlide
      ]);
      return <></>;
    };
    mount(
      <DeckContext.Provider
        value={{
          slideElementMap: { 0: 0, 1: 0 },
          state: {
            currentSlide: 1
          }
        }}
      >
        <TestComponent />
      </DeckContext.Provider>
    );
    expect(isActiveSlideCallback).toBeCalledWith(true);
  });
  it('slideElementsLength is correct', () => {
    const slideElementsLengthCallback = jest.fn();
    const TestComponent = () => {
      const {
        state: { slideElementsLength }
      } = useSlide(1);
      React.useEffect(() => slideElementsLengthCallback(slideElementsLength), [
        slideElementsLength
      ]);
      return <></>;
    };
    mount(
      <DeckContext.Provider
        value={{
          slideElementMap: { 0: 0, 1: 3 },
          state: {
            currentSlide: 1
          }
        }}
      >
        <TestComponent />
      </DeckContext.Provider>
    );
    expect(slideElementsLengthCallback).toBeCalledWith(3);
  });
  it('setNotes calls deckContextDispatch with the correct arguments', () => {
    const deckContextDispatchCallback = jest.fn();
    const TestComponent = () => {
      const {
        actions: { setNotes }
      } = useSlide(1);
      return (
        <button
          data-testid="setNotes button"
          onClick={() => setNotes('beep')}
        ></button>
      );
    };
    const component = mount(
      <DeckContext.Provider
        value={{
          slideElementMap: { 0: 0, 1: 3 },
          state: {
            currentSlide: 1
          },
          dispatch: deckContextDispatchCallback
        }}
      >
        <TestComponent />
      </DeckContext.Provider>
    );
    component.find('[data-testid="setNotes button"]').simulate('click');
    expect(deckContextDispatchCallback).toBeCalledWith({
      payload: { notes: 'beep', slideNumber: 1 },
      type: 'SET_NOTES'
    });
  });
});
