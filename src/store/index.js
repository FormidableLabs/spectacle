import { createStore, applyMiddleware } from "redux";
import reducer from "../reducers";

const configureStore = () => {
  const createStoreWithMiddleware = applyMiddleware()(createStore);
  const store = createStoreWithMiddleware(reducer);

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
