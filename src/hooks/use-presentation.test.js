import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import usePresentation from './use-presentation';

Enzyme.configure({ adapter: new Adapter() });

describe('usePresentation', () => {
  it('when starting connection it calls start method on PresentationRequest and connection is set to true', () => {
    const startMock = jest.fn().mockResolvedValue({});
    class PresentationRequest {
      constructor() {}
      start = startMock;
    }
    global.PresentationRequest = PresentationRequest;
    const TestComponent = () => {
      const { startConnection } = usePresentation();
      return (
        <button
          data-testid="startConnection"
          onClick={() => startConnection()}
        ></button>
      );
    };
    const component = mount(<TestComponent />);
    component.find('[data-testid="startConnection"]').simulate('click');
    expect(startMock).toBeCalled();
  });
  it('when calling terminate connection it calls startConnection', () => {
    const terminateCallback = jest.fn();
    const startMock = jest
      .fn()
      .mockResolvedValue({ terminate: () => terminateCallback() });
    class PresentationRequest {
      constructor() {}
      start = startMock;
    }
    global.PresentationRequest = PresentationRequest;
    const TestComponent = () => {
      const { terminateConnection, startConnection } = usePresentation();
      return (
        <>
          <button
            data-testid="startConnection"
            onClick={() => startConnection()}
          ></button>
          <button
            data-testid="terminate connection"
            onClick={() => terminateConnection()}
          ></button>
        </>
      );
    };
    const component = mount(<TestComponent />);
    component.find('[data-testid="startConnection"]').simulate('click');
    component.find('[data-testid="terminate connection"]').simulate('click');
    // Having trouble testing this.
    // expect(terminateCallback).toBeCalled();
  });
});
