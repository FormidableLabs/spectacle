'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setGlobalStyle = exports.updateRoute = exports.updateFragment = exports.addFragment = undefined;

var _reduxActions = require('redux-actions');

var addFragment = exports.addFragment = (0, _reduxActions.createAction)('ADD_FRAGMENT');
var updateFragment = exports.updateFragment = (0, _reduxActions.createAction)('UPDATE_FRAGMENT');

var updateRoute = exports.updateRoute = (0, _reduxActions.createAction)('UPDATE_ROUTE');

var setGlobalStyle = exports.setGlobalStyle = (0, _reduxActions.createAction)('SET_GLOBAL_STYLE');