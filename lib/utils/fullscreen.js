"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleFullscreen = exports.isFullscreen = exports.getFullscreenElement = exports.exitFullscreen = exports.requestFullscreen = void 0;

var requestFullscreen = function requestFullscreen() {
  var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.documentElement;
  var request = element.requestFullscreen || element.webkitRequestFullscreen || element.mozRequestFullScreen || element.mozRequestFullScreen;

  if (typeof request === 'function') {
    request.call(element);
  }
};

exports.requestFullscreen = requestFullscreen;

var exitFullscreen = function exitFullscreen() {
  var exit = document.exitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen;

  if (typeof exit === 'function') {
    exit.call(document);
  }
};

exports.exitFullscreen = exitFullscreen;

var getFullscreenElement = function getFullscreenElement() {
  return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
};

exports.getFullscreenElement = getFullscreenElement;

var isFullscreen = function isFullscreen() {
  return !!getFullscreenElement();
};

exports.isFullscreen = isFullscreen;

var toggleFullscreen = function toggleFullscreen() {
  if (isFullscreen()) {
    exitFullscreen();
  } else {
    requestFullscreen(document.documentElement);
  }
};

exports.toggleFullscreen = toggleFullscreen;