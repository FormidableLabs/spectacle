"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TableHeader;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TableHeader(_ref) {
  var children = _ref.children;
  return _react.default.createElement("thead", null, children);
}

TableHeader.propTypes = {
  children: _propTypes.default.node
};
TableHeader.contextTypes = {
  styles: _propTypes.default.object,
  store: _propTypes.default.object
};