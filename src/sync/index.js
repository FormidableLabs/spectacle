let ws = null;
if (!ws) {
  ws = new WebSocket(`ws://${self.location.host}`);
}

let ready = false;

const wrapper = {
    send: (msg) => {
			if (ws && ready) {
				ws.send(msg);
			}
    },
    receiveHandler: null
};

ws.onopen = function () {
    ready = true;
    ws.onmessage = function (ev) {
			if (wrapper.receiveHandler) {
				wrapper.receiveHandler(ev);
			}
    };
};

export default wrapper;
