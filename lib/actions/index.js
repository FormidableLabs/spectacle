"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setGlobalStyle = exports.updateRoute = exports.updateFragment = exports.addFragment = void 0;

var _reduxActions = require("redux-actions");

var addFragment = (0, _reduxActions.createAction)('ADD_FRAGMENT');
exports.addFragment = addFragment;
var updateFragment = (0, _reduxActions.createAction)('UPDATE_FRAGMENT');
exports.updateFragment = updateFragment;
var updateRoute = (0, _reduxActions.createAction)('UPDATE_ROUTE');
exports.updateRoute = updateRoute;
var setGlobalStyle = (0, _reduxActions.createAction)('SET_GLOBAL_STYLE');
exports.setGlobalStyle = setGlobalStyle;