import uniqueId from "lodash/uniqueId";
import { remoteState } from "../actions";
let connected = false;
const uid = uniqueId();

export const sendState = (store, socket) => {
  const state = JSON.parse(JSON.stringify(store.getState()));
  const action = store.getState().lastAction;
  const payload = {
    state,
    type: "REMOTE_STATE",
    uid
  };
  if (connected && action.type !== "REMOTE_STATE" && !action.payload.remote) {
    payload.state.route.params.splice(
      payload.state.route.params.findIndex(
        (el) => el === "presenter"
      ),
      1
    );
    socket.send(JSON.stringify(payload));
  }
};

export const setup = (store, socket) => {
  socket.on("open", () => {
    connected = true;
  });

  socket.on("message", (event) => {
    const message = JSON.parse(event.data);
    switch (message.type) {
      case "REMOTE_STATE":
        store.dispatch(remoteState(message.state));
        break;
    }
  });
};
