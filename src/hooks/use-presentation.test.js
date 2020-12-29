import 'regenerator-runtime/runtime';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { renderHook, act } from '@testing-library/react-hooks';
import usePresentation from './use-presentation';

Enzyme.configure({ adapter: new Adapter() });

describe('usePresentation', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it('when starting connection it calls start method on PresentationRequest.', async () => {
    const startMock = jest.fn().mockResolvedValue({ terminate: () => {} });
    global.PresentationRequest = jest
      .fn()
      .mockImplementationOnce(() => ({ start: startMock }));
    const {
      result: { current },
      waitForNextUpdate
    } = renderHook(() => usePresentation(), {});
    await act(async () => {
      current.startConnection();
      await waitForNextUpdate();
    });
    expect(startMock).toBeCalled();
  });

  it('assigns the connection object on start.', async () => {
    const startMock = jest.fn().mockResolvedValue({ terminate: () => {} });
    global.PresentationRequest = jest
      .fn()
      .mockImplementationOnce(() => ({ start: startMock }));
    const { result, waitForValueToChange } = renderHook(
      () => usePresentation(),
      {}
    );
    await act(async () => {
      result.current.startConnection();
      await waitForValueToChange(() => {
        jest.runAllTimers();
        return result.current.connection;
      });
    });
    expect(result.current.connection).not.toBeNull();
  });

  it('should send a stringified message to connection send handler.', async () => {
    const sendMessageFn = jest.fn();
    const startMock = jest
      .fn()
      .mockResolvedValue({ terminate: () => {}, send: sendMessageFn });
    global.PresentationRequest = jest
      .fn()
      .mockImplementationOnce(() => ({ start: startMock }));
    const { result, waitForValueToChange } = renderHook(
      () => usePresentation(),
      {}
    );
    await act(async () => {
      result.current.startConnection();
      await waitForValueToChange(() => {
        jest.runAllTimers();
        return result.current.connection;
      });
      result.current.sendMessage('Spectacle Message :)');
    });
    expect(sendMessageFn).toBeCalledWith(
      JSON.stringify('Spectacle Message :)')
    );
  });

  it('should close the connection on terminate.', async () => {
    const terminateFn = jest.fn();
    const startMock = jest
      .fn()
      .mockResolvedValue({ terminate: terminateFn, send: () => {} });
    global.PresentationRequest = jest
      .fn()
      .mockImplementationOnce(() => ({ start: startMock }));
    const { result, waitForValueToChange } = renderHook(
      () => usePresentation(),
      {}
    );
    await act(async () => {
      result.current.startConnection();
      await waitForValueToChange(() => {
        jest.runAllTimers();
        return result.current.connection;
      });
      result.current.terminateConnection();
    });
    expect(terminateFn).toBeCalled();
  });
});
