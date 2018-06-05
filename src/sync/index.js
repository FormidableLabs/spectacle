let ws = null;
let ready = false;

if (!ws) {
  ws = new WebSocket(`ws://${self.location.host}`);

  ws.onopen = function() {
    ready = true;
    ws.onmessage = function(ev) {
      if (publicWrapper.receiveHandler) {
        publicWrapper.receiveHandler(ev);
      }
    };
  };
}

const publicWrapper = {
  send: msg => {
    if (ws && ready) {
      ws.send(msg);
    }
  },
  receiveHandler: null
};

export default publicWrapper;
