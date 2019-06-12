"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _forEach = _interopRequireDefault(require("lodash/forEach"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var preload = function preload(imageCollection) {
  (0, _forEach.default)(imageCollection, function (src) {
    var image = new Image();
    image.src = src;
  });
};

var _default = preload;
exports.default = _default;