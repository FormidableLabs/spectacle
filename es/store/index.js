import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers';

var configureStore = function configureStore() {
  var createStoreWithMiddleware = applyMiddleware()(createStore);
  var store = createStoreWithMiddleware(reducer);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', function () {
      var nextReducer = require('../reducers');

      store.replaceReducer(nextReducer);
    });
  }

  return store;
};

export default configureStore;