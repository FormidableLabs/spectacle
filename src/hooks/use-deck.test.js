import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import useDeck from './use-deck';

Enzyme.configure({ adapter: new Adapter() });

describe('useDeck', () => {
  it('initialises', () => {
    const TestComponent = () => {
      const { state, dispatch } = useDeck({ currentSlide: 0, notes: '' });
      return <div>{state.slideNumber}</div>;
    };
    const component = shallow(<TestComponent />);
    expect(component.find('div').length).toBe(1);
  });

  it('updates the state based on GO_TO_SLIDE type', () => {
    let setOutsideState = jest.fn();
    const TestComponent = () => {
      const { state, dispatch } = useDeck({ currentSlide: 0, notes: '' });
      const testCase = () =>
        dispatch({ type: 'GO_TO_SLIDE', payload: { slideNumber: 3 } });
      React.useEffect(() => setOutsideState(state), [state]);
      return (
        <>
          <div>{state.slideNumber}</div>
          <button
            data-testid="dispatch button"
            onClick={() => testCase()}
          ></button>
        </>
      );
    };
    const component = mount(<TestComponent />);
    // Getting internal state by calling mock function with state
    expect(setOutsideState).toHaveBeenNthCalledWith(1, {
      currentNotes: undefined,
      currentSlide: 0,
      notes: ''
    });
    component.find('button').simulate('click');
    expect(setOutsideState).toHaveBeenNthCalledWith(2, {
      currentNotes: undefined,
      currentSlide: 3,
      currentSlideElement: undefined,
      exportMode: undefined,
      immediate: undefined,
      immediateElement: false,
      notes: '',
      overviewMode: undefined,
      presenterMode: undefined,
      printMode: undefined,
      resolvedInitialUrl: true,
      reverseDirection: undefined
    });
  });
  it('updates the state based on SET_NOTES type', () => {
    let setOutsideState = jest.fn();
    const TestComponent = () => {
      const { state, dispatch } = useDeck({ currentSlide: 0, notes: '' });
      const testCase = () =>
        dispatch({
          type: 'SET_NOTES',
          payload: { slideNumber: 0, notes: 'hello there' }
        });
      React.useEffect(() => setOutsideState(state), [state]);
      return (
        <>
          <div>{state.slideNumber}</div>
          <button
            data-testid="dispatch button"
            onClick={() => testCase()}
          ></button>
        </>
      );
    };
    const component = mount(<TestComponent />);
    // Getting internal state by calling mock function with state
    expect(setOutsideState).toHaveBeenNthCalledWith(1, {
      currentNotes: undefined,
      currentSlide: 0,
      notes: ''
    });
    component.find('button').simulate('click');
    expect(setOutsideState).toHaveBeenNthCalledWith(2, {
      currentNotes: 'hello there',
      currentSlide: 0,
      notes: {
        '0': 'hello there'
      }
    });
  });
  it('updates the state based on TOGGLE_MODE type', () => {
    let setOutsideState = jest.fn();
    const TestComponent = () => {
      const { state, dispatch } = useDeck({ currentSlide: 0, notes: '' });
      const testCase = () =>
        dispatch({
          type: 'TOGGLE_MODE',
          payload: { mode: 'presenterMode' }
        });
      React.useEffect(() => setOutsideState(state), [state]);
      return (
        <>
          <div>{state.slideNumber}</div>
          <button
            data-testid="dispatch button"
            onClick={() => testCase()}
          ></button>
        </>
      );
    };
    const component = mount(<TestComponent />);
    // Getting internal state by calling mock function with state
    expect(setOutsideState).toHaveBeenNthCalledWith(1, {
      currentNotes: undefined,
      currentSlide: 0,
      notes: ''
    });
    component.find('button').simulate('click');
    expect(setOutsideState).toHaveBeenNthCalledWith(2, {
      currentSlide: 0,
      notes: '',
      presenterMode: true
    });
  });
});
