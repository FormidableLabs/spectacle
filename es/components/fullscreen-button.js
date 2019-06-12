function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import styled from 'react-emotion';
var Button =
/*#__PURE__*/
styled("button", {
  target: "ev51h780"
})("display:inline-block;appearance:none;background:none;border:none;outline:0;color:inherit;padding:0;cursor:pointer;> svg{height:1.5em;width:1.5em;}");

var FullscreenButton = function FullscreenButton(_ref) {
  var isFullscreen = _ref.isFullscreen,
      props = _objectWithoutProperties(_ref, ["isFullscreen"]);

  return React.createElement(Button, _extends({
    "aria-label": "Toggle full screen"
  }, props), React.createElement("svg", {
    viewBox: "0 0 512 512"
  }, React.createElement("path", {
    fill: get(props, 'styles.fill', 'currentColor'),
    d: isFullscreen ? 'M64 371.2h76.795V448H192V320H64v51.2zm76.795-230.4H64V192h128V64h-51.205v76.8zM320 448h51.2v-76.8H448V320H320v128zm51.2-307.2V64H320v128h128v-51.2h-76.8z' : 'M396.795 396.8H320V448h128V320h-51.205zM396.8 115.205V192H448V64H320v51.205zM115.205 115.2H192V64H64v128h51.205zM115.2 396.795V320H64v128h128v-51.205z'
  })));
};

FullscreenButton.propTypes = {
  isFullscreen: PropTypes.bool,
  styles: PropTypes.object
};
export default FullscreenButton;