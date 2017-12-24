'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _forEach = require('lodash/forEach');

var _forEach2 = _interopRequireDefault(_forEach);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var preload = function preload(imageCollection) {
  (0, _forEach2.default)(imageCollection, function (src) {
    var image = new Image();
    image.src = src;
  });
};

exports.default = preload;