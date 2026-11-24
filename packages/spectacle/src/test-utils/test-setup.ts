/**
 * JSDom does not provide this method, but it's needed for various components
 * to mount appropriately.
 * Here, we're mocking this method with some static values.
 */
window.HTMLElement.prototype.getClientRects = (): any => [
  {
    width: 500,
    height: 300
  }
];

jest.mock('use-resize-observer', () => {
  return jest.requireActual('use-resize-observer/polyfilled');
});

jest.mock('broadcast-channel', () => {
  const actualBroadcastChannel = jest.requireActual('broadcast-channel');
  const ActualBroadcastChannel = actualBroadcastChannel.BroadcastChannel;

  // The `simulate` mode prevents tests from hanging after mounting a Deck, and
  // the exports of the actual module are read-only getters, so the mock is
  // built around them instead of being written to.
  return {
    __esModule: true,
    ...actualBroadcastChannel,
    BroadcastChannel: class SimulatedBroadcastChannel extends ActualBroadcastChannel {
      constructor(name: string) {
        super(name, { type: 'simulate' });
      }
    }
  };
});
