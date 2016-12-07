import WebSocket from "reconnecting-websocket";
import EventEmitter from "eventemitter3";

export default class Socket extends EventEmitter {
  socket;
  connected = false;

  constructor(uri) {
    super();
    if (uri) {
      this.setup(uri);
    }
  }

  setup(uri) {
    this.socket = new WebSocket(uri);
    this.socket.addEventListener("open", () => {
      this.connected = true;
      this.emit("open");
    });

    this.socket.onmessage = (event) => {
      this.emit("message", event);
    };
  }

  send(payload) {
    if (this.connected) {
      this.socket.send(payload);
    }
  }
}
