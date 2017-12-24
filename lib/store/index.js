'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _reducers = require('../reducers');

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var configureStore = function configureStore() {
  var createStoreWithMiddleware = (0, _redux.applyMiddleware)()(_redux.createStore);
  var store = createStoreWithMiddleware(_reducers2.default);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', function () {
      var nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
};

exports.default = configureStore;