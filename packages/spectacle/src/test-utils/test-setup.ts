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
  const bcExport = jest.requireActual('broadcast-channel');
  const ActualBroadcastChannel = bcExport.BroadcastChannel;

  // Wrap the BroadcastChannel constructor so it always uses the `simulate`
  // mode. This prevents tests from hanging after mounting a Deck.
  bcExport.BroadcastChannel = function (name: string) {
    return new ActualBroadcastChannel(name, { type: 'simulate' });
  };

  return bcExport;
});
