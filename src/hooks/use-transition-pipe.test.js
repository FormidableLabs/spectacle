import * as React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as wonka from 'wonka';

import {
  TransitionPipeContext,
  TransitionPipeProvider
} from './use-transition-pipe';

Enzyme.configure({ adapter: new Adapter() });
jest.mock('wonka', () => {
  return {
    pipe: jest.fn(),
    subscribe: jest.fn().mockReturnValue({
      start: () => null
    }),
    makeSubject: jest.fn().mockReturnValue([{}, { beep: 'boop' }])
  };
});

describe('useTransitionPipe', () => {
  const runTransitionCallBack = jest.fn();
  const TestComponent = () => {
    const { runTransition } = React.useContext(TransitionPipeContext);
    React.useEffect(() => {
      runTransitionCallBack(runTransition);
    }, [runTransition]);
    return <></>;
  };
  it('calls makeSubject, subscribe and pipe from wonka', () => {
    mount(
      <TransitionPipeProvider>
        <TestComponent />
      </TransitionPipeProvider>
    );
    expect(wonka.pipe).toBeCalled();
    expect(wonka.subscribe).toBeCalled();
    expect(wonka.makeSubject).toBeCalled();
  });
  it('returns expected transition object ', () => {
    mount(
      <TransitionPipeProvider>
        <TestComponent />
      </TransitionPipeProvider>
    );
    expect(runTransitionCallBack).toBeCalledWith({ beep: 'boop' });
  });
});
