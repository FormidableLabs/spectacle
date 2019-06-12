"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _reducers = _interopRequireDefault(require("../reducers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var configureStore = function configureStore() {
  var createStoreWithMiddleware = (0, _redux.applyMiddleware)()(_redux.createStore);
  var store = createStoreWithMiddleware(_reducers.default);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', function () {
      var nextReducer = require('../reducers');

      store.replaceReducer(nextReducer);
    });
  }

  return store;
};

var _default = configureStore;
exports.default = _default;