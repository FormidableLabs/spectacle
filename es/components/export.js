function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React, { cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { getSlideByIndex, getNotesForSlide } from '../utils/slides';
import { WithNotesSlide, NotesWrapper } from './notes-components';
var StandardExport =
/*#__PURE__*/
styled("div", {
  target: "ei5jtoh0"
})("height:100%;width:100%;");
var StyledExport =
/*#__PURE__*/
styled("div", {
  target: "ei5jtoh1"
})("height:100%;width:100%;display:flex;flex-direction:column;");

var Export =
/*#__PURE__*/
function (_Component) {
  _inherits(Export, _Component);

  function Export() {
    _classCallCheck(this, Export);

    return _possibleConstructorReturn(this, _getPrototypeOf(Export).apply(this, arguments));
  }

  _createClass(Export, [{
    key: "_renderSlides",
    value: function _renderSlides() {
      var _this = this;

      return this.props.slideReference.map(function (reference, index) {
        var slide = getSlideByIndex(_this.props.slides, _this.props.slideReference, index);
        var el = cloneElement(slide, {
          key: index,
          slideIndex: index,
          export: _this.props.route.params.indexOf('export') !== -1,
          print: _this.props.route.params.indexOf('print') !== -1,
          transition: [],
          transitionIn: [],
          transitionOut: [],
          transitionDuration: 0
        });
        return el;
      });
    }
  }, {
    key: "_renderWithNotes",
    value: function _renderWithNotes() {
      var _this2 = this;

      return this.props.slideReference.map(function (reference, index) {
        var slide = getSlideByIndex(_this2.props.slides, _this2.props.slideReference, index);
        var notes = getNotesForSlide(slide);
        var el = cloneElement(slide, {
          key: index,
          slideIndex: index,
          export: _this2.props.route.params.indexOf('export') !== -1,
          print: _this2.props.route.params.indexOf('print') !== -1,
          notes: notes,
          transition: [],
          transitionIn: [],
          transitionOut: [],
          transitionDuration: 0
        });
        return React.createElement(StyledExport, {
          key: index
        }, React.createElement(WithNotesSlide, null, el), React.createElement(NotesWrapper, null, notes));
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (this.props.route.params.indexOf('notes') !== -1) {
        return React.createElement(StandardExport, null, this._renderWithNotes());
      } else {
        return React.createElement(StandardExport, null, this._renderSlides());
      }
    }
  }]);

  return Export;
}(Component);

export { Export as default };
Export.propTypes = {
  route: PropTypes.object,
  slideReference: PropTypes.array,
  slides: PropTypes.array
};
Export.contextTypes = {
  styles: PropTypes.object
};