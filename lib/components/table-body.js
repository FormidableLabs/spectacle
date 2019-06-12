"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TableBody;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TableBody(_ref) {
  var children = _ref.children;
  return _react.default.createElement("tbody", null, children);
}

TableBody.propTypes = {
  children: _propTypes.default.node
};
TableBody.contextTypes = {
  styles: _propTypes.default.object,
  store: _propTypes.default.object
};