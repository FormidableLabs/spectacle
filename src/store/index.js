import { createStore, combineReducers, applyMiddleware } from "redux"
import reducer from "../reducers"
import createLogger from 'redux-logger';



export default function configureStore(initialState) {
  const logger = createLogger();
  const createStoreWithMiddleware = applyMiddleware(logger)(createStore);
  const store = createStoreWithMiddleware(reducer);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../reducers", () => {
      const nextReducer = require("../reducers");
      store.replaceReducer(nextReducer);
    })
  }

  return store;
}
