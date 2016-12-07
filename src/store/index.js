import { createStore, applyMiddleware } from "redux";
import reducer from "../reducers";
import { setup, sendState } from "./remote";
let store;


export const subscribe = (remote) => {
  store.subscribe(() => sendState(store, remote));
};

export const setupRemote = (remote) => {
  setup(store, remote);
};

const configureStore = () => {
  const createStoreWithMiddleware = applyMiddleware()(createStore);
  store = createStoreWithMiddleware(reducer);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../reducers", () => {
      const nextReducer = require("../reducers");
      store.replaceReducer(nextReducer);
    });
  }

  return store;
};

export default configureStore;
